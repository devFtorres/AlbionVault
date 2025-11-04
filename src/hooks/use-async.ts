/**
 * Generic async hook for managing async operations
 * Hook genérico para gerenciar operações assíncronas
 */

import { useState, useCallback } from 'react';
import { AsyncState, LoadingState } from '@/types/common.types';
import { ApiError } from '@/types/common.types';

export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate = false
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
    status: immediate ? 'loading' : 'idle',
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState({
        data: null,
        loading: true,
        error: null,
        status: 'loading',
      });

      try {
        const data = await asyncFunction(...args);
        setState({
          data,
          loading: false,
          error: null,
          status: 'success',
        });
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof ApiError
            ? error.message
            : error instanceof Error
              ? error.message
              : 'An unknown error occurred';

        setState({
          data: null,
          loading: false,
          error: errorMessage,
          status: 'error',
        });
        throw error;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      status: 'idle',
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
