import Button from "@/components/Button";
import MaterialIcon from "@/components/MaterialIcon";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import { useRouter } from "next/router";

const PageSendLanding = () => {
  const router = useRouter();

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
      </div>
    </>
  );
};

export default PageSendLanding;
