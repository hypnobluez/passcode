import React from "react";
import ReactDOM from "react-dom";
import Buttons from "./Buttons";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: "",
      currentOperator: "",
      formula: ""
    };
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEvalute = this.handleEvalute.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }
  handleNumber(num) {
    if (this.state.currentOperator) {
      this.setState({
        currentVal: num,
        formula: this.state.currentOperator === "=" ? num : this.state.formula + num,
        currentOperator: ""
      });
    } else {
      this.setState({
        currentVal: this.state.currentVal === "" ? num : this.state.formula.slice(-5).length === 5 && this.state.formula.slice(-5)[0] === "." ? this.state.currentVal : this.state.currentVal + num,
        formula:
          this.state.currentVal === "" && num === "0"
            ? this.state.formula
            : this.state.formula.slice(-5).length === 5 && this.state.formula.slice(-5)[0] === "."
            ? this.state.formula
            : this.state.formula + num,
        currentOperator: ""
      });
    }
  }
  handleOperator(op) {
    this.setState({
      currentOperator: op,
      formula: this.state.currentOperator && this.state.currentOperator !== "=" ? this.state.formula.slice(0, -1) + op : this.state.formula + op
    });
  }
  handleClear() {
    this.setState({
      currentOperator: "",
      formula: "",
      currentVal: ""
    });
  }
  handleDecimal() {
    if (this.state.currentOperator) {
      this.setState({
        currentVal: "0.",
        currentOperator: "",
        formula: this.state.currentOperator === "=" ? "0." : this.state.formula + "0."
      });
    } else {
      if (!this.state.currentVal.includes(".")) {
        this.setState({
          currentVal: this.state.currentVal + ".",
          formula: this.state.formula + "."
        });
      }
    }
  }
  handleEvalute() {
    let expression = this.state.formula;
    if (this.state.currentOperator) {
      expression = this.state.formula.slice(0, -1);
    }
    expression = expression.replace(/x/g, "*");
    let answer = Math.round(1000 * eval(expression)) / 1000;
    this.setState({
      currentVal: "",
      currentOperator: "=",
      formula: answer.toString()
    });
  }
  render() {
    const { formula } = this.state;
    return (
      <div className="calculator">
        <div id="display" className="display">
          <div id="calc-expression">{formula}</div>
          {/* <div id="calc-input">{currentVal}</div> */}
        </div>
        <Buttons
          handleNumberClick={this.handleNumber}
          handleOperatorClick={this.handleOperator}
          handleClearClick={this.handleClear}
          handleEvaluteClick={this.handleEvalute}
          handleDecimalClick={this.handleDecimal}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
