"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { analyzeContent } from "@/lib/api";
import type { Prediction } from "@/types/moderation";

export interface UseModerationReturn {
  loading: boolean;
  result: Prediction | null;
  analyze: (
    text: string
  ) => Promise<Prediction | null>;
  clearResult: () => void;
}

const API_ERROR_RESULT: Prediction = {
  label: "API Error",
  confidence: 0,
  risk_score: 0,
  matched_words: [],
  categories: [],
  raw_predictions: {},
};

export function useModeration(): UseModerationReturn {
  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<Prediction | null>(null);

  const mountedRef = useRef(false);
  const activeRequestRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const analyze = useCallback(
    async (
      text: string
    ): Promise<Prediction | null> => {
      const content = text.trim();

      if (!content) {
        return null;
      }

      if (activeRequestRef.current) {
        return null;
      }

      activeRequestRef.current = true;

      if (mountedRef.current) {
        setLoading(true);
      }

      try {
        const prediction =
          await analyzeContent(content);

        if (mountedRef.current) {
          setResult(prediction);
        }

        return prediction;
      } catch (error) {
        console.error(
          "[Moderation] Request failed:",
          error
        );

        if (mountedRef.current) {
          setResult(API_ERROR_RESULT);
        }

        return API_ERROR_RESULT;
      } finally {
        activeRequestRef.current = false;

        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    []
  );

  const clearResult = useCallback(() => {
    if (!mountedRef.current) {
      return;
    }

    setResult(null);
  }, []);

  return {
    loading,
    result,
    analyze,
    clearResult,
  };
}

export default useModeration;