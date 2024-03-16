import React from "react";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function ErrorAlert() {
  return (
    <div
      role="alert"
      className={clsx(
        ["flex", "justify-center", "items-center", "gap-2"],
        "size-full",
        ["text-red-500", "bg-red-50"],
        ["rounded", "border", "border-red-500"],
      )}
    >
      <ExclamationCircleIcon
        className={clsx("size-6", "text-inherit")}
        aria-hidden="true"
      />
      <p className={clsx("p-0", "text-inherit")}>エラーが発生しました</p>
    </div>
  );
}
