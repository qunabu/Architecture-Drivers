import React, { useContext } from 'react'
import { DRIVER_NAME } from '../store/api'
import { StoreContext } from '../store/store'
import { IntlMessage } from './IntMessage'

const ConfrontDrivers: React.FC<{
   driverName1: DRIVER_NAME
   driverName2: DRIVER_NAME
}> = ({ driverName1, driverName2 }) => {
   const { details } = useContext(StoreContext)
   if (driverName1 === driverName2) return <td className="same"> </td>

   const affects = details[driverName1]?.affects

   if (affects && affects[driverName2]) {
      return <td>{(affects[driverName2]?.value || 0) > 0 ? '+' : '-'}</td>
   }

   return <td> </td>
}

export const Table: React.FC = () => {
   const { details } = useContext(StoreContext)

   return (
      <div className="table">
         <IntlMessage
            item="table"
            defaultMessage={[
               'Here is a table that shows how each driver affect other driver.  ',
               '**+** means there is a positive connection, one driver works well with another they support themselves  ',
               "**\\-** means there is a negative connection, one driver doesn't work well with another",
            ]}
         />
         <table>
            <thead>
               <tr>
                  <th>&nbsp;</th>
                  {Object.keys(details).map((key) => (
                     <th key={key}>
                        <IntlMessage item={key} defaultMessage={key} />
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {Object.keys(details).map((key) => (
                  <tr key={key}>
                     <td className="header">
                        <IntlMessage item={key} defaultMessage={key} />
                     </td>
                     {Object.keys(details).map((subkey) => (
                        <ConfrontDrivers
                           key={subkey}
                           driverName1={key as DRIVER_NAME}
                           driverName2={subkey as DRIVER_NAME}
                        />
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}

