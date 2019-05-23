import React from "react";
import noop from "lodash/noop";
const Button = ({ value, id, onClick = noop }) => {
  return (
    <button
      className="calc-button"
      id={id}
      onClick={() => onClick(value)}
      value={value}
    >
      {value}
    </button>
  );
};

export default Button;
