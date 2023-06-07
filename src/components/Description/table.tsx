import React from 'react'
import { useDragDrop } from '../DragDropProvider'
import { DRIVER_NAME } from '../../assets'

const ConfrontDrivers: React.FC<{ dname1: DRIVER_NAME; dname2: DRIVER_NAME }> = ({
   dname1,
   dname2,
}) => {
   const { details } = useDragDrop()
   if (dname1 === dname2) return <td className="same"> </td>

   const affects = details[dname1]?.affects

   if (affects && affects[dname2]) {
      return <td>{(affects[dname2]?.value || 0) > 0 ? '+' : '-'}</td>
   }

   return <td> </td>
}

export const Table: React.FC = () => {
   const { details } = useDragDrop()

   return (
      <div className="table">
         <p>
            Here is a table that shows how each driver affect other driver.
            <br />
            <strong>+</strong> means there is a positive connection, one driver works well with
            another they support themselves
            <br />
            <strong>-</strong> means there is a negative connection, one driver doesn&apos;t work
            well with another
         </p>
         <table>
            <thead>
               <tr>
                  <th>&nbsp;</th>
                  {Object.keys(details).map((key) => (
                     <th key={key}>{key}</th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {Object.keys(details).map((key) => (
                  <tr key={key}>
                     <td className="header">{key}</td>
                     {Object.keys(details).map((subkey) => (
                        <ConfrontDrivers
                           key={subkey}
                           dname1={key as DRIVER_NAME}
                           dname2={subkey as DRIVER_NAME}
                        />
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}

