import React from "react";

const CalcButton = ({ value, onClick, className = "" }: { value: string, onClick: (value: string) => void, className?: string }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={`w-16 h-16 rounded-full text-xl font-medium flex items-center justify-center ${className}`}
    >
      {value}
    </button>
  );
};

export default CalcButton; 