import { IntlMessage } from './IntMessage'
import { ShareBtns } from './Share'
export const Header: React.FC<{ onSettingsClick: () => void }> = ({ onSettingsClick }) => {
   return (
      <header>
         <h1>
            <IntlMessage
               item="title"
               defaultMessage={'How do decide about Architecture Drivers?'}
            />
         </h1>
         <ShareBtns onSettingsClick={onSettingsClick} />

         <a href="https://github.com/qunabu/Architecture-Drivers" target="_blank">
            {' '}
            <img
               alt="Number of stars from https://github.com/qunabu/Architecture-Drivers"
               src="https://img.shields.io/github/stars/qunabu/Architecture-Drivers?style=social"
            ></img>
         </a>
      </header>
   )
}

