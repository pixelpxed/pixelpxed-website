import MaterialIcon from "@/components/MaterialIcon";
import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

type BaseButtonProps = {
  // selected?: boolean;
  // busy?: boolean;
  // busyWithText?: boolean;
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
  icon,
  disabled = false,
  danger = false,
  className,
  style,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        `border-outline bg-background flex h-8.75 cursor-pointer items-center
        justify-center gap-1.5 rounded-md border p-1.5 text-nowrap
        transition-all select-none hover:brightness-90`,
        danger && "text-danger",
        icon && !children && "w-8.75",
        icon && children && "px-2 pl-1",
        disabled && "pointer-events-none opacity-50 brightness-90",
        className,
      )}
      style={style}
      {...props}
    >
      {icon && <MaterialIcon icon={icon} size={!children ? 24 : 20} />}
      {children}
    </button>
  );
};

export default Button;
