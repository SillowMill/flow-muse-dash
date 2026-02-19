import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { KanbanColumn } from "./KanbanColumn";
import { AddTaskDialog } from "./AddTaskDialog";
import { useTasks } from "@/hooks/useTasks";
import { TaskStatus } from "@/types/kanban";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function KanbanBoard() {
  const { loading, addTask, deleteTask, moveTask, getTasksByStatus } = useTasks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<TaskStatus>("todo");

  const handleAddClick = (status: TaskStatus) => {
    setDialogStatus(status);
    setDialogOpen(true);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const newStatus = destination.droppableId as TaskStatus;
    moveTask(draggableId, newStatus, destination.index);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const columns: TaskStatus[] = ["todo", "in_progress"];

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map(status => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={getTasksByStatus(status)}
              onAddClick={handleAddClick}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>
      </DragDropContext>

      <AddTaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        defaultStatus={dialogStatus}
        onAdd={addTask}
      />
    </>
  );
}
