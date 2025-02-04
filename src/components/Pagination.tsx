import { useMemo } from 'react';
import ChevronLeftIcon from '/public/assets/svg/ChevronLeftIcon.svg';
import ChevronRightIcon from '/public/assets/svg/ChevronRightIcon.svg';

type Props = {
  totalPage: number;
  buttonPerPage: number;
  page: number;
  setPage: (page: number) => void;
};

export default function Pagination({ totalPage, buttonPerPage, page, setPage }: Props) {
  const pageArray = useMemo(() => {
    if (totalPage <= 1) {
      return [1];
    }
    const startPage = buttonPerPage * Math.floor((page - 1) / buttonPerPage) + 1;
    const endPage = Math.min(startPage + buttonPerPage - 1, totalPage);
    return Array.from({ length: endPage - startPage + 1 }, (_, idx) => idx + startPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPage]);

  return (
    <div className="flex gap-9">
      <button onClick={() => setPage(page - 1)} disabled={page === 1} className="disabled:opacity-30">
        <ChevronLeftIcon />
      </button>
      <div className="flex min-w-[176px] justify-center gap-1">
        {pageArray.map((pageNum) => (
          <button
            className="body2 flex size-8 items-center justify-center rounded-lg  bg-neutral-gray-0 p-[10px] text-neutral-gray-600 aria-[current]:bg-primary-500 aria-[current]:text-neutral-gray-0"
            key={pageNum}
            onClick={() => setPage(pageNum)}
            aria-current={page === pageNum ? 'page' : undefined}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <button onClick={() => setPage(page + 1)} disabled={page === totalPage} className="disabled:opacity-30">
        <ChevronRightIcon />
      </button>
    </div>
  );
}
