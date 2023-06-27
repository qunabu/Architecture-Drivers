import React, { PropsWithChildren } from "react";
//import { useDroppable } from "@dnd-kit/core";

export const Container: React.FC<PropsWithChildren<{ id: string }>> = ({
  children,
  id,
}) => {
  /*
  const { setNodeRef } = useDroppable({
    id,
  });
  */

  return <div id={id} /*ref={setNodeRef}*/>{children}</div>;
};
