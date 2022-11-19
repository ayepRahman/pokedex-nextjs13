import clsx from "clsx";
import React from "react";
import { z } from "zod";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx(className, "bg-white rounded-md p-4 shadow-large ")}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
