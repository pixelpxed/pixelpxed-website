import AboutSection from "@/components/send/AboutSection";
import ContentSection from "@/components/send/ContentSection";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { GetServerSideProps } from "next";

const PageSendRoom = (props: any) => {
  const router = useRouter();

  console.log(props);

  const [lobbyName, setLobbyName] = useState<string>(props.lobby.name);
  const [lobbyID, setLobbyID] = useState<string>();
  const [lobbyCode, setLobbyCode] = useState<string>(props.lobby.short_id);

  const createTime = new Date(props.lobby.created_at);
  const expireTime = new Date(createTime.getTime() + 1000 * 60 * 60);
  console.log("Create:", createTime);
  console.log("Expire:", expireTime);

  useEffect(() => {
    setLobbyID(
      typeof router.query.id == "string" ? router.query.id : undefined,
    );
  }, [router.query.id]);

  const handleCreateLobbyCode = async () => {
    if (!props.lobby.short_id) {
      const supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
      );

      // short_id is possible coliding with existing code.
      const { data, error } = await supabase
        .from("send_lobby")
        .update({
          short_id: Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0"),
        })
        .eq("id", router.query.id)
        .select()
        .single();

      if (error) {
        alert(JSON.stringify(error));
      } else {
        setLobbyCode(data.short_id);
      }
    }
  };

  const handleDeleteLobby = async () => {
    const supabase = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
    );

    const { error } = await supabase
      .from("send_lobby")
      .delete()
      .eq("id", lobbyID);

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push("/send");
    }
  };

  return (
    <>
      <Head>
        <title>Send - {lobbyName ? lobbyName : lobbyID}</title>
      </Head>
      <div className={"flex h-dvh w-dvw flex-col sm:flex-row"}>
        <AboutSection
          lobbyID={lobbyID}
          lobbyName={lobbyName}
          lobbyCode={lobbyCode}
          createLobbyCode={() => handleCreateLobbyCode()}
          deleteLobby={() => handleDeleteLobby()}
        />
        <ContentSection lobbyID={lobbyID} lobbyItems={props.items} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const supabase = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
  );

  const { data: lobby } = await supabase
    .from("send_lobby")
    .select()
    .eq("id", id)
    .single();

  const { data: items } = await supabase
    .from("send_lobby_items")
    .select()
    .eq("lobby", id);

  if (!lobby || lobby.length === 0) {
    return { notFound: true };
  }

  return {
    props: { lobby, items },
  };
};

export default PageSendRoom;
