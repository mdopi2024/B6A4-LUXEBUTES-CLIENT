// components/modules/menu/MenuSearch.tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import { Search, X, Loader2, ArrowUpDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: '', label: 'Default', sortBy: '', sortOrder: '' },
  { value: 'name_asc', label: 'Name (A-Z)', sortBy: 'name', sortOrder: 'asc' },
  { value: 'name_desc', label: 'Name (Z-A)', sortBy: 'name', sortOrder: 'desc' },
  { value: 'price_asc', label: 'Price (Low-High)', sortBy: 'price', sortOrder: 'asc' },
  { value: 'price_desc', label: 'Price (High-Low)', sortBy: 'price', sortOrder: 'desc' },
];

const getSortValue = (sortBy: string | null, sortOrder: string | null) => {
  if (!sortBy || !sortOrder) return '';
  const match = SORT_OPTIONS.find(
    (opt) => opt.sortBy === sortBy && opt.sortOrder === sortOrder
  );
  return match ? match.value : '';
};

const MenuSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [term, setTerm] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState(
    getSortValue(searchParams.get('sortBy'), searchParams.get('sortOrder'))
  );

  // SINGLE effect syncing BOTH term and sort to the URL together.
  // Avoids the race condition where a debounced search overwrites
  // a sort change (or vice versa) with a stale params snapshot.
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (term) {
        params.set('search', term);
      } else {
        params.delete('search');
      }

      const selected = SORT_OPTIONS.find((opt) => opt.value === sort);
      if (selected?.sortBy && selected?.sortOrder) {
        params.set('sortBy', selected.sortBy);
        params.set('sortOrder', selected.sortOrder);
      } else {
        params.delete('sortBy');
        params.delete('sortOrder');
      }

      params.delete('page');

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400); // debounce covers both search typing and sort clicks

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, sort]);

  const clearSearch = () => setTerm('');

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full max-w-2xl mx-4 mt-6">
      {/* Search field */}
      <div
        className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 bg-white shadow-sm flex-1 ${
          isPending ? 'border-teal-800' : 'border-gray-200'
        } focus-within:border-teal-800 focus-within:ring-2 focus-within:ring-[#FBBF24]/40`}
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 text-teal-800 shrink-0 animate-spin" />
        ) : (
          <Search className="w-4 h-4 text-teal-800 shrink-0" />
        )}
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search menu items..."
          className="w-full text-sm text-gray-700 outline-none bg-transparent placeholder:text-gray-400"
        />
        {term && (
          <button
            onClick={clearSearch}
            type="button"
            aria-label="Clear search"
            className="text-gray-400 hover:text-teal-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sort field */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white shadow-sm">
        <ArrowUpDown className="w-4 h-4 text-teal-800 shrink-0" />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-sm text-gray-700 outline-none bg-transparent cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MenuSearch;