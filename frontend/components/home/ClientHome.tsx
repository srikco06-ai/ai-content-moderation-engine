"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import Hero from "@/components/hero/Hero";
import Statistics from "@/components/dashboard/Statistics";
import HistoryTable from "@/components/history/HistoryTable";
import ModerationForm from "@/components/moderation/ModerationForm";
import ResultCard from "@/components/moderation/ResultCard";

import { useModeration } from "@/hooks/useModeration";
import { useHistoryStore } from "@/hooks/useHistoryStore";

import type { HistoryItem } from "@/types/moderation";

export default function ClientHome() {
  const router = useRouter();

  const moderationSectionRef =
    useRef<HTMLDivElement>(null);

  const [text, setText] = useState("");

  const {
    loading,
    result,
    analyze,
    clearResult,
  } = useModeration();

  const {
    history,
    addItem,
    clear,
  } = useHistoryStore();

  const handleAnalyze = useCallback(async () => {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const prediction = await analyze(trimmed);

    if (
      !prediction ||
      prediction.label === "API Error"
    ) {
      return;
    }

    const historyItem: HistoryItem = {
      text: trimmed,
      label: prediction.label,
      confidence: prediction.confidence,
      risk_score: prediction.risk_score,
      categories: prediction.categories,
      time: new Date().toISOString(),
    };

    addItem(historyItem);
  }, [addItem, analyze, text]);

  const handleClearHistory = useCallback(() => {
    clear();
    setText("");
    clearResult();
  }, [clear, clearResult]);

  const handleHeroAnalyzeClick = useCallback(() => {
    moderationSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const handleDocumentationClick =
    useCallback(() => {
      router.push("/docs");
    }, [router]);

  const totalAnalyses = history.length;

  const toxicCount = useMemo(
    () =>
      history.filter(
        (item) =>
          item.label.toLowerCase() === "toxic"
      ).length,
    [history]
  );

  const safeCount = useMemo(
    () =>
      history.filter(
        (item) =>
          item.label.toLowerCase() === "safe"
      ).length,
    [history]
  );

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-8">
        <Hero
          onAnalyzeClick={
            handleHeroAnalyzeClick
          }
          onDocumentationClick={
            handleDocumentationClick
          }
        />

        <div ref={moderationSectionRef}>
          <ModerationForm
            text={text}
            loading={loading}
            onTextChange={setText}
            onAnalyze={handleAnalyze}
            onClear={handleClearHistory}
          />
        </div>

        <ResultCard result={result} />

        <Statistics
          total={totalAnalyses}
          toxic={toxicCount}
          safe={safeCount}
        />

        <HistoryTable history={history} />
      </div>
    </main>
  );
}