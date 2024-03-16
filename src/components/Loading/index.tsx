import React from "react";
import clsx from "clsx";

export default function Loading() {
  return (
    <div className={clsx("flex", "justify-center")} role="progressbar">
      <div
        className={clsx(
          ["h-10", "w-10"],
          ["animate-spin"],
          ["rounded-full"],
          ["border-4", "border-indigo-600", "border-t-transparent"],
        )}
      />
    </div>
  );
}
