import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import Link from "next/link";

const Footer: StylableFC<{ align?: "left" | "center" }> = ({
  align = "left",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 text-xs opacity-50",
        align == "center" && "text-center",
        className,
      )}
    >
      <p>© 2026 Metawat R. All rights reserved.</p>
      <p className="[&>a]:underline">
        <Link href="mailto:metawat.rojn@gmail.com" target="_blank">
          Mail
        </Link>{" "}
        •{" "}
        <Link href="https://www.instagram.com/pixelpxed" target="_blank">
          Instagram
        </Link>{" "}
        •{" "}
        <Link href="https://www.github.com/pixelpxed" target="_blank">
          GitHub
        </Link>{" "}
        •{" "}
        <Link href="https://www.linkedin.com/in/metawat" target="_blank">
          LinkedIn
        </Link>
      </p>
    </div>
  );
};

export default Footer;
