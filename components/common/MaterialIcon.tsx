import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import "material-symbols";

/**
 * Icons are a essential part of modern web-applications. They convey message
 * to user while saving valuable spaces. This component streamlines the use of
 * an icon into a component you can easily call as a text element.
 *
 * @param icon    Use the icon name from https://fonts.google.com/icons. {str, required}
 * @param fill    Symbol's filled state. {bool, optional: false}
 * @param weight  Symbol's stroke weight. {[100 | 200 | 300 | 400 | 500 | 600 | 700], optional: 300}
 * @param grade   Symbol's thickness. {[-25 | 0 | 200], default: 0}
 * @param size    Symbol's optical size. {[20, 24, 40, 48] default: 24}
 */

const MaterialIcon: StylableFC<{
  icon: string;
  fill?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  grade?: -25 | 0 | 200;
  size?: 20 | 24 | 40 | 48;
  style?: React.CSSProperties;
  className?: string;
}> = ({
  icon,
  fill = false,
  weight = 300,
  grade = 0,
  size = 20,
  style,
  className,
}) => {
  return (
    <i
      className={cn(
        "material-symbols-rounded aspect-square select-none",
        className,
      )}
      style={{
        ...style,
        fontSize: `${size / 16}rem`,
        fontVariationSettings: `
          'FILL' ${fill ? 1 : 0}, 
          'wght' ${weight}, 
          'GRAD' ${grade}, 
          'opsz' ${size}
        `,
        width: `${size / 16}rem`,
      }}
    >
      {icon}
    </i>
  );
};

export default MaterialIcon;
