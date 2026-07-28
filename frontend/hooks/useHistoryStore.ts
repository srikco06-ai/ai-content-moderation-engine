"use client";

import {
  useCallback,
  useEffect,
  useSyncExternalStore,
} from "react";

import { STORAGE_KEYS } from "@/constants/storage";
import type { HistoryItem } from "@/types/moderation";
import {
  addHistoryItem,
  sanitizeHistory,
  sortHistory,
} from "@/utils/history";

type Listener = () => void;

const listeners = new Set<Listener>();

const EMPTY_HISTORY: HistoryItem[] = [];

let historySnapshot: HistoryItem[] = EMPTY_HISTORY;

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function loadSnapshot(): HistoryItem[] {
  if (typeof window === "undefined") {
    return EMPTY_HISTORY;
  }

  try {
    const stored = window.localStorage.getItem(
      STORAGE_KEYS.HISTORY
    );

    if (!stored) {
      return EMPTY_HISTORY;
    }

    return sortHistory(
      sanitizeHistory(JSON.parse(stored))
    );
  } catch (error) {
    console.error(
      "[History] Failed to load history:",
      error
    );

    return EMPTY_HISTORY;
  }
}

function persistSnapshot(
  history: HistoryItem[]
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEYS.HISTORY,
      JSON.stringify(history)
    );
  } catch (error) {
    console.error(
      "[History] Failed to save history:",
      error
    );
  }
}

function clearStorage() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(
      STORAGE_KEYS.HISTORY
    );
  } catch (error) {
    console.error(
      "[History] Failed to clear history:",
      error
    );
  }
}

function getSnapshot() {
  return historySnapshot;
}

function getServerSnapshot() {
  return EMPTY_HISTORY;
}

if (typeof window !== "undefined") {
  historySnapshot = loadSnapshot();
}

export function useHistoryStore() {
  const history = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorage = (
      event: StorageEvent
    ) => {
      if (
        event.key !== STORAGE_KEYS.HISTORY
      ) {
        return;
      }

      historySnapshot = loadSnapshot();
      notify();
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  const addItem = useCallback(
    (item: HistoryItem) => {
      const updated =
        addHistoryItem(
          historySnapshot,
          item
        );

      historySnapshot = updated;

      persistSnapshot(updated);

      notify();
    },
    []
  );

  const clear = useCallback(() => {
    historySnapshot = EMPTY_HISTORY;

    clearStorage();

    notify();
  }, []);

  return {
    history,
    addItem,
    clear,
  };
}