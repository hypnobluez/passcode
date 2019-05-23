import React from "react";
import Button from "./Button";
const Buttons = ({
  handleNumberClick,
  handleOperatorClick,
  handleClearClick,
  handleEvaluteClick,
  handleDecimalClick
}) => {
  return (
    <div className="calculator-buttons">
      <Button value="AC" id="clear" onClick={handleClearClick} />
      <Button value="/" id="divide" onClick={handleOperatorClick} />
      <Button value="x" id="multiply" onClick={handleOperatorClick} />

      <Button value="7" id="seven" onClick={handleNumberClick} />
      <Button value="8" id="eight" onClick={handleNumberClick} />
      <Button value="9" id="nine" onClick={handleNumberClick} />
      <Button value="+" id="add" onClick={handleOperatorClick} />

      <Button value="4" id="four" onClick={handleNumberClick} />
      <Button value="5" id="five" onClick={handleNumberClick} />
      <Button value="6" id="six" onClick={handleNumberClick} />
      <Button value="-" id="subtract" onClick={handleOperatorClick} />

      <Button value="1" id="one" onClick={handleNumberClick} />
      <Button value="2" id="two" onClick={handleNumberClick} />
      <Button value="3" id="three" onClick={handleNumberClick} />
      <Button value="=" id="equals" onClick={handleEvaluteClick} />

      <Button value="0" id="zero" onClick={handleNumberClick} />
      <Button value="." id="decimal" onClick={handleDecimalClick} />
    </div>
  );
};

export default Buttons;
