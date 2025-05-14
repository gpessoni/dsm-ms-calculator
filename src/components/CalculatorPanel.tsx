import React from "react";
import CalculatorKeypad from "./CalculatorKeypad";

interface CalculatorPanelProps {
  displayValue: string;
  expressionDisplay: string;
  loading: boolean;
  inputDigit: (digit: string) => void;
  inputDecimal: () => void;
  clearDisplay: () => void;
  handleOperator: (operator: string) => void;
  handleEquals: () => void;
  setDisplayValue: (value: string) => void;
  setExpressionDisplay: (value: string) => void;
}

const CalculatorPanel: React.FC<CalculatorPanelProps> = ({
  displayValue,
  expressionDisplay,
  loading,
  inputDigit,
  inputDecimal,
  clearDisplay,
  handleOperator,
  handleEquals,
  setDisplayValue,
  setExpressionDisplay,
}) => {
  // Função para truncar a expressão se for muito longa
  const truncateExpression = (expression: string) => {
    if (expression.length > 20) {
      return "..." + expression.slice(-20);
    }
    return expression;
  };

  return (
    <>
      <div className="w-full h-24 bg-black/10 dark:bg-white/10 rounded-xl mb-4 flex flex-col items-end justify-center px-4">
        <span className="text-lg font-[family-name:var(--font-geist-mono)] text-gray-600 dark:text-gray-300">
          {truncateExpression(expressionDisplay) || "0"}
        </span>
        <span className="text-4xl font-[family-name:var(--font-geist-mono)]">
          {loading ? "Calculando" : displayValue}
        </span>
      </div>
      <CalculatorKeypad
        inputDigit={inputDigit}
        inputDecimal={inputDecimal}
        clearDisplay={clearDisplay}
        handleOperator={handleOperator}
        handleEquals={handleEquals}
        displayValue={displayValue}
        expressionDisplay={expressionDisplay}
        setDisplayValue={setDisplayValue}
        setExpressionDisplay={setExpressionDisplay}
      />
    </>
  );
};

export default CalculatorPanel;