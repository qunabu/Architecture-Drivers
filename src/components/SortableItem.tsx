import React, { useContext, useMemo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Tooltip } from './Tooltip'
import { StoreContext } from '../store/store'
import { DRIVER_NAME } from '../store/api'
import { IntlMessage } from './IntMessage'

const SortableItem: React.FC<{
   id: DRIVER_NAME
   index: number
   group: 'group1' | 'group2'
}> = ({ id, group, index }) => {
   const { details, items } = useContext(StoreContext)

   const groupItems = items[group] as DRIVER_NAME[]

   const affects = useMemo(() => {
      const positive = items[group].filter((tTask, tIndex) => {
         const a = details[tTask] && details[tTask]?.affects
         return tIndex > index && a && a[id]?.value === 1
      })
      const negative = groupItems.filter((tTask, tIndex) => {
         const a = details[tTask] && details[tTask]?.affects
         return tIndex < index && a && a[id]?.value === -1
      })
      const bonus = positive.length - negative.length
      return {
         positive,
         negative,
         bonus,
      }
   }, [id, index, groupItems])

   const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id,
   })

   const itemStyle = {
      transform: CSS.Transform.toString(transform),
      transition,
   }

   return (
      <div
         className={`item ${isDragging ? 'isDragging' : ''}`}
         style={itemStyle}
         ref={setNodeRef}
         {...attributes}
         {...listeners}
      >
         <span>
            {' '}
            {group === 'group2' && `${index + 1}. `}
            <IntlMessage item={id} defaultMessage={id} />
         </span>
         <div className="item__right">
            <Tooltip button={<i>i</i>}>{details[id]?.description}</Tooltip>
            {group === 'group2' && affects.negative.length > 0 && (
               <Tooltip button={<i>-</i>}>
                  <IntlMessage item="Negative bonus from" defaultMessage="Negative bonus from" />{' '}
                  {affects.negative.map((driverName) => (
                     <IntlMessage item={driverName} defaultMessage={driverName} />
                  ))}
               </Tooltip>
            )}
            {group === 'group2' && affects.positive.length > 0 && (
               <Tooltip button={<i>+</i>}>
                  <IntlMessage item="Positive bonus from" defaultMessage="Positive bonus from" />{' '}
                  {affects.positive.map((driverName) => (
                     <IntlMessage item={driverName} defaultMessage={driverName} />
                  ))}
               </Tooltip>
            )}
         </div>
      </div>
   )
}

export default SortableItem

