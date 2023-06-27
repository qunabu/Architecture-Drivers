import React, { PropsWithChildren } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { DRIVER_NAME } from "../store/api";

export const Draggable: React.FC<PropsWithChildren<{ id: DRIVER_NAME }>> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${id}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      className="drag-anim"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
};
