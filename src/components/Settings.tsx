import { useEffect, useState } from 'react'
import { IntlMessage, DEFAULT_VALUES } from './IntMessage'
import { useHashParams } from '../hooks/setHashParams'

export const SettingsDialog: React.FC<{ open?: boolean }> = ({ open = true }) => {
   const [intlUrl, setIntlUrl] = useHashParams<string>(
      'intlUrl',
      'https://api.npoint.io/081dce210e6b53f8fad0',
   )
   const [storeUrl, setStoreUrl] = useHashParams<string>(
      'storeUrl',
      'https://api.npoint.io/00bbeb9a614af327487e',
   )

   const [isOpen, setIsOpen] = useState<boolean>(open)

   useEffect(() => {
      setIsOpen(open)
   }, [open])

   return (
      <div className={`settings ${isOpen ? 'open' : ''}`}>
         <article>
            <IntlMessage
               item={'SettingsDescription'}
               defaultMessage={DEFAULT_VALUES.SettingsDescription}
            />

            <div className="values">
               <label>
                  <span>
                     <IntlMessage item={'intlUrl'} defaultMessage={'intlUrl'} />:
                  </span>
                  <input type="text" value={intlUrl} onChange={(e) => setIntlUrl(e.target.value)} />
               </label>
               <label>
                  <span>
                     <IntlMessage item={'storeUrl'} defaultMessage={'storeUrl'} />:
                  </span>
                  <input
                     type="text"
                     value={storeUrl}
                     onChange={(e) => setStoreUrl(e.target.value)}
                  />
               </label>
            </div>
            <button onClick={() => setIsOpen(false)}>
               <IntlMessage item={'Close'} defaultMessage={'Close'} />
            </button>
         </article>
      </div>
   )
}

