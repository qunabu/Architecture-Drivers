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
   > b {
      position: absolute;
      font-size: 70%;
      right: 3px;
      top: 3px;
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
                  <b className="bonus">
                     Bonus: {affects.bonus > 0 ? '+' : ''}
                     {affects.bonus}
                  </b>
               )}

               {/**
               {affects.positive.length > 0 && <small>positive {affects.positive}</small>}
               {affects.negative.length > 0 && <small>negative {affects.negative}</small>}
         **/}

               {/**

               {affects && Object.values(affects).reduce((acc, affect) => acc + affect, 0)}

         */}

               {/**

            {task.affects && (
               <div className="affect-list">
                  <ul>
                     {
                        // plus from ones above
                        // minus from ones below
                     }
                     {tasks
                        .filter(
                           (tTask, tIndex) =>
                              (tIndex > index && tTask.affects && tTask.affects[task.id] === 1) ||
                              (tIndex < index && tTask.affects && tTask.affects[task.id] === -1),
                        )
                        .map((tTask) => (
                           <li key={tTask.id}>
                              {tTask.id} {tTask.affects && tTask.affects[task.id]}
                           </li>
                        ))}
                  </ul>
               </div>
            )}

                        */}
            </Container>
         )}
      </Draggable>
   )
}

export default Row

