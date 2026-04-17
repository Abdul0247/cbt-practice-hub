import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { mockResults, mockExams } from "@/lib/mock-data";
import { ArrowLeft, Download, Trophy, Medal } from "lucide-react";

export const Route = createFileRoute("/exam-results")({
  head: () => ({
    meta: [
      { title: "Exam Results — Cbt Practice Hub" },
      { name: "description", content: "View detailed results for your exam." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    examId: (search.examId as string) || "1",
  }),
  component: ExamResultsPage,
});

function ExamResultsPage() {
  const { examId } = Route.useSearch();
  const exam = mockExams.find((e) => e.id === examId) || mockExams[0];
  const sortedResults = [...mockResults].sort((a, b) => b.score - a.score);
  

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {exam.title}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {exam.subject} • {exam.className} • {exam.totalQuestions} questions
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Results Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Student Name
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                    Score
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                    Percentage
                  </th>
                  <th className="hidden px-4 py-3 text-center text-sm font-semibold text-foreground sm:table-cell">
                    Time Taken
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedResults.map((result, index) => {
                  const percentage = Math.round(
                    (result.score / result.totalQuestions) * 100
                  );
                  const minutes = Math.floor(result.timeTaken / 60);
                  return (
                    <tr key={result.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {index === 0 ? (
                            <Trophy className="h-5 w-5 text-warning" />
                          ) : index <= 2 ? (
                            <Medal className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <span className="w-5 text-center text-sm text-muted-foreground">
                              {index + 1}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {result.studentName}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-semibold text-foreground">
                          {result.score}
                        </span>
                        <span className="text-muted-foreground">
                          /{result.totalQuestions}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-sm font-semibold ${
                            percentage >= 70
                              ? "bg-success/10 text-success"
                              : percentage >= 50
                                ? "bg-warning/10 text-warning-foreground"
                                : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {percentage}%
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-center text-sm text-muted-foreground sm:table-cell">
                        {minutes} min
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
