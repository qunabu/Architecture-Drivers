import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  //rectSortingStrategy,
  //verticalListSortingStrategy,
  //horizontalListSortingStrategy,
  rectSwappingStrategy,
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
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSwappingStrategy}>
      <div
        className={`droppable ${mode} ${items.length === 0 ? "empty" : ""} ${
          isOver ? "isOver" : "a"
        }`}
        ref={setNodeRef}
      >
        {id === "group2" && items.length === 0 && (
          <small>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fillRule="nonzero"
                  d="M14 6h2v2h5a1 1 0 0 1 1 1v7.5L16 13l.036 8.062 2.223-2.15L20.041 22H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zm8 11.338V21a1 1 0 0 1-.048.307l-1.96-3.394L22 17.338zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z"
                />
              </g>
            </svg>
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
