"use client";
import { useState } from "react";

interface PillsButtonProps {
  options: string[];
  defaultOption: string;
  onOptionChange: (option: string) => void;
}

const PillsButton = ({
  options,
  defaultOption,
  onOptionChange,
}: PillsButtonProps) => {
  const [activeOption, setActiveOption] = useState(defaultOption);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    onOptionChange(option);
  };

  return (
    <div className="flex space-x-1 rounded-full bg-[#EAECF0] p-1 text-xs tracking-tight lead">
      {options.map((option: string) => (
        <button
          key={option}
          className={`px-4 py-2 w-full transition-all duration-300 ${
            activeOption === option
              ? "rounded-full bg-white text-primary-950 font-medium  "
              : "bg-[#EAECF0] rounded-full text-gray font-extralight"
          }`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default PillsButton;
