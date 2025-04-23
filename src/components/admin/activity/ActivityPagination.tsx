
import React from "react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

type ActivityPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ActivityPagination({ currentPage, totalPages, onPageChange }: ActivityPaginationProps) {
  if (totalPages <= 1) return null;
  
  const renderPaginationLinks = () => {
    const links = [];
    
    links.push(
      <PaginationItem key="prev">
        <PaginationPrevious 
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    );
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        links.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => onPageChange(i)}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) || 
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        links.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationLink className="pointer-events-none">
              ...
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    links.push(
      <PaginationItem key="next">
        <PaginationNext 
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    );
    
    return links;
  };
  
  return (
    <Pagination>
      <PaginationContent>
        {renderPaginationLinks()}
      </PaginationContent>
    </Pagination>
  );
}
