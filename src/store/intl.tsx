import React, {
   Context,
   createContext,
   PropsWithChildren,
   useCallback,
   useEffect,
   useState,
} from 'react'

import { useHashParams } from '../hooks/setHashParams'

type IntlLib = Record<string, string | string[]>

type StoreContextType = {
   loading: boolean
   getMessage: (key: string) => string | string[] | undefined
}

export const StoreContext: Context<StoreContextType> = createContext({
   loading: false,
   getMessage: (key) => key,
} as StoreContextType)

type State = {
   loading: boolean
   items: IntlLib
}

export const StoreContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
   const [url] = useHashParams<string>('intlUrl', 'https://api.npoint.io/f6f69eee26eb7445359f')

   const [state, setState] = useState<State>({
      loading: false,
      items: {} as IntlLib,
   })

   useEffect(() => {
      setState((prevState) => ({ ...prevState, loading: true }))
      fetch(url)
         .then((data) => data.json())
         .then((intlLib) =>
            setState((prevState) => ({
               items: Object.assign(prevState.items, intlLib),
               loading: false,
            })),
         )
         .finally(() => setState((prevState) => ({ ...prevState, loading: false })))
   }, [url])

   const getMessage = useCallback(
      (key: string) => {
         return state.items[key]
      },
      [state],
   )

   return (
      <StoreContext.Provider
         value={{
            getMessage,
            loading: state.loading,
         }}
      >
         {children}
      </StoreContext.Provider>
   )
}

