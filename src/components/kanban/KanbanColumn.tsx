import { TaskStatus, COLUMN_CONFIG } from "@/types/kanban";
import { Task } from "@/types/kanban";
import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import { Plus } from "lucide-react";

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onAddClick: (status: TaskStatus) => void;
  onDeleteTask: (id: string) => void;
}

export function KanbanColumn({ status, tasks, onAddClick, onDeleteTask }: KanbanColumnProps) {
  const config = COLUMN_CONFIG[status];

  return (
    <div className="kanban-column flex-1 min-w-[320px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: `hsl(var(--${config.color === "kanban-todo" ? "kanban-todo" : "kanban-progress"}))` }}
          />
          <h3 className="font-display font-semibold text-foreground">
            {config.title}
          </h3>
          <span className="text-xs font-medium text-muted-foreground bg-card px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddClick(status)}
          className="p-1.5 rounded-lg hover:bg-card transition-colors text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] rounded-xl transition-colors ${
              snapshot.isDraggingOver ? "bg-primary/5 ring-2 ring-primary/20" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
