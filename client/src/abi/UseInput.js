import { useState, useCallback } from "react";

function useInput(inputValue) {
  const [value, setValue] = useState(inputValue);
  const targetValue = useCallback(
    e => {
      setValue(e.target.value);
    },
    [value]
  );
  return [value, targetValue];
}

export default useInput;
