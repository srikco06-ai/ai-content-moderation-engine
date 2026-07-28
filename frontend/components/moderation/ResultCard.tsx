import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

import CategoryChips from "@/components/moderation/CategoryChips";
import JsonViewer from "@/components/moderation/JsonViewer";
import MatchedWords from "@/components/moderation/MatchedWords";
import RiskMeter from "@/components/moderation/RiskMeter";

import { getSeverity } from "@/utils/severity";

import type { Prediction } from "@/types/moderation";

export interface ResultCardProps {
  result: Prediction | null;
}

export default function ResultCard({
  result,
}: ResultCardProps) {
  if (!result) {
    return null;
  }

  const {
    label,
    confidence,
    risk_score,
    matched_words,
    categories,
    raw_predictions,
  } = result;

  const safeConfidence = Math.max(
    0,
    Math.min(confidence, 100)
  );

  const safeRiskScore = Math.max(
    0,
    Math.min(risk_score, 100)
  );

  const severity =
    getSeverity(safeRiskScore);

  const isApiError =
    label === "API Error";

  const isToxic =
    label.toLowerCase() === "toxic";

  const hasRawPredictions =
    !!raw_predictions &&
    Object.keys(raw_predictions).length > 0;

  return (
    <Card
      padding="lg"
      shadow="lg"
      rounded="xl"
      className={
        isApiError
          ? "mt-8 border border-orange-300 bg-orange-50"
          : isToxic
          ? "mt-8 border border-red-300 bg-red-50"
          : "mt-8 border border-green-300 bg-green-50"
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            Result: {label}
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            AI Moderation Analysis Complete
          </p>
        </div>

        {!isApiError && (
          <Badge variant={severity.variant}>
            {severity.label}
          </Badge>
        )}
      </div>

      {isApiError ? (
        <div className="mt-8 rounded-lg border border-orange-200 bg-orange-100 p-4">
          <p className="font-semibold text-orange-800">
            Unable to analyze the content.
          </p>

          <p className="mt-2 text-sm text-orange-700">
            Please verify that the backend
            service is running and try again.
          </p>
        </div>
      ) : (
        <>
          <section className="mt-8 grid gap-6 md:grid-cols-2">
            <Card
              padding="md"
              rounded="lg"
              className="border"
            >
              <p className="text-sm text-slate-500">
                Confidence
              </p>

              <p className="mt-2 text-3xl font-bold">
                {safeConfidence.toFixed(2)}%
              </p>
            </Card>

            <Card
              padding="md"
              rounded="lg"
              className="border"
            >
              <p className="text-sm text-slate-500">
                Risk Score
              </p>

              <p className="mt-2 text-3xl font-bold">
                {safeRiskScore}/100
              </p>
            </Card>
          </section>

          <section className="mt-8">
            <RiskMeter
              score={safeRiskScore}
              severity={severity.meter}
            />
          </section>

          <section className="mt-8">
            <h3 className="mb-3 text-lg font-semibold">
              Categories
            </h3>

            <CategoryChips
              categories={categories}
            />
          </section>

          <section className="mt-8">
            <h3 className="mb-3 text-lg font-semibold">
              Matched Words
            </h3>

            <MatchedWords
              words={matched_words}
            />
          </section>

          {hasRawPredictions && (
            <section className="mt-8">
              <JsonViewer
                title="Raw Model Scores"
                data={raw_predictions}
              />
            </section>
          )}
        </>
      )}
    </Card>
  );
}