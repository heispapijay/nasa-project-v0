import React from "react";
import { Button } from "../Button/Button";

interface FiltersProps {
  filter: "image" | "video" | "audio";
  onFilterChange: (newFilter: "image" | "video" | "audio") => void;
}

export const Filters: React.FC<FiltersProps> = ({ filter, onFilterChange }) => {
  

  return (
    <div className="mt-4 flex gap-4">
      <Button
        onClick={() => onFilterChange("image")}
        isActive={filter.includes("image")}
        text="Images"
      />

      <Button
        onClick={() => onFilterChange("video")}
        isActive={filter.includes("video")}
        text="Videos"
      />

      <Button
        onClick={() => onFilterChange("audio")}
        isActive={filter.includes("audio")}
        text="Audio"
      />
    </div>
  );
};
