import { useState, useCallback, useEffect } from 'react'

const getValueFromHash = (paramName: string) => {
   const value = new URLSearchParams(window.location.hash.substring(1)).get(paramName)
   if (value) {
      try {
         return JSON.parse(value)
      } catch (e) {
         return value
      }
   }

   return value && JSON.parse(value)
}
export const useHashParams = <T>(
   paramName: string,
   defaultValue?: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
   const [paramValue, setParamValue] = useState<T>(() => {
      return getValueFromHash(paramName) || defaultValue
   })

   const updateParamValue: typeof setParamValue = useCallback(
      (newValue) => {
         const theValue =
            typeof newValue === 'function' ? (newValue as Function)(paramValue) : newValue

         let newValueSerialized

         switch (typeof theValue) {
            case 'object':
               newValueSerialized = JSON.stringify(theValue)
               break
            default:
               newValueSerialized = theValue
         }

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

