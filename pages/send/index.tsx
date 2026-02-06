import Button from "@/components/common/Button";
import SendLogo from "@/components/send/subcomponents/SendLogo";
import TextInput from "@/components/common/TextInput";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const PageSendLanding = () => {
  const router = useRouter();

  const [shortCodeField, setShortCodeField] = useState<string>("");
  const [busyCreatingLobby, setBusyCreatingLobby] = useState<boolean>(false);
  const [busyJoiningLobby, setBusyJoiningLobby] = useState<boolean>(false);

  const handleNewLobby = async () => {
    setBusyCreatingLobby(true);

    const supabase = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
    );

    const { data, error } = await supabase
      .from("send_lobby")
      .insert({})
      .select()
      .single();

    if (error) {
      alert(JSON.stringify(error));
      setBusyCreatingLobby(false);
    } else {
      router.push(`/send/${data.id}`);
    }
  };

  const handleSubmitShortCode = async () => {
    setBusyJoiningLobby(true);

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
      setBusyJoiningLobby(false);
    } else {
      router.push(`/send/${data.id}`);
    }
  };

  return (
    <>
      <Head>
        <title>Send</title>
        <link rel="shortcut icon" href="/favicons/send.png" type="image/png" />
      </Head>
      <div className="p-3">
        <SendLogo />
        <div
          className="m-auto mt-6 flex w-full max-w-xl flex-col gap-3 *:w-full
            sm:flex-row"
        >
          <div>
            <p className="mb-2">New Lobby</p>
            <Button
              icon="add"
              onClick={() => handleNewLobby()}
              busy={busyCreatingLobby}
              className="w-full"
            >
              New Lobby
            </Button>
          </div>
          <div>
            <p className="mb-2">Join Lobby</p>
            <div className="flex gap-1">
              <TextInput
                value={shortCodeField}
                onChange={(e) => setShortCodeField(e.target.value)}
                placeholder={"000000"}
                maxLength={6}
              />
              <Button
                icon={"arrow_right_alt"}
                busy={busyJoiningLobby}
                disabled={!shortCodeField || shortCodeField.length != 6}
                onClick={() => handleSubmitShortCode()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSendLanding;
