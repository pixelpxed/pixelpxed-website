import Button from "@/components/Button";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const ContentSection: FC<{
  lobbyID: string | undefined;
  lobbyItems: {
    id: string;
    created_at: string;
    lobby: string;
    content: string;
  }[];
}> = ({ lobbyID, lobbyItems }) => {
  const [sendField, setSendField] = useState<string>("");
  const [items, setItems] = useState<
    {
      id: string;
      created_at: string;
      lobby: string;
      content: string;
    }[]
  >(lobbyItems);

  const handleSendLobbyItem = async () => {
    const supabase = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
    );

    // short_id is possible coliding with existing code.
    const { data, error } = await supabase
      .from("send_lobby_items")
      .insert({ lobby: lobbyID, content: sendField })
      .select()
      .single();

    if (error) {
      alert(JSON.stringify(error));
    } else {
      setItems((items) => [...items, data]);
      setSendField("");
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex grow flex-col gap-1 overflow-auto p-3 pb-0">
        {items.length > 0 &&
          items.map((i, idx) => {
            const createdAt = new Date(i.created_at);
            return (
              <Link
                href={i.content}
                target="_blank"
                key={idx}
                className="border-outline flex flex-row gap-3 rounded-md border
                  p-3"
              >
                <p data-tabnum className="opacity-50">
                  {createdAt.getHours() < 10 && "0"}
                  {createdAt.getHours()}:{createdAt.getMinutes() < 10 && "0"}
                  {createdAt.getMinutes()}
                </p>
                <p className="break-all text-blue-500">{i.content}</p>
              </Link>
            );
          })}
      </div>
      <div className="flex gap-1 p-3">
        <TextInput
          value={sendField}
          onChange={(e) => setSendField(e.target.value)}
          placeholder={"https://www.example.com"}
        />
        <Button
          icon={"send"}
          disabled={!URL_REGEX.test(sendField)}
          onClick={() => handleSendLobbyItem()}
        />
      </div>
    </div>
  );
};

export default ContentSection;
