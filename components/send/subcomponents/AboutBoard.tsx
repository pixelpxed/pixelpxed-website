import Button from "@/components/common/Button";
import { Lobby } from "@/utils/types/send";
import { FC } from "react";

const AboutBoard: FC<{
  lobby: Lobby;
}> = ({ lobby }) => {
  return (
    <div className="grid h-max grid-cols-2 gap-2">
      <div className="col-span-2">
        <p className="font-bold">Lobby</p>
        {lobby.name ? (
          <p>{lobby.name}</p>
        ) : (
          <p className="opacity-50">Untitled</p>
        )}
      </div>
      <div>
        <p className="font-bold">Join Code</p>
        <p data-tabnum>{lobby.short_id ? lobby.short_id : "-"}</p>
      </div>
      <div>
        <p className="font-bold">Expire</p>
        <p>Never</p>
      </div>
    </div>
  );
};

export default AboutBoard;
