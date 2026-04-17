import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { QuestionBuilder } from "@/components/QuestionBuilder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/create-exam")({
  head: () => ({
    meta: [
      { title: "Create Exam — Cbt Practice Hub" },
      { name: "description", content: "Create a new computer-based test for your students." },
    ],
  }),
  component: CreateExamPage,
});

function CreateExamPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [duration, setDuration] = useState("45");
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState<Array<{ id: string; text: string; options: string[]; correctIndex: number }>>([
    {
      id: crypto.randomUUID(),
      text: "",
      options: ["", "", "", ""],
      correctIndex: 0,
    },
  ]);

  const handleSave = () => {
    // TODO: Save to database
    alert("Exam created! Access code: EXM" + Math.random().toString(36).substr(2, 4).toUpperCase());
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Create New Exam
        </h1>
        <p className="mb-8 text-muted-foreground">
          Set up your exam details and add questions below
        </p>

        {/* Exam Details */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Exam Details
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Exam Title</Label>
              <Input
                className="mt-1"
                placeholder="e.g., Mathematics Mid-Term Exam"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label>Subject</Label>
              <Input
                className="mt-1"
                placeholder="e.g., Mathematics"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <Label>Class</Label>
              <Select value={className} onValueChange={setClassName}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Duration (minutes)</Label>
              <Input
                className="mt-1"
                type="number"
                min="5"
                max="180"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div>
              <Label>Your Email (for results)</Label>
              <Input
                className="mt-1"
                type="email"
                placeholder="teacher@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Questions ({questions.length})
          </h2>
          <QuestionBuilder questions={questions} onChange={setQuestions} />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" asChild>
            <Link to="/dashboard">Cancel</Link>
          </Button>
          <Button onClick={handleSave} size="lg">
            <Save className="h-5 w-5" />
            Create Exam
          </Button>
        </div>
      </div>
    </div>
  );
}
