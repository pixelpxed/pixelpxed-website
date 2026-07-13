import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import { motion } from "motion/react";

const Dialog: StylableFC<{
  size?: "sm" | "md" | "lg";
  onClickOutside?: () => void;
  children: React.ReactNode;
}> = ({ size = "sm", onClickOutside, children }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 z-1000 grid h-dvh w-dvw place-items-center
        bg-black/50 p-3"
      onClick={onClickOutside && onClickOutside}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.125 }}
    >
      <motion.div
        className={cn(
          "border-outline bg-background w-full rounded-lg border p-3",
          size == "sm" && "max-w-sm",
          size == "md" && "max-w-md",
          size == "lg" && "max-w-lg",
        )}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        transition={{ duration: 0.125 }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Dialog;
