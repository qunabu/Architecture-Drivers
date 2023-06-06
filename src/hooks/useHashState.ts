import { useState } from 'react'

const getValueFromHash = <T>(paramName: string) => {
   const value = new URLSearchParams(window.location.hash.substring(1)).get(paramName)
   return (value && JSON.parse(value)) as T
}

const setValueToHash = <T>(paramName: string, value: T) => {
   const params = new URLSearchParams(window.location.hash.substring(1))
   params.set(paramName, JSON.stringify(value))
   window.location.hash = params.toString()
}

function getInitialValue<T>(key: string, initialValue: T) {
   try {
      const item = getValueFromHash<T>(key)
      return item || initialValue
   } catch (error) {
      return initialValue
   }
}

// Hook
export function useHashState<T>(key: string, initialValue: T) {
   const [storedValue, setStoredValue] = useState<T>(() => getInitialValue<T>(key, initialValue))

   const setValue = (value: T | ((val: T) => T)) => {
      try {
         const valueToStore = value instanceof Function ? value(storedValue) : value
         setStoredValue(valueToStore)
         setValueToHash(key, valueToStore)
      } catch (error) {
         console.log(error)
      }
   }
   return [storedValue, setValue] as const
}

