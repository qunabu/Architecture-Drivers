import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles.css'
import { StoreContextProvider } from './store/store.tsx'
import { StoreContextProvider as IntlStoreContextProvider } from './store/intl.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <IntlStoreContextProvider>
         <StoreContextProvider>
            <App />
         </StoreContextProvider>
      </IntlStoreContextProvider>
   </React.StrictMode>,
)

