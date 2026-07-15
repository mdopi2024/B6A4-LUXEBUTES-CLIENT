// components/modules/menu/MenuPagination.tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MenuPaginationProps {
  totalPage: number;
}

const MenuPagination = ({ totalPage }: MenuPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPage || page === currentPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPage <= 1) return null;

  // build a compact page list: 1 ... current-1, current, current+1 ... last
  const pages: (number | string)[] = [];
  const addPage = (p: number | string) => pages.push(p);

  addPage(1);
  if (currentPage > 3) addPage('...');
  for (let p = Math.max(2, currentPage - 1); p <= Math.min(totalPage - 1, currentPage + 1); p++) {
    addPage(p);
  }
  if (currentPage < totalPage - 2) addPage('...');
  if (totalPage > 1) addPage(totalPage);

  return (
    <div className="flex items-center justify-center gap-1 mt-8 mb-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-200 text-teal-800 disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-teal-50 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, idx) =>
        p === '...' ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-400 select-none">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(p as number)}
            className={`min-w-[36px] h-9 px-2 rounded-lg text-sm font-semibold transition-colors ${
              currentPage === p
                ? 'bg-teal-800 text-white'
                : 'text-teal-800 border border-gray-200 hover:bg-[#FBBF24]/20'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="p-2 rounded-lg border border-gray-200 text-teal-800 disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-teal-50 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MenuPagination;