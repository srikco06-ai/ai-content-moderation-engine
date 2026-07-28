"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
} from "react";
import {
  RotateCcw,
  Sparkles,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export interface ModerationFormProps {
  text: string;
  loading: boolean;
  onTextChange: (value: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
}

const MAX_CHARACTERS = 5000;

export default function ModerationForm({
  text,
  loading,
  onTextChange,
  onAnalyze,
  onClear,
}: ModerationFormProps) {
  const handleChange = useCallback(
    (
      event: ChangeEvent<HTMLTextAreaElement>
    ) => {
      onTextChange(event.target.value);
    },
    [onTextChange]
  );

  const handleKeyDown = useCallback(
    (
      event: KeyboardEvent<HTMLTextAreaElement>
    ) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter"
      ) {
        event.preventDefault();

        if (
          text.trim().length > 0 &&
          !loading
        ) {
          onAnalyze();
        }
      }
    },
    [loading, onAnalyze, text]
  );

  const characterCount = text.length;

  const canAnalyze =
    text.trim().length > 0 &&
    !loading;

  return (
    <Card
      id="moderation"
      padding="lg"
      shadow="lg"
      rounded="2xl"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900">
          AI Content Moderation Engine
        </h1>

        <p className="mt-3 text-slate-600">
          Analyze text using an AI-powered
          moderation engine to detect toxic,
          abusive, hateful, or unsafe
          content.
        </p>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor="moderation-text"
          className="text-sm font-semibold text-slate-700"
        >
          Content to Analyze
        </label>

        <span className="text-sm text-slate-500">
          {characterCount} /{" "}
          {MAX_CHARACTERS} characters
        </span>
      </div>

      <textarea
        id="moderation-text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={8}
        maxLength={MAX_CHARACTERS}
        spellCheck={false}
        aria-label="Content to analyze"
        placeholder="Enter or paste content for AI moderation analysis..."
        className="
          w-full
          resize-none
          rounded-xl
          border
          border-slate-300
          bg-white
          p-4
          text-slate-900
          placeholder:text-slate-400
          transition-all
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
        "
      />

      <p className="mt-2 text-sm text-slate-500">
        The submitted text will be
        analyzed for potentially harmful
        or unsafe language.
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Tip: Press{" "}
        <span className="font-semibold">
          Ctrl + Enter
        </span>{" "}
        (or{" "}
        <span className="font-semibold">
          ⌘ + Enter
        </span>{" "}
        on macOS) to analyze.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Button
          variant="primary"
          size="lg"
          loading={loading}
          disabled={!canAnalyze}
          onClick={onAnalyze}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Analyze Text
        </Button>

        <Button
          variant="secondary"
          size="lg"
          disabled={loading}
          onClick={onClear}
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Clear History
        </Button>
      </div>
    </Card>
  );
}