import React from "react";
import { Transition } from "@headlessui/react";

type Props = {
  children: React.ReactNode;
  show: boolean;
  afterEnter?: () => void;
  afterLeave?: () => void;
};

export default function Fade({
  children,
  show,
  afterEnter,
  afterLeave,
}: Props) {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      afterEnter={afterEnter}
      afterLeave={afterLeave}
    >
      {children}
    </Transition>
  );
}
