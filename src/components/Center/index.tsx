import React from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
};

export default function Center({ children }: Props) {
  return (
    <div className={clsx("flex", "justify-center", "items-center")}>
      {children}
    </div>
  );
}
