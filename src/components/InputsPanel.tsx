import React from "react";

interface InputsPanelProps {
  inputA: string;
  setInputA: (value: string) => void;
  inputB: string;
  setInputB: (value: string) => void;
  inputOperator: string;
  setInputOperator: (value: string) => void;
  inputResult: string;
  loading: boolean;
  calculateInputs: () => void;
}

const InputsPanel: React.FC<InputsPanelProps> = ({
  inputA,
  setInputA,
  inputB,
  setInputB,
  inputOperator,
  setInputOperator,
  inputResult,
  loading,
  calculateInputs,
}) => (
  <div className="w-full">
    <div className="w-full h-24 bg-black/10 dark:bg-white/10 rounded-xl mb-4 flex items-center justify-end px-4">
      <span className="text-4xl font-[family-name:var(--font-geist-mono)]">
        {loading ? "Calculando" : inputResult || "0"}
      </span>
    </div>
    <div className="flex flex-col gap-4 w-full">
      <input
        type="number"
        value={inputA}
        onChange={(e) => setInputA(e.target.value)}
        placeholder="Primeiro número"
        className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-600"
      />
      <select
        value={inputOperator}
        onChange={(e) => setInputOperator(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-600"
      >
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="×">×</option>
        <option value="÷">÷</option>
        <option value="^">^</option>
      </select>
      <input
        type="number"
        value={inputB}
        onChange={(e) => setInputB(e.target.value)}
        placeholder="Segundo número"
        className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-600"
      />
      <button
        onClick={calculateInputs}
        className="w-full p-3 rounded-lg bg-orange-500 text-white font-medium"
      >
        Calcular
      </button>
    </div>
  </div>
);

export default InputsPanel; 