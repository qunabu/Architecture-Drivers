import React from 'react'
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
import { Tooltip } from '../Tooltip/Tooltip'

type Props = {
   column: ColumnType
   columnIndex: number
}

const ColumnTitle: React.FC<{ id: string }> = ({ id }) => {
   switch (id) {
      case 'unassigned':
         return (
            <Tooltip button={<span>Irrelevant Drivers</span>}>
               <p>
                  Leave the drivers in this column that are not important in your project. Important
                  ones please move to right side column
               </p>
            </Tooltip>
         )
      case 'assigned':
         return (
            <Tooltip button={<span>Important Drivers</span>}>
               <p>
                  List of Important, sorted from most important to least important (yet still
                  relevant and important){' '}
               </p>
            </Tooltip>
         )
      default:
         return <span>{id}</span>
   }
}

const Column: React.FC<Props> = ({ column, columnIndex }) => {
   const { rowDropshadowProps } = useDragDrop()

   return (
      <Draggable isDragDisabled draggableId={column.id} index={columnIndex}>
         {(provided: DraggableProvided) => (
            <Container {...provided.draggableProps} ref={provided.innerRef}>
               <TitleContainer>
                  <Title {...provided.dragHandleProps}>
                     <ColumnTitle id={column.id} />
                  </Title>
               </TitleContainer>
               <Droppable droppableId={column.id} type="task">
                  {(prov: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                     <RowContainer id={column.id} ref={prov.innerRef} {...prov.droppableProps}>
                        {column.tasks.map((task, taskIndex, tasks) => (
                           <Row key={task} task={task} index={taskIndex} tasks={tasks} />
                        ))}
                        {column.tasks.length === 0 && (
                           <div className="column__placeholder">
                              Move (drag&drop) drivers here in order from most important less
                              important
                           </div>
                        )}
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

