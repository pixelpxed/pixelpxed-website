import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import MaterialIcon from "@/components/common/MaterialIcon";
import InformationDetails from "@/components/send/subcomponents/AboutBoard";
import SendLogo from "@/components/send/subcomponents/SendLogo";
import TextInput from "@/components/common/TextInput";
import type { Lobby } from "@/utils/types/send";
import { createClient } from "@supabase/supabase-js";
import { AnimatePresence } from "motion/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import QRCode from "react-qr-code";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
);

const AboutSection: FC<{
  lobby: Lobby;
  setLobby: (lobby: Lobby) => void;
  deleteLobby: () => void;
  busyDeletingLobby: boolean;
}> = ({ lobby, setLobby, deleteLobby, busyDeletingLobby }) => {
  const router = useRouter();

  const [qrValue, setQrValue] = useState<string | null>(null);
  const [busyCreatingCode, setBusyCreatingCode] = useState<boolean>(false);
  const [openEditLobbyDialog, setOpenEditLobbyDialog] =
    useState<boolean>(false);

  const handleUpdateLobby = async () => {
    const { data, error } = await supabase
      .from("send_lobby")
      .update({ name: lobby.name })
      .eq("id", lobby.id)
      .select()
      .single();
    if (error) {
      alert(JSON.stringify(error));
    } else {
      setLobby(data ?? lobby);
    }
  };

  const handleCreateCode = async () => {
    setBusyCreatingCode(true);

    if (!lobby.short_id) {
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
      } else {
        setLobby({
          ...lobby,
          short_id: data.short_id,
        });
      }

      setBusyCreatingCode(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQrValue(window.location.href);
    }
  }, []);

  return (
    <>
      <div
        className="border-outline flex w-full shrink-0 flex-col items-center
          justify-between gap-6 border-r-0 border-b p-3 sm:h-full sm:max-w-80
          sm:border-r sm:border-b-0"
      >
        <div className="flex w-full flex-col gap-6">
          <div className="flex items-center gap-1">
            <SendLogo />
          </div>
          <div className="hidden w-full sm:block">
            <InformationDetails
              name={lobby.name ? lobby.name : lobby.id ? lobby.id : "-"}
              lobbyCode={lobby.short_id}
            />
          </div>
        </div>
        {qrValue && lobby.id && (
          <QRCode
            bgColor="transparent"
            fgColor="var(--color-on-background)"
            level="Q"
            size={192}
            value={qrValue}
            className="m-auto hidden h-max w-full max-w-40 sm:block"
          />
        )}
        <div className="hidden w-full grid-cols-2 gap-1 sm:grid">
          {!lobby.short_id && (
            <Button
              className="col-span-2"
              busy={busyCreatingCode}
              onClick={() => handleCreateCode()}
            >
              Generate Short Code
            </Button>
          )}
          <Button onClick={() => setOpenEditLobbyDialog(true)}>
            Edit Lobby
          </Button>
          <Button danger={true} busy={busyDeletingLobby} onClick={deleteLobby}>
            Delete Lobby
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {openEditLobbyDialog && (
          <Dialog
            onClickOutside={() => {
              setOpenEditLobbyDialog(false);
            }}
          >
            <div className="mb-3 flex flex-col gap-1">
              <p className="font-bold">Edit Lobby</p>
              <div className="flex flex-col gap-1">
                <p>Lobby Name</p>
                <TextInput
                  value={lobby.name ?? ""}
                  onChange={(e) => setLobby({ ...lobby, name: e.target.value })}
                  placeholder="Name"
                />
              </div>
            </div>
            <Button
              appearance="filled"
              onClick={() => {
                handleUpdateLobby();
                setOpenEditLobbyDialog(false);
              }}
              className="w-full"
            >
              Done
            </Button>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutSection;
