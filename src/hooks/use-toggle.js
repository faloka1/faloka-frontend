import { useState } from "react";

const useToggle = (initial = false) => {
  const [toggle, setToggle] = useState(initial);

  const setToggleOn = () => {
    setToggle(true);
  };

  const setToggleOff = () => {
    setToggle(false);
  };

  const toggleOnOff = () => {
    setToggle(prevToggle => !prevToggle);
  };

  return {
    toggle,
    setToggleOn,
    setToggleOff,
    toggleOnOff
  };
};

export default useToggle;