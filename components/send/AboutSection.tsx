import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import InformationDetails from "@/components/send/subcomponents/AboutBoard";
import InformationHeader from "@/components/send/subcomponents/AboutHeader";
import { AnimatePresence, motion } from "motion/react";
import { FC, useState } from "react";
import QRCode from "react-qr-code";

const AboutSection: FC<{
  lobbyID: string | undefined;
  lobbyName: string | undefined;
  lobbyCode: string | undefined;
  createLobbyCode: () => void;
  deleteLobby: () => void;
}> = ({ lobbyID, lobbyName, lobbyCode, createLobbyCode, deleteLobby }) => {
  const [openEditLobbyDialog, setOpenEditLobbyDialog] =
    useState<boolean>(false);

  return (
    <>
      <div
        className="border-outline flex w-full shrink-0 flex-col items-center
          justify-between gap-2 border-r-0 border-b p-3 sm:h-full sm:max-w-80
          sm:border-r sm:border-b-0"
      >
        <div className="flex w-full flex-col gap-6">
          <InformationHeader />
          <div
            className="grid grid-cols-[1fr_max-content] gap-2 sm:grid-cols-1
              sm:gap-6"
          >
            <InformationDetails
              name={lobbyName ? lobbyName : lobbyID ? lobbyID : "-"}
              lobbyCode={lobbyCode}
            />
            {lobbyID && (
              <QRCode
                bgColor="transparent"
                fgColor="var(--color-on-background)"
                level="Q"
                size={192}
                value={window.location.href}
                className="h-max w-full max-w-40"
              />
            )}
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-1">
          {!lobbyCode && (
            <Button className="col-span-2" onClick={createLobbyCode}>
              Generate Short Code
            </Button>
          )}
          <Button onClick={() => setOpenEditLobbyDialog(true)}>
            Edit Lobby
          </Button>
          <Button
            danger={true}
            icon={"check"}
            className="w-full"
            onClick={deleteLobby}
          >
            Delete Lobby
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {openEditLobbyDialog && (
          <Dialog onClickOutside={() => setOpenEditLobbyDialog(false)}>
            <div className="mb-3 flex flex-col gap-1">
              <p className="font-bold">Edit Lobby</p>
              <p>Work in progress give us a moment.</p>
            </div>
            <div className="mt-3">
              <Button
                className="w-full"
                onClick={() => setOpenEditLobbyDialog(false)}
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
