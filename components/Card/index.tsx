import clsx from "clsx";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx(className, "rounded-md p-4 shadow-large bg-slate-200")}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
