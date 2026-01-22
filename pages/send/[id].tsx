import AboutSection from "@/components/send/AboutSection";
import ContentSection from "@/components/send/ContentSection";
import { createClient } from "@supabase/supabase-js";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type Lobby = {
  name: string | null;
  id: string | null;
  short_id: string | null;
};

const PageSendRoom = (props: any) => {
  const router = useRouter();

  const [lobby, setLobby] = useState<Lobby>({
    name: props.lobby.name,
    id: props.lobby.id,
    short_id: props.lobby.short_id,
  });
  const [items, setItems] = useState<
    {
      id: string;
      created_at: string;
      lobby: string;
      content: string;
    }[]
  >([]);
  const [busyCreatingCode, setBusyCreatingCode] = useState<boolean>(false);
  const [busyDeletingLobby, setBusyDeletingLobby] = useState<boolean>(false);

  useEffect(() => {
    setLobby((prev) => ({
      ...prev,
      id: typeof router.query.id == "string" ? router.query.id : "",
    }));
  }, [router.query.id]);

  const handleCreateCode = async () => {
    setBusyCreatingCode(true);

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
        if (error.code == "23505") {
          alert(
            `Failed to create code; proposed code already exists. Please try again later or contact the developer if this persists repeatedly.`,
          );
        } else {
          alert(JSON.stringify(error));
        }
        setBusyCreatingCode(false);
      } else {
        setLobby((prev) => ({
          ...prev,
          short_id: data.short_id,
        }));
      }
    }
  };
  const handleDeleteLobby = async () => {
    setBusyDeletingLobby(true);

    const supabase = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
    );

    const { error } = await supabase
      .from("send_lobby")
      .delete()
      .eq("id", lobby.id);

    if (error) {
      alert(JSON.stringify(error));
      setBusyDeletingLobby(false);
    } else {
      router.push("/send");
    }
  };
  const getLobbyItems = async () => {
    const supabase = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
    );

    const { data, error } = await supabase
      .from("send_lobby_items")
      .select()
      .eq("lobby", router.query.id);

    if (error) {
      alert(JSON.stringify(error));
    } else {
      setItems(data);
    }
  };

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
    );

    supabase
      .channel("data:lobby_items")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "send_lobby_items",
          filter: `lobby=eq.${router.query.id}`,
        },
        (payload) => {
          getLobbyItems();
        },
      )
      .subscribe();

    getLobbyItems();
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>Send - {lobby.name ? lobby.name : lobby.id}</title>
      </Head>
      <div className={"flex h-dvh w-dvw flex-col sm:flex-row"}>
        <AboutSection
          lobby={lobby}
          createCode={() => handleCreateCode()}
          busyCreatingCode={busyCreatingCode}
          deleteLobby={() => handleDeleteLobby()}
          busyDeletingLobby={busyDeletingLobby}
        />
        <ContentSection lobbyID={lobby.id} lobbyItems={items} />
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

  if (!lobby || lobby.length === 0) {
    return {
      redirect: {
        destination: "/send",
        permanent: false,
      },
    };
  }

  return {
    props: { lobby },
  };
};

export default PageSendRoom;
