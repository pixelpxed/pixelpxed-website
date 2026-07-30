import cn from "@/utils/helpers/cn";
import Link from "next/link";
import { StylableFC } from "@/utils/types/common";

const Footer: StylableFC<{ align?: "left" | "center" }> = ({
  align = "left",
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <p
        className={cn("text-xs opacity-50", align == "center" && "text-center")}
      >
        © 2026 Metawat R. All rights reserved.
      </p>
      <div
        className={cn(
          "flex gap-1.5 text-xs opacity-50 [&>a]:underline",
          align == "center" && "justify-center",
        )}
      >
        <Link href="mailto:metawat.rojn@gmail.com" target="_blank">
          Mail
        </Link>
        <Link href="https://www.instagram.com/pixelpxed" target="_blank">
          Instagram
        </Link>
        <Link href="https://www.linkedin.com/in/metawat" target="_blank">
          LinkedIn
        </Link>
      </div>
    </div>
  );
};

export default Footer;
