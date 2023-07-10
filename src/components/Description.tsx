import React, { useContext, useMemo } from 'react'

import { DRIVER_NAME } from '../store/api'
import { Table } from './Table'
import { StoreContext } from '../store/store'

import { Tooltip } from './Tooltip'
import { IntlMessage, DEFAULT_VALUES } from './IntMessage'

const nl2br = (str: string) =>
   str.split('\n').map((item, idx) => {
      return (
         <span key={idx}>
            {item}
            <br />
         </span>
      )
   })

const Affection: React.FC<{
   task: DRIVER_NAME
   index: number
   tasks: DRIVER_NAME[]
   isLast: boolean
}> = ({ task, index, tasks, isLast = false }) => {
   const { details } = useContext(StoreContext)

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
            <ul className="affect">
               <IntlMessage item={'Affects positively'} defaultMessage={'Affects positively'} />:{' '}
               {data.positive.map((aff) => (
                  <Tooltip
                     key={aff[0]}
                     maxWidth={500}
                     top={isLast}
                     button={
                        <li>
                           <span>+</span>
                           <IntlMessage item={aff[0]} defaultMessage={aff[0]} />
                        </li>
                     }
                  >
                     {aff[1].description}
                  </Tooltip>
               ))}
            </ul>
         )}
         {data.negative.length > 0 && (
            <ul className="affect">
               <IntlMessage item={'Affects negatively'} defaultMessage={'Affects negatively'} />
               {data.negative.map((aff) => (
                  <Tooltip
                     key={aff[0]}
                     maxWidth={500}
                     top={isLast}
                     button={
                        <li>
                           <span>-</span> <IntlMessage item={aff[0]} defaultMessage={aff[0]} />
                        </li>
                     }
                  >
                     {aff[1].description && nl2br(aff[1].description)}
                  </Tooltip>
               ))}
            </ul>
         )}
      </div>
   )
}

export const Description: React.FC<{ showDescription: boolean }> = ({
   showDescription = false,
}) => {
   const { items, details } = useContext(StoreContext)

   return (
      <div className="description">
         {(items.group2.length === 0 || showDescription) && (
            <div>
               <article>
                  <IntlMessage item="Description" defaultMessage={DEFAULT_VALUES.Description} />

                  <Table />
               </article>
            </div>
         )}
         {!showDescription && (
            <ul>
               {items.group2.map((item, index, tasks) => (
                  <li key={item}>
                     <h2>
                        {index + 1}. {item}
                     </h2>
                     <article>
                        <p>{details[item]?.description}</p>
                        <Affection
                           isLast={index === tasks.length - 1}
                           task={item}
                           index={index}
                           tasks={tasks}
                        />
                     </article>
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}

