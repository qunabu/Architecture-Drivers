import React, { useContext, useState } from 'react'
import { DraggableLocation, DropResult } from 'react-beautiful-dnd'
import { v4 } from 'uuid'
import { ColumnType } from '../assets'
import type { DRIVER_NAME, TaskTypeDetails } from '../assets/api'
// import { useHashParams } from '../hooks/setHashParams'
import { useHashState } from '../hooks/useHashState'

type DragDropProps = (source: DraggableLocation, destination: DraggableLocation) => void

// handle the manipulation of placeholder for row
type RowDropshadowProps = (event: any, destinationIndex: number, sourceIndex: number) => void

// handle the manipulation of placeholder for column
type ColumnDropshadowProps = (event: any, destinationIndex: number, sourceIndex: number) => void

type RowDropshadow = { marginTop: number; height: number }
type ColDropshadow = { marginLeft: number; height: number }

type DragDropContextProps = {
   onSubmit: (newRow: string, colIndex: number) => void
   handleDuplicateTask: (rowIndex: number, colIndex: number) => void
   handleNewColumn: (newName: string) => void
   handleRemoveTask: (rowIndex: number, colIndex: number) => void
   handleDeleteColumn: (colIndex: number) => void
   handleDragEnd: (result: DropResult) => void
   handleDragStart: (event: any) => void
   handleDragUpdate: (event: any) => void
   rowDropshadowProps: RowDropshadow
   colDropshadowProps: ColDropshadow
   columns: ColumnType[]
   setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>
   details: TaskTypeDetails
}

const DragDropContext = React.createContext<DragDropContextProps | undefined>(undefined)

// grabbing element currently being dragged from the dom
const getDraggedElement = (draggableId) => {
   const queryAttr = 'data-rbd-drag-handle-draggable-id'
   const domQuery = `[${queryAttr}='${draggableId}']`
   const draggedElement = document.querySelector(domQuery)
   return draggedElement
}

// updating the array of the placeholder by switching out the source and destination colIndex
const getUpdatedChildrenArray = (
   draggedElement: Element,
   destinationIndex: number,
   sourceIndex: number,
) => {
   // grab children of the node
   const child: Element[] = [...draggedElement!.parentNode!.children]

   // if the indexes are the same (onDragStart) just return the dom array
   if (destinationIndex === sourceIndex) return child
   // get the div of item being dragged
   const draggedItem = child[sourceIndex]

   // remove source
   child.splice(sourceIndex, 1)

   // return updated array by inputting dragged item
   return child.splice(0, destinationIndex, draggedItem)
}

// isolate the number of style desired to pass as props
const getStyle = (
   updatedChildrenArray: Element[],
   destinationIndex: number,
   property: string,
   clientDirection: 'clientHeight' | 'clientWidth',
) =>
   updatedChildrenArray.slice(0, destinationIndex).reduce((total, curr) => {
      // get the style object of the item
      const style = window.getComputedStyle(curr)
      // isolate the # of the property desired
      const prop = parseFloat(style[property])
      return total + curr[clientDirection] + prop
   }, 0)

const DragDropProvider: React.FC<{ data: ColumnType[]; details: TaskTypeDetails }> = ({
   children,
   data,
   details,
}) => {
   const [columns, setColumns] = useHashState<ColumnType[]>(
      'columns',
      JSON.parse(JSON.stringify(data)),
   )

   const [colDropshadowProps, setColDropshadowProps] = useState<ColDropshadow>({
      marginLeft: 0,
      height: 0,
   })
   const [rowDropshadowProps, setRowDropshadowProps] = useState<RowDropshadow>({
      marginTop: 0,
      height: 0,
   })

   // handling movement of row in the same column
   // [[],[]],[]
   const moveRowSameColumn: DragDropProps = (source, destination) => {
      // moving tasks in same column
      setColumns((prev) => {
         const updated = [...prev]

         // isolate the row of the column we want to adjust
         const [{ tasks }] = updated.filter(({ id }) => id === source.droppableId)
         // remove the source item
         const [removed] = tasks.splice(source.index, 1)
         // insert the source item at the new colIndex
         tasks.splice(destination.index, 0, removed)

         return updated
      })
   }

   // handling movement of row between columns
   const moveRowDifferentColumn: DragDropProps = (source, destination) => {
      // moving tasks between columns
      setColumns((prev) => {
         // filter out which column is the source and which is the destination
         const updated = [...prev]
         const [sourceColumn] = updated.filter(({ id }) => id === source.droppableId)
         const [destinationColumn] = updated.filter(({ id }) => id === destination.droppableId)

         // extract the tasks from the columnn
         const sourceRow = sourceColumn.tasks
         const destinationRow = destinationColumn.tasks

         // remove the source item
         const [removed] = sourceRow.splice(source.index, 1)
         // insert the source item at the new colIndex
         destinationRow.splice(destination.index, 0, removed)

         return updated
      })
   }

   // determining if its diff col or same col for row movement
   const handleRowMove: DragDropProps = (source, destination) => {
      // droppableId is in reference to what column it is so if they are the same,
      // then both droppableId's are the same,
      // if its diff columns then they not the same
      // btw since columns are dynamically instantiated, the droppableId i used is uuid

      if (source.droppableId !== destination.droppableId) {
         moveRowDifferentColumn(source, destination)
      } else {
         moveRowSameColumn(source, destination)
      }
   }

   // move columns
   const handleColumnMove: DragDropProps = (source, destination) =>
      // rememeber that source and dest are just { draggableId, index }
      // moving columns (:
      setColumns((prev) => {
         const updated = [...prev]
         // remove source column
         const [removed] = updated.splice(source.index, 1)
         // insert source column at new destination
         updated.splice(destination.index, 0, removed)
         return updated
      })

   const handleDropshadowRow: RowDropshadowProps = (event, destinationIndex, sourceIndex) => {
      // isolating the element being dragged
      const draggedElement = getDraggedElement(event.draggableId)
      // if we aint draggin anything return
      if (!draggedElement) return
      // isolate the height of element to determine the height of element being dragged
      const { clientHeight } = draggedElement as Element
      // returning the manipulated array of dom elements
      const updatedChildrenArray: Element[] = getUpdatedChildrenArray(
         draggedElement as Element,
         destinationIndex,
         sourceIndex,
      )
      // grabbing the # for marginTop
      const marginTop = getStyle(
         updatedChildrenArray,
         destinationIndex,
         'marginBottom',
         'clientHeight',
      )
      // setting our props
      setRowDropshadowProps({
         height: clientHeight + 2,
         marginTop: marginTop + 2 * destinationIndex,
      })
   }

   const handleDropshadowColumn: ColumnDropshadowProps = (event, destinationIndex, sourceIndex) => {
      // isolate element we are dragging
      const draggedElement: Element | Node | null = getDraggedElement(event.draggableId)!
         .parentNode!.parentNode
      // if nothing is being dragged return
      if (!draggedElement) return
      // isolate the height of element to determine the height of element being dragged
      const { clientHeight } = draggedElement as Element
      // returning the manipulated array of dom elements
      const updatedChildrenArray: Element[] = getUpdatedChildrenArray(
         draggedElement as Element,
         destinationIndex,
         sourceIndex,
      )
      // grabbing the # for marginLeft
      const marginLeft = getStyle(
         updatedChildrenArray,
         destinationIndex,
         'marginRight',
         'clientWidth',
      )
      // setting props
      setColDropshadowProps({
         height: clientHeight,
         marginLeft,
      })
   }

   const handleDragUpdate = (event) => {
      const { source, destination } = event
      if (!destination) return
      if (event.type === 'column') {
         handleDropshadowColumn(event, destination.index, source.index)
      } else {
         handleDropshadowRow(event, destination.index, source.index)
      }
   }

   const handleDragStart = (event) => {
      // the destination and source colIndex will be the same for start
      const { index } = event.source
      if (event.type === 'column') {
         handleDropshadowColumn(event, index, index)
      } else {
         handleDropshadowRow(event, index, index)
      }
   }

   const handleDragEnd = (result: DropResult) => {
      // if there is no destination, theres nothing to manipulate so lets
      // nope out of there REAL quick
      if (!result.destination) return
      // we only care about source and destination so lets just grab those
      const { source, destination } = result
      // if our droppableId is all-columns that means that we are
      // dragging columns around because remember we did not have to
      // dynamically instantiate our top level droppable so we hard coded
      // the id
      if (source.droppableId === 'all-columns') {
         // we go this function to handle the column movement
         handleColumnMove(source, destination)
      } else {
         // else its a row move so we go here
         handleRowMove(source, destination)
      }
   }

   const handleDeleteColumn = (colIndex: number) =>
      setColumns((prev) => {
         const updated = [...prev]
         updated.filter((dat, rowIndex) => rowIndex !== colIndex)
         return updated
      })

   const onSubmit = (newRow: string, colIndex: number) => {
      setColumns((prev) => {
         const updated = [...prev]
         updated[colIndex].tasks.push(newRow as DRIVER_NAME)
         return updated
      })
   }

   const handleRemoveTask = (rowIndex: number, colIndex: number) => {
      setColumns((prev) => {
         const updated = [...prev]
         updated[colIndex].tasks.splice(rowIndex, 1)
         return updated
      })
   }

   const handleDuplicateTask = (rowIndex: number, colIndex: number) => {
      setColumns((prev) => {
         const updated = [...prev]
         updated[colIndex].tasks.push(updated[colIndex].tasks[rowIndex])
         return updated
      })
   }

   const handleNewColumn = (newName: string) => {
      setColumns((prev) => {
         const updated = [...prev]
         return [
            ...updated,
            {
               id: v4(),
               title: newName,
               tasks: [],
            },
         ]
      })
   }

   return (
      <DragDropContext.Provider
         value={{
            onSubmit,
            handleDuplicateTask,
            handleNewColumn,
            handleRemoveTask,
            handleDeleteColumn,
            handleDragEnd,
            handleDragStart,
            handleDragUpdate,
            rowDropshadowProps,
            colDropshadowProps,
            columns,
            setColumns,
            details,
         }}
      >
         {children}
      </DragDropContext.Provider>
   )
}

export function useDragDrop() {
   const context = useContext(DragDropContext)
   if (context === undefined) {
      throw new Error('useDragDrop must be used inside DragDropProvider')
   }

   return context
}

export default DragDropProvider

