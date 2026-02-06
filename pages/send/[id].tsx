import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import AboutSection from "@/components/send/AboutSection";
import ContentSection from "@/components/send/ContentSection";
import type { Lobby } from "@/utils/types/send";
import { createClient } from "@supabase/supabase-js";
import { AnimatePresence } from "motion/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
);

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

  const [openDeletedDialog, setOpenDeletedDialog] = useState<boolean>(false);
  const [busyDeletingLobby, setBusyDeletingLobby] = useState<boolean>(false);

  const handleDeleteLobby = async () => {
    setBusyDeletingLobby(true);

    const { error } = await supabase
      .from("send_lobby")
      .delete()
      .eq("id", lobby.id);

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push("/send");
    }

    setBusyDeletingLobby(false);
  };
  const getLobbyItems = async () => {
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
  const getLobbyInfo = async () => {
    const { data, error } = await supabase
      .from("send_lobby")
      .select()
      .eq("id", router.query.id)
      .single();

    if (error) {
      alert(JSON.stringify(error));
    } else {
      setLobby(data);
    }
  };

  useEffect(() => {
    setLobby((prev) => ({
      ...prev,
      id: typeof router.query.id == "string" ? router.query.id : "",
    }));

    // Listens for new content.
    supabase
      .channel("data:send_lobby_items")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "send_lobby_items",
          filter: `lobby=eq.${router.query.id}`,
        },
        () => getLobbyItems(),
      )
      .subscribe();

    // Listens for when lobby is deleted.
    supabase
      .channel("data:send_lobby")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "send_lobby",
          filter: `id=eq.${router.query.id}`,
        },
        (data) => {
          console.log(data);
          if (data.eventType === "DELETE") {
            setOpenDeletedDialog(true);
          } else {
            getLobbyInfo();
          }
        },
      )
      .subscribe();

    getLobbyItems();

    return () => {
      supabase.removeAllChannels();
    };
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>Send - {lobby.name ? lobby.name : lobby.id}</title>
        <link rel="shortcut icon" href="/favicons/send.png" type="image/png" />
      </Head>
      <div className={"flex h-dvh w-dvw flex-col sm:flex-row"}>
        <AboutSection
          lobby={lobby}
          setLobby={setLobby}
          deleteLobby={() => handleDeleteLobby()}
          busyDeletingLobby={busyDeletingLobby}
        />
        <ContentSection lobbyID={lobby.id} lobbyItems={items} />
      </div>
      <AnimatePresence>
        {openDeletedDialog && (
          <Dialog>
            <div className="mb-3 flex flex-col gap-1">
              <p className="font-bold">Lobby Deleted</p>
              <p>
                This lobby has been deleted by a user, create a new one to share
                more content.
              </p>
            </div>
            <div className="mt-3">
              <Button
                appearance="filled"
                onClick={() => router.push("/send")}
                className="w-full"
              >
                Done
              </Button>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

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
