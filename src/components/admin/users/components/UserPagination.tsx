
import React from "react";
import { Pagination } from "@/components/ui/pagination";
import { useLanguage } from "@/features/language";

interface UserPaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export function UserPagination({ page, totalPages, setPage }: UserPaginationProps) {
  const { currentLanguage } = useLanguage();
  const t = (lvText: string, enText: string) => currentLanguage.code === 'lv' ? lvText : enText;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-4">
      <Pagination>
        <Pagination.PrevButton
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
        />
        <div className="flex items-center mx-4">
          {t('Lapa', 'Page')} {page} {t('no', 'of')} {totalPages}
        </div>
        <Pagination.NextButton
          onClick={() => setPage(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
        />
      </Pagination>
    </div>
  );
}
