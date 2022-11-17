import clsx from "clsx";
import React from "react";
import { InputProps } from "./definitions";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputWrapperClassName,
      inputClassName,
      label,
      helper,
      hint,
      disabled,
      isError,
      isFullWidth,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx(className)}>
        {label && (
          <label
            className={clsx(
              "flex justify-between items-center text-neutral-900 text-[1rem] font-[400] mb-1",
              disabled && "text-neutral-300"
            )}
          >
            <span>{label}</span>
            {hint && (
              <span className="hidden sm:block text-neutral-500 text-[0.8125rem] font-[300] mt-1">
                {hint}
              </span>
            )}
          </label>
        )}
        <div
          className={clsx(
            inputWrapperClassName,
            `
            inline-flex
            items-center
            border-[1.2px] 
            rounded-lg 
            bg-neutral-50
            p-[0.625rem]
            focus-within:border-primary2-900 
            active:border-primary2-500 
            !autofill:bg-yellow-200
            `,
            {
              "border-neutral-300": disabled,
              "active:border-neutral-300": disabled,
              "cursor-not-allowed": disabled,
              "border-neutral-200": !isError,
              "border-error-500": isError,
              "focus-within:border-error-500 ": isError,
              "active:border-error-500 ": isError,
              "w-[18.375rem]": !isFullWidth,
              "w-full": isFullWidth,
            }
          )}
        >
          <input
            ref={ref}
            disabled={disabled}
            className={clsx(
              inputClassName,
              `
              w-full 
              bg-transparent 
              text-neutral-900
              text-[1rem]
              font-normal
              placeholder:text-neutral-400
              placeholder:text-[1rem]
              placeholder:font-normal
              focus:outline-none
              focus:caret-primary-900
              disabled:placeholder:text-neutral-300
              disabled:cursor-not-allowed	
            `,
              {
                "focus:caret-error-500": isError,
                "text-error-500": isError,
                "w-full": isFullWidth,
              }
            )}
            {...props}
          />
        </div>
        {helper && (
          <div
            className={clsx(" text-[0.8125rem] font-[300] mt-1", {
              "text-error-500": isError,
              "text-neutral-300": disabled,
              "text-neutral-700": !isError && !disabled,
            })}
          >
            {helper}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
