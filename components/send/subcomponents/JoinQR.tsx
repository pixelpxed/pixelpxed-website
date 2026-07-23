import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import QRCode from "react-qr-code";
import Balancer from "react-wrap-balancer";

const JoinQR: StylableFC<{ value: string; showURL?: boolean }> = ({
  value,
  showURL = false,
  className,
}) => {
  return (
    <div className={cn("my-4 flex flex-col gap-2", className)}>
      <div className="relative">
        <QRCode
          bgColor="transparent"
          fgColor="black"
          level="Q"
          size={192}
          value={value}
          className="border-outline m-auto aspect-square h-max w-full max-w-44
            rounded-lg border bg-white p-2"
        />
      </div>
      {showURL && (
        <p className="text-center text-xs opacity-50">
          <Balancer>{value}</Balancer>
        </p>
      )}
    </div>
  );
};

export default JoinQR;
