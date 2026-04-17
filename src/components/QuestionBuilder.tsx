import * as React from "react";
import { Plus, Trash2, GripVertical, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface QuestionItem {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

interface QuestionBuilderProps {
  questions: QuestionItem[];
  onChange: (questions: QuestionItem[]) => void;
}

export function QuestionBuilder({ questions, onChange }: QuestionBuilderProps) {
  const addQuestion = () => {
    onChange([
      ...questions,
      {
        id: crypto.randomUUID(),
        text: "",
        options: ["", "", "", ""],
        correctIndex: 0,
      },
    ]);
  };

  const updateQuestion = (index: number, field: Partial<QuestionItem>) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], ...field };
    onChange(updated);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    const options = [...updated[qIndex].options];
    options[oIndex] = value;
    updated[qIndex] = { ...updated[qIndex], options };
    onChange(updated);
  };

  const removeQuestion = (index: number) => {
    onChange(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => (
        <div
          key={q.id}
          className="rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-primary">
                Question {qi + 1}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeQuestion(qi)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-4">
            <Label className="text-sm text-muted-foreground">Question Text</Label>
            <Input
              className="mt-1"
              placeholder="Enter the question..."
              value={q.text}
              onChange={(e) => updateQuestion(qi, { text: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">
              Options (click the circle to mark correct answer)
            </Label>
            {q.options.map((opt, oi) => (
              <div key={oi} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuestion(qi, { correctIndex: oi })}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    q.correctIndex === oi
                      ? "border-success bg-success text-success-foreground"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {q.correctIndex === oi && <Check className="h-4 w-4" />}
                </button>
                <Input
                  placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                  value={opt}
                  onChange={(e) => updateOption(qi, oi, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        className="w-full border-dashed"
        onClick={addQuestion}
      >
        <Plus className="h-4 w-4" />
        Add Question
      </Button>
    </div>
  );
}
