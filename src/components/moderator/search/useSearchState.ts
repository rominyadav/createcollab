import { useCallback, useEffect, useState } from "react";

import { loadFromLocalStorage, saveToLocalStorage } from "../utils";

interface UseSearchStateProps<T> {
  storageKey: string;
  initialState: T;
  onStateChange?: (state: T) => void;
}

export function useSearchState<T extends Record<string, unknown>>({
  storageKey,
  initialState,
  onStateChange,
}: UseSearchStateProps<T>) {
  const [state, setState] = useState<T>(initialState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedState = loadFromLocalStorage<T>(storageKey);
    if (savedState) {
      setState({ ...initialState, ...savedState });
    }
  }, [storageKey, initialState]);

  const updateState = useCallback(
    (updates: Partial<T>) => {
      setState((prev) => {
        const newState = { ...prev, ...updates };
        if (mounted) {
          setTimeout(() => saveToLocalStorage(storageKey, newState), 0);
        }
        onStateChange?.(newState);
        return newState;
      });
    },
    [mounted, storageKey, onStateChange]
  );

  const resetState = useCallback(() => {
    setState(initialState);
    if (mounted) {
      saveToLocalStorage(storageKey, initialState);
    }
  }, [initialState, mounted, storageKey]);

  return {
    state,
    updateState,
    resetState,
    mounted,
  };
}
