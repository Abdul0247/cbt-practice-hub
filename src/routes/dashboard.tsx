import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockExams, mockResults } from "@/lib/mock-data";
import {
  FileText,
  Users,
  BarChart3,
  Plus,
  Eye,
  Copy,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Teacher Dashboard — Cbt Practice Hub" },
      { name: "description", content: "Manage your exams, view results, and create new tests." },
    ],
  }),
  component: DashboardPage,
});

const statusConfig = {
  active: { label: "Active", icon: CheckCircle, className: "bg-success/10 text-success" },
  draft: { label: "Draft", icon: AlertCircle, className: "bg-warning/10 text-warning-foreground" },
  completed: { label: "Completed", icon: Clock, className: "bg-muted text-muted-foreground" },
};

function DashboardPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const activeExams = mockExams.filter((e) => e.status === "active").length;
  const totalStudents = mockResults.length;
  const avgScore = Math.round(
    mockResults.reduce((acc, r) => acc + (r.score / r.totalQuestions) * 100, 0) /
      mockResults.length
  );

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Teacher Dashboard
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage your exams and view student results
            </p>
          </div>
          <Button size="lg" asChild>
            <Link to="/create-exam">
              <Plus className="h-5 w-5" />
              Create New Exam
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Exams"
            value={mockExams.length}
            icon={FileText}
            description={`${activeExams} active`}
          />
          <StatCard
            title="Total Students"
            value={totalStudents}
            icon={Users}
            description="Across all exams"
          />
          <StatCard
            title="Average Score"
            value={`${avgScore}%`}
            icon={BarChart3}
            description="Overall performance"
          />
        </div>

        {/* Exams List */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">Your Exams</h2>
          </div>
          <div className="divide-y divide-border">
            {mockExams.map((exam) => {
              const status = statusConfig[exam.status];
              const StatusIcon = status.icon;
              return (
                <div
                  key={exam.id}
                  className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">
                        {exam.title}
                      </h3>
                      <Badge variant="outline" className={status.className}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {status.label}
                      </Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span>{exam.subject}</span>
                      <span>•</span>
                      <span>{exam.className}</span>
                      <span>•</span>
                      <span>{exam.totalQuestions} questions</span>
                      <span>•</span>
                      <span>{exam.duration} min</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyCode(exam.accessCode)}
                    >
                      {copiedCode === exam.accessCode ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      {exam.accessCode}
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/exam-results" search={{ examId: exam.id }}>
                        <Eye className="h-4 w-4" />
                        Results
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
