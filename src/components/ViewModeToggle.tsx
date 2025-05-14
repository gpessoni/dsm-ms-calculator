import React from "react";

interface ViewModeToggleProps {
  viewMode: "calculator" | "inputs";
  setViewMode: (mode: "calculator" | "inputs") => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, setViewMode }) => (
  <div className="flex w-full mb-4">
    <button 
      onClick={() => setViewMode("calculator")}
      className={`flex-1 py-2 ${viewMode === "calculator" ? "bg-orange-500 text-white" : "bg-gray-300 dark:bg-gray-700"} rounded-l-lg`}
    >
      Calculadora
    </button>
    <button 
      onClick={() => setViewMode("inputs")}
      className={`flex-1 py-2 ${viewMode === "inputs" ? "bg-orange-500 text-white" : "bg-gray-300 dark:bg-gray-700"} rounded-r-lg`}
    >
      Inputs
    </button>
  </div>
);

export default ViewModeToggle; 