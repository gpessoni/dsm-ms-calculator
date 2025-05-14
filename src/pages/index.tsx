import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import CalcButton from "../components/CalcButton";
import CalcDisplay from "../components/CalcDisplay";
import CalculatorPanel from "../components/CalculatorPanel";
import InputsPanel from "../components/InputsPanel";
import ViewModeToggle from "../components/ViewModeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expressionDisplay, setExpressionDisplay] = useState("");
  const [viewMode, setViewMode] = useState<"calculator" | "inputs">("calculator");
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [inputOperator, setInputOperator] = useState("+");
  const [inputResult, setInputResult] = useState("");

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
      setExpressionDisplay(expressionDisplay + digit);
    } else {
      const newDisplayValue = displayValue === "0" ? digit : displayValue + digit;
      setDisplayValue(newDisplayValue);
      if (displayValue === "0") {
        setExpressionDisplay(expressionDisplay === "0" ? digit : expressionDisplay + digit);
      } else {
        setExpressionDisplay(expressionDisplay + digit);
      }
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setExpressionDisplay(expressionDisplay + "0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
      setExpressionDisplay(expressionDisplay + ".");
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setExpressionDisplay("");
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      performCalculation();
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);

    const operatorSymbol = nextOperator === "^" ? "^" : nextOperator;
    setExpressionDisplay(expressionDisplay + " " + operatorSymbol + " ");
  };

  const performCalculation = async () => {
    const inputValue = parseFloat(displayValue);
    setLoading(true);

    try {
      let result;
      const first = firstOperand;
      const second = inputValue;

      if (operator === "÷" && second === 0) {
        setDisplayValue("Divisão por zero");
        return;
      }

      let endpoint = "";
      switch (operator) {
        case "+":
          endpoint = process.env.NEXT_PUBLIC_ADD_ENDPOINT || "";
          break;
        case "-":
          endpoint = process.env.NEXT_PUBLIC_SUBTRACT_ENDPOINT || "";
          break;
        case "×":
          endpoint = process.env.NEXT_PUBLIC_MULTIPLY_ENDPOINT || "";
          break;
        case "÷":
          endpoint = process.env.NEXT_PUBLIC_DIVIDE_ENDPOINT || "";
          break;
        case "^":
          endpoint = process.env.NEXT_PUBLIC_POWER_ENDPOINT || "";
          break;
        default:
          return;
      }

      const response = await fetch(`${endpoint}/${first}/${second}`);
      result = await response.json();

      const formattedResult = Number(result.result).toFixed(3);
      setDisplayValue(formattedResult);
      setFirstOperand(Number(formattedResult));
    } catch (error) {
      console.error(error);
      setDisplayValue("Erro");
    } finally {
      setLoading(false);
    }
  };

  const calculateInputs = async () => {
    if (!inputA || !inputB) return;

    setLoading(true);
    try {
      const a = parseFloat(inputA);
      const b = parseFloat(inputB);

      if (inputOperator === "÷" && b === 0) {
        setInputResult("Divisão por zero");
        return;
      }

      let endpoint = "";
      switch (inputOperator) {
        case "+":
          endpoint = process.env.NEXT_PUBLIC_ADD_ENDPOINT || "";
          break;
        case "-":
          endpoint = process.env.NEXT_PUBLIC_SUBTRACT_ENDPOINT || "";
          break;
        case "×":
          endpoint = process.env.NEXT_PUBLIC_MULTIPLY_ENDPOINT || "";
          break;
        case "÷":
          endpoint = process.env.NEXT_PUBLIC_DIVIDE_ENDPOINT || "";
          break;
        case "^":
          endpoint = process.env.NEXT_PUBLIC_POWER_ENDPOINT || "";
          break;
        default:
          return;
      }

      const response = await fetch(`${endpoint}/${a}/${b}`);
      const data = await response.json();
      const formattedResult = Number(data.result).toFixed(3);
      setInputResult(formattedResult);
    } catch (error) {
      console.error(error);
      setInputResult("Erro");
    } finally {
      setLoading(false);
    }
  };


  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    setExpressionDisplay(expressionDisplay + " = ");

    performCalculation();
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (["Enter", "Escape", "Backspace", "+", "-", "*", "/", "^", "%", "."].includes(event.key)) {
        event.preventDefault();
      }

      // Números
      if (/^[0-9]$/.test(event.key)) {
        inputDigit(event.key);
      }
      // Operadores
      else if (event.key === "+") {
        handleOperator("+");
      }
      else if (event.key === "-") {
        handleOperator("-");
      }
      else if (event.key === "*") {
        handleOperator("×");
      }
      else if (event.key === "/") {
        handleOperator("÷");
      }
      else if (event.key === "^") {
        handleOperator("^");
      }
      // Outras teclas
      else if (event.key === "Enter" || event.key === "=") {
        handleEquals();
      }
      else if (event.key === "Escape") {
        clearDisplay();
      }
      else if (event.key === ".") {
        inputDecimal();
      }
      else if (event.key === "%") {
        const percentage = String(parseFloat(displayValue) / 100);
        setDisplayValue(percentage);
        setExpressionDisplay(expressionDisplay.slice(0, expressionDisplay.lastIndexOf(displayValue)) + percentage);
      }
      else if (event.key === "Backspace") {
        if (displayValue.length > 1) {
          const newValue = displayValue.slice(0, -1);
          setDisplayValue(newValue);
          setExpressionDisplay(expressionDisplay.slice(0, expressionDisplay.lastIndexOf(displayValue)) + newValue);
        } else {
          setDisplayValue("0");
          setExpressionDisplay(expressionDisplay.slice(0, expressionDisplay.lastIndexOf(displayValue)) + "0");
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [displayValue, expressionDisplay, inputDigit, inputDecimal, clearDisplay, handleOperator, handleEquals]);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-xs">
        <h1 className="text-2xl font-bold mb-4">Calculadora</h1>

        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />

        {viewMode === "calculator" ? (
          <CalculatorPanel
            displayValue={displayValue}
            expressionDisplay={expressionDisplay}
            loading={loading}
            inputDigit={inputDigit}
            inputDecimal={inputDecimal}
            clearDisplay={clearDisplay}
            handleOperator={handleOperator}
            handleEquals={handleEquals}
            setDisplayValue={setDisplayValue}
            setExpressionDisplay={setExpressionDisplay}
          />
        ) : (
          <InputsPanel
            inputA={inputA}
            setInputA={setInputA}
            inputB={inputB}
            setInputB={setInputB}
            inputOperator={inputOperator}
            setInputOperator={setInputOperator}
            inputResult={inputResult}
            loading={loading}
            calculateInputs={calculateInputs}
          />
        )}
      </main>
    </div>
  );
}
