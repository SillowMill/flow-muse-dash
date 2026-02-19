import { Tables } from "@/integrations/supabase/types";

export type Task = Tables<"tasks">;

export type TaskStatus = "todo" | "in_progress";

export type TaskPriority = "low" | "medium" | "high";

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: TaskPriority;
  label?: string;
  status?: TaskStatus;
}

export const COLUMN_CONFIG: Record<TaskStatus, { title: string; color: string }> = {
  todo: { title: "To Do", color: "kanban-todo" },
  in_progress: { title: "In Progress", color: "kanban-progress" },
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const LABEL_COLORS: Record<string, string> = {
  "Design": "bg-purple-100 text-purple-700",
  "Development": "bg-blue-100 text-blue-700",
  "Research": "bg-emerald-100 text-emerald-700",
  "Testing": "bg-amber-100 text-amber-700",
  "Marketing": "bg-pink-100 text-pink-700",
  "Bug": "bg-red-100 text-red-700",
};
