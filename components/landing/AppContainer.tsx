import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import cn from "@/utils/helpers/cn";
import Link from "next/link";

type AppContainerProps = {
  icon: string;
  title: string;
  description: string;
  redirect: string;
  openInNew?: boolean;
};

const AppContainer = ({
  icon,
  title,
  description,
  redirect,
  openInNew = false,
}: AppContainerProps) => {
  return (
    <Link href={redirect} target={openInNew ? "_blank" : "_self"}>
      <Button
        className={cn("h-full! w-full justify-start", openInNew && "pr-3.5")}
      >
        <div className="flex items-center gap-2">
          <MaterialIcon icon={icon} size={40} className="text-primary" />
          <div className="text-left">
            <p>{title}</p>
            <p className="text-xs opacity-50">{description}</p>
          </div>
        </div>
        {openInNew && (
          <MaterialIcon icon={"open_in_new"} className="ml-auto opacity-50" />
        )}
      </Button>
    </Link>
  );
};

export default AppContainer;
