import React, { useMemo } from 'react'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'
import styled from 'styled-components'
import type { TaskType } from '../../assets'
import { useDragDrop } from '../DragDropProvider'

const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 4px;
   width: 100%;
   min-height: 50px;
   margin-bottom: 10px;
   border: 1px solid;
   flex-wrap: wrap;
   position: relative;
   > .description,
   > .bonus {
      position: absolute;
      font-size: 70%;
      right: 3px;
      top: 3px;
   }
   > .description i {
      display: inline-block;
      padding: 3px;
      border: 1px solid;
      border-radius: 100%;

      width: 18px;
      height: 18px;
      text-align: center;
      line-height: 10px;
      font-style: normal;
      font-size: 12px;
   }
   > .bonus {
      font-weight: bold;
   }
   .affect-list {
      position: absolute;
      right: 5px;
      top: 5px;
      li {
         display: inline-flex;
      }
   }
`

type Props = {
   task: TaskType
   index: number
   tasks: TaskType[]
}

const Row: React.FC<Props> = ({ task, index, tasks }) => {
   const { details } = useDragDrop()

   const affects = useMemo(() => {
      const positive = tasks.filter((tTask, tIndex) => {
         const a = details[tTask] && details[tTask]?.affects
         return tIndex > index && a && a[task]?.value === 1
      })
      const negative = tasks.filter((tTask, tIndex) => {
         const a = details[tTask] && details[tTask]?.affects
         return tIndex < index && a && a[task]?.value === -1
      })
      const bonus = positive.length - negative.length
      return {
         positive,
         negative,
         bonus,
      }
   }, [task, index, tasks])

   return (
      <Draggable draggableId={task} index={index}>
         {(provided: DraggableProvided) => (
            <Container
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               ref={provided.innerRef}
            >
               {task}
               {affects.bonus !== 0 && (
                  <div className="bonus">
                     <div className="tooltip">
                        Bonus: {affects.bonus > 0 ? '+' : ''}
                        {affects.bonus}
                        <div className="tooltip__content">
                           {affects.positive.length > 0 && (
                              <p>Positive: {affects.positive.join(', ')}</p>
                           )}
                           {affects.negative.length > 0 && (
                              <p>Negative: {affects.negative.join(', ')}</p>
                           )}
                        </div>
                     </div>
                  </div>
               )}

               <div className="description">
                  <div className="tooltip">
                     <i>i</i>
                     <div className="tooltip__content">{details[task]?.description}</div>
                  </div>
               </div>
            </Container>
         )}
      </Draggable>
   )
}

export default Row

