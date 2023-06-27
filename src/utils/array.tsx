import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";

export const removeAtIndex = (array: unknown[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (
  array: unknown[],
  index: number,
  item: unknown
) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrayMove = (
  array: unknown[],
  oldIndex: number,
  newIndex: number
) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};
