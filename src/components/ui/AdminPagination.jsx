"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AdminPagination({ currentPage = 1, totalPages = 1, onPageChange, className = "" }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <Pagination dir="ltr" className={className}>
      <PaginationContent className="bg-gray-800 border border-gray-700 rounded-xl gap-0">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            className={`text-white hover:bg-gray-700 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
          />
        </PaginationItem>
        {getPageNumbers().map((pageNum) => (
          <PaginationItem key={pageNum} className="border-l border-gray-700">
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(pageNum);
              }}
              isActive={pageNum === currentPage}
              className={`${
                pageNum === currentPage
                  ? "bg-primary-500 hover:bg-primary-600 text-white border-0 rounded-none"
                  : "text-white hover:bg-gray-700"
              }`}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className="border-l border-gray-700">
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            className={`text-white hover:bg-gray-700 ${
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
