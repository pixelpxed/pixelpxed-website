import { FC } from "react";

const AboutBoard: FC<{
  name: string | null;
  lobbyCode: string | null;
}> = ({ name, lobbyCode }) => {
  return (
    <div className="grid h-max gap-2 sm:grid-cols-2">
      <div className="col-span-2">
        <p className="font-bold">Lobby</p>
        <p>{name}</p>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <p className="font-bold">Short Code</p>
        <p data-tabnum>{lobbyCode ? lobbyCode : "-"}</p>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <p className="font-bold">Expire</p>
        <p>{false ? "20/01/26 @ 13:15" : "Never"}</p>
      </div>
    </div>
  );
};

export default AboutBoard;
