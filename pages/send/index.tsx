import Button from "@/components/Button";
import MaterialIcon from "@/components/MaterialIcon";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const PageSendLanding = () => {
  const router = useRouter();

  const [shortCodeField, setShortCodeField] = useState<string>("");

  const handleNewLobby = async () => {
    const supabase = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
    );

    const { data, error } = await supabase
      .from("send_lobby")
      .insert([{}])
      .select();

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push(`/send/${data[0].id}`);
    }
  };

  const handleSubmitShortCode = async () => {
    const supabase = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
    );

    const { data, error } = await supabase
      .from("send_lobby")
      .select()
      .eq("short_id", shortCodeField)
      .single();

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push(`/send/${data.id}`);
    }
  };

  return (
    <>
      <Head>
        <title>Send</title>
      </Head>
      <div className="p-2 md:p-4">
        <p>Send</p>
        <div className="flex cursor-pointer items-center gap-1">
          <Button icon="add" onClick={() => handleNewLobby()}>
            New Lobby
          </Button>
        </div>
        <div className="flex gap-1">
          <input
            type="text"
            className="75 border-outline h-8.75 rounded-md border p-2"
            value={shortCodeField}
            onChange={(e) => setShortCodeField(e.target.value)}
            placeholder={"000000"}
          />
          <Button
            icon={"arrow_right_alt"}
            onClick={() => handleSubmitShortCode()}
          />
        </div>
      </div>
    </>
  );
};

export default PageSendLanding;
