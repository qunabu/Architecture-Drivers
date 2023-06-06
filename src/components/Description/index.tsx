import React, { useMemo } from 'react'

import { useDragDrop } from '../DragDropProvider'
import { DRIVER_NAME } from '../../assets'

const Affection: React.FC<{ task: DRIVER_NAME; index: number; tasks: DRIVER_NAME[] }> = ({
   task,
   index,
   tasks,
}) => {
   const { details } = useDragDrop()

   const data = useMemo(() => {
      const positive = Object.entries(details[task]?.affects || {}).filter(
         ([_key, value]) => value.value > 0,
      )
      const negative = Object.entries(details[task]?.affects || {}).filter(
         ([_key, value]) => value.value < 0,
      )
      return {
         positive,
         negative,
      }
   }, [task, index, tasks])

   return (
      <div>
         {data.positive.length > 0 && (
            <p className="affect">
               Affects positively:{' '}
               {data.positive.map(([key, _value]) => (
                  <span key={key}>{key}, </span>
               ))}
            </p>
         )}
         {data.negative.length > 0 && (
            <p className="affect">
               Affects negatively:{' '}
               {data.negative.map(([key, _value]) => (
                  <span key={key}>{key}, </span>
               ))}
            </p>
         )}
      </div>
   )
}

export const Description: React.FC = () => {
   const { columns, details } = useDragDrop()

   return (
      <div className="description">
         <ul>
            {columns[1].tasks.length === 0 && (
               <h3>
                  Move (drag&drop) drivers from left <i>unassigned</i> to right one -&gt;{' '}
                  <i>assigned</i>.{' '}
               </h3>
            )}
            {columns[1].tasks.map((task, index, tasks) => (
               <li key={task}>
                  <h2>
                     {index + 1}. {task}
                  </h2>
                  <p>{details[task]?.description}</p>
                  <Affection task={task} index={index} tasks={tasks} />
               </li>
            ))}
         </ul>
      </div>
   )
}

