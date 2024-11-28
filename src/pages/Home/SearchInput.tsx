import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/InputField/InputField";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <InputField value={query} onChange={setQuery} onKeyDown={handleKeyDown} />
      <Button onClick={handleSearch} isActive text="Search" />
    </div>
  );
};
