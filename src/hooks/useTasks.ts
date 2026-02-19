import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Task, CreateTaskInput, TaskStatus } from "@/types/kanban";
import { toast } from "sonner";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("position", { ascending: true });

    if (error) {
      toast.error("Failed to load tasks");
      console.error(error);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks();

    const channel = supabase
      .channel("tasks-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, () => {
        fetchTasks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTasks]);

  const addTask = async (input: CreateTaskInput) => {
    const maxPos = tasks.filter(t => t.status === (input.status || "todo")).length;
    const { error } = await supabase.from("tasks").insert({
      title: input.title,
      description: input.description || "",
      priority: input.priority || "medium",
      label: input.label || "",
      status: input.status || "todo",
      position: maxPos,
    });
    if (error) {
      toast.error("Failed to create task");
      console.error(error);
    } else {
      toast.success("Task created!");
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const { error } = await supabase.from("tasks").update(updates).eq("id", id);
    if (error) {
      toast.error("Failed to update task");
      console.error(error);
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete task");
      console.error(error);
    } else {
      toast.success("Task deleted");
    }
  };

  const moveTask = async (taskId: string, newStatus: TaskStatus, newPosition: number) => {
    // Optimistic update
    setTasks(prev => {
      const task = prev.find(t => t.id === taskId);
      if (!task) return prev;
      const updated = prev.map(t => {
        if (t.id === taskId) return { ...t, status: newStatus, position: newPosition };
        return t;
      });
      return updated;
    });

    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus, position: newPosition })
      .eq("id", taskId);

    if (error) {
      toast.error("Failed to move task");
      fetchTasks(); // rollback
    }
  };

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter(t => t.status === status).sort((a, b) => a.position - b.position);

  return { tasks, loading, addTask, updateTask, deleteTask, moveTask, getTasksByStatus };
}
