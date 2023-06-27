import React, { PropsWithChildren, useState } from "react";

export const Tooltip: React.FC<
  PropsWithChildren<{
    button: React.ReactNode;
    top?: boolean;
    maxWidth?: number;
  }>
> = ({ children, button, top = false, maxWidth = 300 }) => {
  const [align, setAlign] = useState<"right" | "left">("left");
  const onMouseEnter = (e: React.MouseEvent) => {
    if (e.pageX + maxWidth > window.outerWidth) {
      setAlign("right");
    } else {
      setAlign("left");
    }
  };
  return (
    <div
      className={`tooltip ${align} ${top ? "top" : "bottom"}`}
      onMouseEnter={onMouseEnter}
    >
      <div className="tooltip__button">{button}</div>

      <div className="tooltip__content" style={{ maxWidth: maxWidth }}>
        {children}
      </div>
    </div>
  );
};
