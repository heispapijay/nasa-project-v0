import React from "react";
import { Button } from "../../components/Button/Button";

interface PagePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PagePagination: React.FC<PagePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        isActive
        text="Previous"
      />
      <span className="flex items-center">{`Page ${currentPage} of ${totalPages}`}</span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        isActive
        text="Next"
      />
    </div>
  );
};
