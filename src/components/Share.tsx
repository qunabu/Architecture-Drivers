import { useState } from "react";

export const ShareBtn = () => {
  const [txt, setTxt] = useState<string>("Share your selection");
  const reset = () => {
    setTxt("Share your selection");
  };
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setTxt("Share URL copied to clipboard");
    } catch (err) {
      setTxt(`Failed to copy:  ${err}`);
    } finally {
      setTimeout(reset, 2000);
    }
  };
  return (
    <button className="share_btn" onClick={onClick}>
      {txt}
    </button>
  );
};
