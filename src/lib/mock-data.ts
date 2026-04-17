export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number; // Only used server-side, never sent to client
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  className: string;
  duration: number; // in minutes
  totalQuestions: number;
  createdAt: string;
  status: "draft" | "active" | "completed";
  accessCode: string;
  teacherEmail: string;
}

export interface StudentResult {
  id: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  submittedAt: string;
  timeTaken: number; // in seconds
}

export const mockExams: Exam[] = [
  {
    id: "1",
    title: "Mathematics Mid-Term",
    subject: "Mathematics",
    className: "SS2",
    duration: 45,
    totalQuestions: 30,
    createdAt: "2026-04-10",
    status: "active",
    accessCode: "MTH2026",
    teacherEmail: "teacher@school.edu",
  },
  {
    id: "2",
    title: "English Language Test",
    subject: "English",
    className: "SS1",
    duration: 60,
    totalQuestions: 40,
    createdAt: "2026-04-08",
    status: "completed",
    accessCode: "ENG2026",
    teacherEmail: "teacher@school.edu",
  },
  {
    id: "3",
    title: "Physics Practical Theory",
    subject: "Physics",
    className: "SS3",
    duration: 30,
    totalQuestions: 20,
    createdAt: "2026-04-12",
    status: "draft",
    accessCode: "PHY2026",
    teacherEmail: "teacher@school.edu",
  },
];

export const mockQuestions: Question[] = [
  {
    id: "q1",
    text: "What is the value of π (pi) to 2 decimal places?",
    options: ["3.41", "3.14", "3.12", "3.40"],
    correctIndex: 1,
  },
  {
    id: "q2",
    text: "Solve: 2x + 5 = 15",
    options: ["x = 3", "x = 5", "x = 7", "x = 10"],
    correctIndex: 1,
  },
  {
    id: "q3",
    text: "What is the square root of 144?",
    options: ["10", "11", "12", "14"],
    correctIndex: 2,
  },
  {
    id: "q4",
    text: "Simplify: 3(2x - 4) + 2",
    options: ["6x - 10", "6x - 14", "6x + 10", "6x - 12"],
    correctIndex: 0,
  },
  {
    id: "q5",
    text: "What is the area of a circle with radius 7cm? (Use π = 22/7)",
    options: ["154 cm²", "144 cm²", "44 cm²", "22 cm²"],
    correctIndex: 0,
  },
];

export const mockResults: StudentResult[] = [
  { id: "r1", studentName: "Adebayo Oluwaseun", score: 28, totalQuestions: 30, submittedAt: "2026-04-10 10:30", timeTaken: 2400 },
  { id: "r2", studentName: "Chioma Nwosu", score: 25, totalQuestions: 30, submittedAt: "2026-04-10 10:35", timeTaken: 2550 },
  { id: "r3", studentName: "Ibrahim Musa", score: 22, totalQuestions: 30, submittedAt: "2026-04-10 10:28", timeTaken: 2300 },
  { id: "r4", studentName: "Fatima Abdullahi", score: 30, totalQuestions: 30, submittedAt: "2026-04-10 10:40", timeTaken: 2650 },
  { id: "r5", studentName: "Emmanuel Okafor", score: 18, totalQuestions: 30, submittedAt: "2026-04-10 10:45", timeTaken: 2700 },
];
