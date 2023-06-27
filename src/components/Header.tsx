import { ShareBtn } from "./Share";
export const Header = () => {
  return (
    <header>
      <h1>How do decide about Architecture Drivers?</h1>
      <ShareBtn />
      <a href="https://github.com/qunabu/Architecture-Drivers" target="_blank">
        {" "}
        <img
          alt="Number of stars from https://github.com/qunabu/Architecture-Drivers"
          src="https://img.shields.io/github/stars/qunabu/Architecture-Drivers?style=social"
        ></img>
      </a>
    </header>
  );
};
