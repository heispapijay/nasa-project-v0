import { FC } from "react";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputField: FC<InputFieldProps> = ({ value, onChange, onKeyDown, }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange((e.target as HTMLInputElement).value)}
      placeholder="Search for NASA images and videos..."
      className="p-2 border rounded text-white bg-black custom-shadow"
      onKeyDown={onKeyDown}
    />
  );
};
