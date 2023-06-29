import { useState, useCallback, useEffect } from 'react'

const getValueFromHash = (paramName: string) => {
   const value = new URLSearchParams(window.location.hash.substring(1)).get(paramName)
   return value && JSON.parse(value)
}
export const useHashParams = <T>(
   paramName: string,
   defaultValue?: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
   const [paramValue, setParamValue] = useState<T>(
      () => getValueFromHash(paramName) || defaultValue,
   )

   const updateParamValue: typeof setParamValue = useCallback(
      (newValue) => {
         const theValue =
            typeof newValue === 'function' ? (newValue as Function)(paramValue) : newValue

         const newValueSerialized = JSON.stringify(theValue)

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

