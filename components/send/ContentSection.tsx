import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import MessageGroup from "@/components/send/subcomponents/MessageGroup";
import groupLobbyItems from "@/utils/helpers/groupItemsByDate";
import { createClient } from "@supabase/supabase-js";
import { FC, useState } from "react";

export type LobbyItem = {
  id: string;
  created_at: string;
  lobby: string;
  content: string;
};

const ContentSection: FC<{
  lobbyID: string | null;
  lobbyItems: LobbyItem[];
}> = ({ lobbyID, lobbyItems }) => {
  const [sendField, setSendField] = useState<string>("");

  const handleSendLobbyItem = async () => {
    const supabase = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
    );

    // short_id is possible coliding with existing code.
    const { error } = await supabase
      .from("send_lobby_items")
      .insert({ lobby: lobbyID, content: sendField })
      .select()
      .single();

    if (error) {
      alert(JSON.stringify(error));
    } else {
      setSendField("");
    }
  };

  return (
    <div
      className="border-outline bg-surface-primary flex min-h-0 w-full flex-1
        flex-col rounded-lg border p-3"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-auto">
        {lobbyItems.length > 0 ? (
          <div>
            {groupLobbyItems(lobbyItems).map((group, idx) => {
              return <MessageGroup group={group} key={idx} />;
            })}
          </div>
        ) : (
          <div className="grid h-full w-full place-items-center">
            <p className="text-xs opacity-50">There's nothing here... yet.</p>
          </div>
        )}
      </div>
      <div className="flex gap-1 pt-3">
        <TextInput
          value={sendField}
          onChange={(e) => setSendField(e.target.value)}
          placeholder={"Message"}
        />
        <Button icon={"arrow_upward"} onClick={() => handleSendLobbyItem()} />
      </div>
    </div>
  );
};

export default ContentSection;
