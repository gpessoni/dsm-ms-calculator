import React from "react";
import CalcButton from "./CalcButton";

interface CalculatorKeypadProps {
  inputDigit: (digit: string) => void;
  inputDecimal: () => void;
  clearDisplay: () => void;
  handleOperator: (operator: string) => void;
  handleEquals: () => void;
  displayValue: string;
  expressionDisplay: string;
  setDisplayValue: (value: string) => void;
  setExpressionDisplay: (value: string) => void;
}

const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({
  inputDigit,
  inputDecimal,
  clearDisplay,
  handleOperator,
  handleEquals,
  displayValue,
  expressionDisplay,
  setDisplayValue,
  setExpressionDisplay,
}) => (
  <div className="grid grid-cols-4 gap-3">
    <CalcButton value="C" onClick={clearDisplay} className="bg-red-500 text-white" />
    <CalcButton value="+/-" onClick={() => {
      const negated = String(-parseFloat(displayValue));
      setDisplayValue(negated);
      setExpressionDisplay(expressionDisplay.slice(0, expressionDisplay.lastIndexOf(displayValue)) + negated);
    }} className="bg-gray-300 dark:bg-gray-700" />
    <CalcButton value="%" onClick={() => {
      const percentage = String(parseFloat(displayValue) / 100);
      setDisplayValue(percentage);
      setExpressionDisplay(expressionDisplay.slice(0, expressionDisplay.lastIndexOf(displayValue)) + percentage);
    }} className="bg-gray-300 dark:bg-gray-700" />
    <CalcButton value="÷" onClick={handleOperator} className="bg-orange-500 text-white" />

    <CalcButton value="7" onClick={inputDigit} className="bg-gray-200 dark:bg-gray-600" />
    <CalcButton value="8" onClick={inputDigit} className="bg-gray-200 dark:bg-gray-600" />
    <CalcButton value="9" onClick={inputDigit} className="bg-gray-200 dark:bg-gray-600" />
    <CalcButton value="×" onClick={handleOperator} className="bg-orange-500 text-white" />

    <CalcButton value="4" onClick={inputDigit} className="bg-gray-200 dark:bg-gray-600" />
    <CalcButton value="5" onClick={inputDigit} className="bg-gray-200 dark:bg-gray-600" />
    <CalcButton value="6" onClick={inputDigit} className="bg-gray-200 dark:bg-gray-600" />
    <CalcButton value="-" onClick={handleOperator} className="bg-orange-500 text-white" />

    <CalcButton value="1" onClick={inputDigit} className="bg-gray-200 dark:bg-gray-600" />
    <CalcButton value="2" onClick={inputDigit} className="bg-gray-200 dark:bg-gray-600" />
    <CalcButton value="3" onClick={inputDigit} className="bg-gray-200 dark:bg-gray-600" />
    <CalcButton value="+" onClick={handleOperator} className="bg-orange-500 text-white" />

    <CalcButton value="0" onClick={inputDigit} className="col-span-1 bg-gray-200 dark:bg-gray-600" />
    <CalcButton value="." onClick={inputDecimal} className="bg-gray-200 dark:bg-gray-600" />
    <CalcButton value="^" onClick={handleOperator} className="bg-orange-500 text-white" />
    <CalcButton value="=" onClick={handleEquals} className="bg-orange-500 text-white" />
  </div>
);

export default CalculatorKeypad; 