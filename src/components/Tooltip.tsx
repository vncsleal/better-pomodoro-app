"use client";

import { useState } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useHover,
  useInteractions,
  FloatingPortal,
  autoUpdate,
} from "@floating-ui/react";

interface TooltipProps {
  children: React.ReactNode;
  label: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(5), flip(), shift({ padding: 5 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl"
          >
            {label}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;