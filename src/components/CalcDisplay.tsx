import React from "react";

const CalcDisplay = ({ value }: { value: string }) => {
  return (
    <div className="w-full h-24 bg-black/10 dark:bg-white/10 rounded-xl mb-4 flex items-center justify-end px-4">
      <span className="text-4xl font-[family-name:var(--font-geist-mono)]">
        {value}
      </span>
    </div>
  );
};

export default CalcDisplay; 