import React, { useEffect } from 'react'

import { useDragDrop } from '../DragDropProvider'

export const Description: React.FC = () => {
   const { columns, details } = useDragDrop()

   return (
      <div className="description">
         <ul>
            {columns[1].tasks.length === 0 && (
               <h3>Move (drag&drop) drivers from left unassigned to right one. </h3>
            )}
            {columns[1].tasks.map((task, index, tasks) => (
               <li key={task}>
                  <h2>
                     {index + 1}. {task}
                  </h2>
                  <p>{details[task]?.description}</p>
                  <p className="affect">
                     Affects positively:{' '}
                     {Object.entries(details[task]?.affects || {})
                        .filter(([_key, value]) => value.value > 0)
                        .map(([key, _value]) => (
                           <span key={key}>{key}, </span>
                        ))}
                  </p>
                  <p className="affect">
                     Affects negatively:{' '}
                     {Object.entries(details[task]?.affects || {})
                        .filter(([_key, value]) => value.value < 0)
                        .map(([key, _value]) => (
                           <span key={key}>{key}, </span>
                        ))}
                  </p>
               </li>
            ))}
         </ul>
      </div>
   )
}

