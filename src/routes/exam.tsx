import { createFileRoute } from "@tanstack/react-router";
import { ExamTimer } from "@/components/ExamTimer";
import { Button } from "@/components/ui/button";
import { mockQuestions } from "@/lib/mock-data";
import { useState, useMemo, useCallback } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/exam")({
  head: () => ({
    meta: [
      { title: "Exam in Progress — Cbt Practice Hub" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ExamPage,
});

function ExamPage() {
  // Randomize question order per student session
  const shuffledQuestions = useMemo(() => {
    // Note: In production, server provides questions without correct answers
    return [...mockQuestions]
      .sort(() => Math.random() - 0.5)
      .map((q) => ({
        id: q.id,
        text: q.text,
        // Also shuffle options for extra randomization
        options: [...q.options].sort(() => Math.random() - 0.5),
      }));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentQ = shuffledQuestions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = shuffledQuestions.length;

  const handleSelect = (optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));
  };

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    setShowConfirm(false);
    // TODO: Submit answers to server for scoring
    // Server compares with correct answers and emails teacher
  }, []);

  const handleTimeUp = useCallback(() => {
    if (!submitted) {
      handleSubmit();
    }
  }, [submitted, handleSubmit]);

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <Send className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Exam Submitted!</h1>
          <p className="mt-3 text-muted-foreground">
            Your answers have been submitted successfully. You answered{" "}
            <strong>{answeredCount}</strong> out of{" "}
            <strong>{totalQuestions}</strong> questions.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Your score will be sent to your teacher's email.
          </p>
          <Button className="mt-8" asChild>
            <a href="/">Return Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Exam Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Mathematics Mid-Term</span>
          </div>
          <ExamTimer totalSeconds={45 * 60} onTimeUp={handleTimeUp} />
        </div>
      </header>

      {/* Question navigation dots */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="mx-auto flex max-w-4xl flex-wrap gap-2">
          {shuffledQuestions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(i)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all ${
                i === currentIndex
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : answers[q.id] !== undefined
                    ? "bg-success/15 text-success"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-2 text-sm font-medium text-muted-foreground">
          Question {currentIndex + 1} of {totalQuestions}
        </div>
        <h2 className="mb-6 text-xl font-semibold text-foreground sm:text-2xl">
          {currentQ.text}
        </h2>

        <div className="space-y-3">
          {currentQ.options.map((option, oi) => (
            <button
              key={oi}
              onClick={() => handleSelect(oi)}
              className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                answers[currentQ.id] === oi
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/30 hover:bg-card/80"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  answers[currentQ.id] === oi
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {String.fromCharCode(65 + oi)}
              </span>
              <span className="text-foreground">{option}</span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentIndex === totalQuestions - 1 ? (
            <Button
              variant="success"
              size="lg"
              onClick={() => setShowConfirm(true)}
            >
              <Send className="h-5 w-5" />
              Submit Exam
            </Button>
          ) : (
            <Button
              onClick={() =>
                setCurrentIndex((i) => Math.min(totalQuestions - 1, i + 1))
              }
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Submission Summary */}
        <div className="mt-6 rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
          {answeredCount} of {totalQuestions} questions answered
          {answeredCount < totalQuestions && (
            <span className="ml-1 text-warning-foreground">
              ({totalQuestions - answeredCount} unanswered)
            </span>
          )}
        </div>
      </div>

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-warning" />
              <h3 className="text-lg font-semibold text-foreground">
                Submit Exam?
              </h3>
            </div>
            <p className="mb-2 text-sm text-muted-foreground">
              You have answered <strong>{answeredCount}</strong> out of{" "}
              <strong>{totalQuestions}</strong> questions.
            </p>
            {answeredCount < totalQuestions && (
              <p className="mb-4 text-sm text-destructive">
                {totalQuestions - answeredCount} questions are unanswered!
              </p>
            )}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowConfirm(false)}>
                Go Back
              </Button>
              <Button variant="success" onClick={handleSubmit}>
                Confirm Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
