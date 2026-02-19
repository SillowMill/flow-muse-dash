import { Task, TaskPriority, LABEL_COLORS } from "@/types/kanban";
import { Draggable } from "@hello-pangea/dnd";
import { MoreHorizontal, Trash2, Paperclip, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, index, onDelete }: TaskCardProps) {
  const priority = task.priority as TaskPriority;
  const labelColor = task.label && LABEL_COLORS[task.label]
    ? LABEL_COLORS[task.label]
    : "bg-muted text-muted-foreground";

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card mb-3 ${snapshot.isDragging ? "task-card-dragging" : ""}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              {task.label && (
                <span className={`label-badge ${labelColor}`}>
                  {task.label}
                </span>
              )}
              <span className={`label-badge priority-${priority}`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-lg hover:bg-muted transition-colors">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => onDelete(task.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <h4 className="font-display font-semibold text-sm text-foreground mb-1">
            {task.title}
          </h4>

          {task.description && (
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1 text-xs">
              <Paperclip className="h-3 w-3" />
              <span>{Math.floor(Math.random() * 5)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <MessageSquare className="h-3 w-3" />
              <span>{Math.floor(Math.random() * 10)}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
