import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { LogIn, BookOpen } from "lucide-react";

export const Route = createFileRoute("/student-login")({
  head: () => ({
    meta: [
      { title: "Student Login — Cbt Practice Hub" },
      { name: "description", content: "Enter your exam access code to start your test." },
    ],
  }),
  component: StudentLoginPage,
});

function StudentLoginPage() {
  const [accessCode, setAccessCode] = useState("");
  const [studentName, setStudentName] = useState("");

  const handleStart = () => {
    if (!accessCode.trim() || !studentName.trim()) return;
    // TODO: Validate code against backend
    window.location.href = `/exam?code=${accessCode}&name=${encodeURIComponent(studentName)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Start Your Exam
            </h1>
            <p className="mt-2 text-muted-foreground">
              Enter your access code and name to begin
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <Label>Your Full Name</Label>
                <Input
                  className="mt-1"
                  placeholder="Enter your full name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div>
                <Label>Access Code</Label>
                <Input
                  className="mt-1 font-mono text-lg tracking-widest"
                  placeholder="Enter exam code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  maxLength={10}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Get this code from your teacher
                </p>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handleStart}
                disabled={!accessCode.trim() || !studentName.trim()}
              >
                <LogIn className="h-5 w-5" />
                Start Exam
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
