import React, { PropsWithChildren } from 'react'

export const Tooltip: React.FC<PropsWithChildren<{ button: React.ReactNode }>> = ({
   children,
   button,
}) => {
   return (
      <div className="tooltip">
         {button}
         <div className="tooltip__content">{children}</div>
      </div>
   )
}
