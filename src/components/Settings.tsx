import { IntlMessage, DEFAULT_VALUES } from './IntMessage'
import { useHashParams } from '../hooks/setHashParams'

export const SettingsDialog: React.FC<{ open?: boolean; onClose: () => void }> = ({
   open = true,
   onClose,
}) => {
   const [intlUrl, setIntlUrl] = useHashParams<string>(
      'intlUrl',
      'https://api.npoint.io/081dce210e6b53f8fad0',
   )
   const [storeUrl, setStoreUrl] = useHashParams<string>(
      'storeUrl',
      'https://api.npoint.io/00bbeb9a614af327487e',
   )

   return (
      <div className={`settings ${open ? 'open' : ''}`}>
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
            <button onClick={() => onClose()}>
               <IntlMessage item={'Close'} defaultMessage={'Close'} />
            </button>
         </article>
      </div>
   )
}

