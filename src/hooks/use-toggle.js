import { useCallback, useState } from "react";

const useToggle = (initial = false) => {
  const [toggle, setToggle] = useState(initial);

  const setToggleOn = useCallback(() => {
    setToggle(true);
  }, []);

  const setToggleOff = useCallback(() => {
    setToggle(false);
  }, []);

  const toggleOnOff = useCallback(() => {
    setToggle(prevToggle => !prevToggle);
  }, []);

  return {
    toggle,
    setToggleOn,
    setToggleOff,
    toggleOnOff
  };
};

export default useToggle;