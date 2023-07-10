import { useState } from 'react'
import { IntlMessage } from './IntMessage'

export const ShareBtns: React.FC<{ onSettingsClick: () => void }> = ({ onSettingsClick }) => {
   const [txt, setTxt] = useState<string>('Share your selection')
   const reset = () => {
      setTxt('Share your selection')
   }
   const onClick = async () => {
      try {
         await navigator.clipboard.writeText(window.location.href)
         setTxt('Share URL copied to clipboard')
      } catch (err) {
         setTxt(`Failed to copy:  ${err}`)
      } finally {
         setTimeout(reset, 2000)
      }
   }
   return (
      <div className="share_btns">
         <button onClick={() => onSettingsClick()}>
            <IntlMessage item={'Settings'} defaultMessage={'Settings'} />
         </button>{' '}
         <button className="share_btn" onClick={onClick}>
            <IntlMessage item={txt} defaultMessage={txt} />
         </button>
      </div>
   )
}

