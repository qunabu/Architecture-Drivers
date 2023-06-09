import React, { Context, createContext, PropsWithChildren, useEffect, useState } from 'react'

import { DRIVERS, DRIVER_NAME, TaskTypeDetails } from './api'
import { useHashParams } from '../hooks/setHashParams'

type StoreContextType = {
   loading: boolean
   items: State
   max: number
   setItems?: React.Dispatch<React.SetStateAction<State>>
   setMax?: React.Dispatch<React.SetStateAction<number>>
   reset?: () => void
   details: TaskTypeDetails
}

type State = {
   group1: DRIVER_NAME[]
   group2: DRIVER_NAME[]
}

// FIX THIS
// @ts-ignore
export const StoreContext: Context<StoreContextType> = createContext({
   loading: false,
   items: {
      group1: [],
      group2: [],
   },
   details: {} as TaskTypeDetails,
})

export const StoreContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
   const [loading, setLoading] = useState<boolean>(false)

   const [details, setDetails] = useState<TaskTypeDetails>({})

   const [url] = useHashParams<string>('storeUrl', 'https://api.npoint.io/7f9e677a982eed622d84')

   const [items, setItems] = useHashParams<State>('groups', {
      group1: DRIVERS,
      group2: [],
   })

   const [max, setMax] = useState<number>(Math.max(3, items.group2.length))

   const onDriversLoaded = (drivers: TaskTypeDetails) => {
      setDetails(drivers)
      if (items.group1.length === 0) {
         setItems({
            group1: Object.keys(drivers) as DRIVER_NAME[],
            group2: [],
         })
      }
   }

   useEffect(() => {
      if (items.group2.length > max) {
         setItems({
            group1: [...items.group1, ...items.group2.slice(max)],
            group2: items.group2.slice(0, max),
         })
      }
   }, [max, items])

   useEffect(() => {
      setLoading(true)
      fetch(url)
         .then((data) => data.json())
         .then((drivers) => onDriversLoaded(drivers))
         .finally(() => setLoading(false))
   }, [url])

   const reset = () => {
      setItems({
         group1: DRIVERS,
         group2: [],
      })
   }
   const value = {
      loading,
      items,
      setItems,
      reset,
      details,
      max,
      setMax,
   }
   return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

