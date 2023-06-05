import React, { useEffect } from 'react'
import {
   Draggable,
   DraggableProvided,
   Droppable,
   DroppableProvided,
   DroppableStateSnapshot,
} from 'react-beautiful-dnd'
import { ColumnType } from '../../assets/api'
import { useDragDrop } from '../DragDropProvider'
import { Row } from '../Row'
import {
   Container,
   DropshadowContainer,
   RowContainer,
   RowDropshadow,
   Title,
   TitleContainer,
} from './Column.styled'

type Props = {
   column: ColumnType
   columnIndex: number
}

const Column: React.FC<Props> = ({ column, columnIndex }) => {
   const { rowDropshadowProps } = useDragDrop()

   return (
      <Draggable isDragDisabled draggableId={column.id} index={columnIndex}>
         {(provided: DraggableProvided) => (
            <Container {...provided.draggableProps} ref={provided.innerRef}>
               <TitleContainer>
                  <Title {...provided.dragHandleProps}>{column.id}</Title>
               </TitleContainer>
               <Droppable droppableId={column.id} type="task">
                  {(prov: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                     <RowContainer id={column.id} ref={prov.innerRef} {...prov.droppableProps}>
                        {column.tasks.map((task, taskIndex, tasks) => (
                           <Row key={task} task={task} index={taskIndex} tasks={tasks} />
                        ))}
                        {prov.placeholder}
                        <DropshadowContainer>
                           {snapshot.isDraggingOver && (
                              <RowDropshadow
                                 marginTop={rowDropshadowProps.marginTop}
                                 height={rowDropshadowProps.height}
                              />
                           )}
                        </DropshadowContainer>
                     </RowContainer>
                  )}
               </Droppable>
            </Container>
         )}
      </Draggable>
   )
}

export default Column

