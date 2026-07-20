import MaterialIcon from "@/components/common/MaterialIcon";
import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type BaseButtonProps = {
  appearance?: "tonal" | "outlined" | "filled" | "text";
  selected?: boolean;
  busy?: boolean;
  busyWithText?: boolean;
  disabled?: boolean;
  danger?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type IconButtonProps = BaseButtonProps & {
  icon: string | null;
  children?: never;
};

type TextButtonProps = BaseButtonProps & {
  icon?: string | null;
  children: ReactNode;
};

type ButtonProps = IconButtonProps | TextButtonProps;

const Button: StylableFC<ButtonProps> = ({
  appearance = "tonal",
  icon,
  disabled = false,
  selected = false,
  busy = false,
  busyWithText = false,
  danger = false,
  className,
  style,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        `flex h-8.75 cursor-pointer items-center justify-center gap-1.5
        overflow-hidden rounded-md p-1.5 text-nowrap transition-all! select-none
        hover:brightness-95`,
        appearance == "tonal" && "border-outline bg-surface-primary border",
        appearance == "filled" && "bg-primary text-on-primary",
        appearance == "outlined" && "border-outline border bg-transparent",
        appearance != "text" && "hover:shadow-md",
        danger && "text-danger",
        icon && !children && "w-8.75",
        ((!busy && icon && children) || (busy && busyWithText)) && "px-2 pl-1",
        (disabled || busy) && "pointer-events-none opacity-50 brightness-90",
        className,
      )}
      style={style}
      {...props}
    >
      {busy && (
        <div className="flex items-center">
          <MaterialIcon icon="progress_activity" className="animate-spin" />
        </div>
      )}
      {(!busy || (busy && busyWithText)) && (
        <>
          {selected && (
            <MaterialIcon icon={"check_small"} size={!children ? 24 : 20} />
          )}
          {icon && !busy && !selected && (
            <MaterialIcon icon={icon} size={!children ? 24 : 20} />
          )}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
