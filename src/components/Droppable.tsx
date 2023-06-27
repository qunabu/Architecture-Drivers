import { useDroppable } from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  //rectSwappingStrategy
  //horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import React from "react";
import { DRIVER_NAME } from "../store/api";

const Droppable: React.FC<{
  id: "group1" | "group2";
  items: DRIVER_NAME[];
  mode?: "vertical" | "horizontal";
}> = ({ id, items, mode = "vertical" }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div className={`droppable ${mode}`} ref={setNodeRef}>
        {id === "group2" && items.length === 0 && (
          <small>
            Move (drag&drop) drivers here in order from most important to less
            important
          </small>
        )}

        {items.map((item, index) => (
          <SortableItem index={index} key={item} id={item} group={id} />
        ))}
      </div>
    </SortableContext>
  );
};

export default Droppable;
