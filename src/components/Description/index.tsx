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
         {columns[1].tasks.length === 0 && (
            <div>
               <h3>
                  Move (drag&drop) drivers from left <i>unassigned</i> to right one -&gt;{' '}
                  <i>assigned</i>.{' '}
               </h3>
               <p>
                  Deciding on the order of architecture drivers involves understanding their
                  relative importance and prioritizing them based on the specific context and goals
                  of the architecture. Here are some steps you can follow to make informed decisions
                  about the order of architecture drivers:
               </p>

               <p>
                  1. Identify and list the architecture drivers: Start by identifying and listing
                  all the relevant architecture drivers. These drivers are the key factors that
                  influence the design and behavior of the architecture. Examples of architecture
                  drivers include performance, scalability, security, usability, maintainability,
                  cost, time to market, and regulatory compliance.
               </p>
               <p>
                  2. Understand the business goals and context: Gain a clear understanding of the
                  business goals, objectives, and context in which the architecture will be
                  implemented. Consider factors such as the organization&apos;s strategy, market
                  demands, customer expectations, and any specific constraints or challenges.
               </p>
               <p>
                  3. Prioritize based on importance: Evaluate and prioritize the architecture
                  drivers based on their relative importance to the business goals and context.
                  Determine which drivers have the most significant impact on achieving the desired
                  outcomes. For example, if time to market is a critical factor, it may be
                  prioritized higher than other drivers.
               </p>
               <p>
                  4. Consider dependencies and trade-offs: Consider the interdependencies and
                  potential trade-offs among the architecture drivers. Some drivers may have
                  dependencies on others, while optimizing one driver may negatively impact another.
                  For example, improving performance might require additional resources and impact
                  cost or vice versa.
               </p>
               <p>
                  5. Seek stakeholder input: Engage with stakeholders to gather their perspectives
                  and input on the prioritization of architecture drivers. Stakeholders may include
                  business owners, project managers, technical experts, end-users, and other
                  relevant parties. Understanding their needs and expectations can help inform the
                  prioritization process.
               </p>
               <p>
                  6. Revisit and refine the prioritization: Continuously evaluate and refine the
                  prioritization based on new information or changing circumstances. Architecture
                  decisions are iterative, and priorities may shift as the project progresses or new
                  insights emerge.
               </p>
               <p>
                  7. Document and communicate: Document the prioritization of architecture drivers
                  and the rationale behind it. This documentation will serve as a reference for the
                  architecture design process and help communicate the priorities to the development
                  team and other stakeholders.
               </p>
               <p>
                  Remember that the order of architecture drivers is context-specific and may vary
                  from one project to another. It&apos;s essential to consider the unique
                  characteristics, goals, and constraints of the specific architecture initiative to
                  make informed decisions.
               </p>
               <p>
                  <strong>This is a tool that hopefully will help you with decision</strong>
               </p>
            </div>
         )}
         <ul>
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

