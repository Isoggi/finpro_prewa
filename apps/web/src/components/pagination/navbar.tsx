'use client';
import React from 'react';

type Props = {
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function NavbarPaginationComponent({
  totalPages,
  onPageChange,
}: Props) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page); // Trigger search or data fetch
  };
  return (
    <div className="join">
      {/* Previous button */}
      <button
        className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      {/* Page numbers */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
          onClick={() => handleClick(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}

      {/* Next button */}
      <button
        className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
}
