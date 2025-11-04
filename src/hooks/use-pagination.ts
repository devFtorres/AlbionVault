/**
 * Pagination hook
 * Hook de paginação
 */

import { useState, useMemo } from 'react';

export interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  totalItems?: number;
}

export function usePagination({
  initialPage = 1,
  initialLimit = 10,
  totalItems = 0,
}: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / limit);
  }, [totalItems, limit]);

  const hasNext = useMemo(() => {
    return page < totalPages;
  }, [page, totalPages]);

  const hasPrev = useMemo(() => {
    return page > 1;
  }, [page]);

  const offset = useMemo(() => {
    return (page - 1) * limit;
  }, [page, limit]);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const nextPage = () => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (hasPrev) {
      setPage((prev) => prev - 1);
    }
  };

  const reset = () => {
    setPage(initialPage);
  };

  return {
    page,
    limit,
    offset,
    totalPages,
    totalItems,
    hasNext,
    hasPrev,
    goToPage,
    nextPage,
    prevPage,
    setLimit,
    reset,
  };
}
