import React from "react";

type ButtonProps = {
  onClick: () => void; 
  text: string; 
  disabled?: boolean; 
  isActive?: boolean;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  disabled = false,
  isActive = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded text-sm custom-shadow border border-gray-500 ${
        isActive ? "bg-white text-black" : "bg-gray-300"
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {text}
    </button>
  );
};
