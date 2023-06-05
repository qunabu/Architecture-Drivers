import { useState, useCallback, useEffect } from 'react'

type HashParamValue = string | string[] | object | null

const getValueFromHash = (paramName: string) => {
   const value = new URLSearchParams(window.location.hash.substring(1)).get(paramName)
   return value && JSON.parse(value)
}
export const useHashParams = (paramName: string, defaultValue: HashParamValue = '') => {
   const [paramValue, setParamValue] = useState<HashParamValue>(() => getValueFromHash(paramName))

   const updateParamValue = useCallback(
      (newValue) => {
         const newValueSerialized = JSON.stringify(newValue)

         if (paramValue !== newValueSerialized) {
            const params = new URLSearchParams(window.location.hash.substring(1))
            params.set(paramName, newValueSerialized)
            window.location.hash = params.toString()
            setParamValue(newValue)
         }
      },
      [paramName, paramValue],
   )

   const hashChangeHandler = useCallback(() => {
      updateParamValue(getValueFromHash(paramName))
   }, [])

   useEffect(() => {
      if (!paramValue && defaultValue) {
         updateParamValue(defaultValue)
      }
   }, [defaultValue, paramValue])

   useEffect(() => {
      window.addEventListener('hashchange', hashChangeHandler)
      return () => {
         window.removeEventListener('hashchange', hashChangeHandler)
      }
   }, [])

   return [paramValue, updateParamValue]
}

