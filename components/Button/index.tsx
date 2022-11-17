// @link - https://dev.to/gabrielmlinassi/a-more-stylish-way-to-write-conditional-tailwind-classes-5ae6
import { BeatLoader } from "@components/Loaders";
import { theme } from "@styles/theme";
import clsx from "clsx";
import {
  colorSchemeStyle,
  loaderSizeStyle,
  sizeStyle,
  variantStyle,
} from "./constants";
import { ButtonProps } from "./definitions";

/**
 * Button component
 */
const Button: React.FC<ButtonProps> = ({
  variants = "primary",
  size = "md",
  colorScheme = "default",
  isLoading,
  isFullWidth,
  prefixIcon,
  suffixIcon,
  prefixIconMask,
  suffixIconMask,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "rounded-md inline-flex items-center justify-center",
        colorScheme === "default" && variantStyle[variants],
        sizeStyle[size],
        colorSchemeStyle[colorScheme][variants],
        isFullWidth && "w-full",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <BeatLoader
          color={
            variants === "primary"
              ? theme.colors.neutral[50]
              : theme.colors.primary[900]
          }
          size={loaderSizeStyle[size]}
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
export * from "./definitions";
