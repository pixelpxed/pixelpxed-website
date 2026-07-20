import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import SendLogo from "@/components/send/subcomponents/SendLogo";
import getLobbyByShortCode from "@/utils/helpers/send/getLobbyByShortCode";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LOBBY_CODE_FORMAT_REGEX = /^\d{6}$/;

const PageSendLanding = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
  const handleSubmitShortCode = async (code: string) => {
    // Catches invalid code format before running.
    if (!LOBBY_CODE_FORMAT_REGEX.test(code)) {
      return alert("Invalid join code format, please try again!");
    }

    setBusyJoiningLobby(true);

    const { data, error } = await getLobbyByShortCode(code);

    if (error) {
      alert(JSON.stringify(error));
      setBusyJoiningLobby(false);
    } else {
      router.push(`/send/${data.id}`);
    }
  };

  const checkParamActions = () => {
    if (!searchParams) return;

    // Join Lobby - Checked first because of probability to be used.
    const joinCode = searchParams.get("join");
    if (joinCode) {
      setShortCodeField(joinCode);
      void handleSubmitShortCode(joinCode);
      return;
    }

    // Create Lobby
    if (searchParams.get("new") != null) {
      void handleNewLobby();
    }
  };

  useEffect(() => {
    checkParamActions();
  }, [searchParams]);

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
                data-tabnum
              />
              <Button
                icon={"arrow_right_alt"}
                busy={busyJoiningLobby}
                disabled={!shortCodeField || shortCodeField.length != 6}
                onClick={() => handleSubmitShortCode(shortCodeField)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSendLanding;
