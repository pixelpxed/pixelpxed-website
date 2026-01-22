import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import InformationDetails from "@/components/send/subcomponents/AboutBoard";
import InformationHeader from "@/components/send/subcomponents/AboutHeader";
import TextInput from "@/components/TextInput";
import { Lobby } from "@/pages/send/[id]";
import { AnimatePresence } from "motion/react";
import { FC, useEffect, useState } from "react";
import QRCode from "react-qr-code";

const AboutSection: FC<{
  lobby: Lobby;
  createCode: () => void;
  busyCreatingCode: boolean;
  deleteLobby: () => void;
  busyDeletingLobby: boolean;
}> = ({
  lobby,
  createCode,
  busyCreatingCode,
  deleteLobby,
  busyDeletingLobby,
}) => {
  const [openEditLobbyDialog, setOpenEditLobbyDialog] =
    useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <div
        className="border-outline flex w-full shrink-0 flex-col items-center
          justify-between gap-6 border-r-0 border-b p-3 sm:h-full sm:max-w-80
          sm:border-r sm:border-b-0"
      >
        <div className="flex w-full flex-col gap-3">
          <InformationHeader />
          <div className="flex flex-col gap-6">
            <InformationDetails
              name={lobby.name ? lobby.name : lobby.id ? lobby.id : "-"}
              lobbyCode={lobby.short_id}
            />
          </div>
        </div>
        {isMounted && lobby.id && (
          <QRCode
            bgColor="transparent"
            fgColor="var(--color-on-background)"
            level="Q"
            size={192}
            value={window.location.href}
            className="m-auto h-max w-full max-w-40"
          />
        )}
        <div className="grid w-full grid-cols-2 gap-1">
          {!lobby.short_id && (
            <Button
              className="col-span-2"
              busy={busyCreatingCode}
              onClick={createCode}
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
          <Dialog onClickOutside={() => setOpenEditLobbyDialog(false)}>
            <div className="mb-3 flex flex-col gap-1">
              <p className="font-bold">Edit Lobby</p>
              <div className="flex flex-col gap-1">
                <p>Lobby Name</p>
                <TextInput
                  value={lobby.name ?? ""}
                  placeholder="Name"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Expire</p>
                <Button className="w-full" disabled>
                  Change to Never
                </Button>
              </div>
            </div>
            <div className="mt-3">
              <Button
                appearance="filled"
                onClick={() => setOpenEditLobbyDialog(false)}
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

export default AboutSection;
