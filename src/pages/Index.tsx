import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { LayoutDashboard, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="font-display text-xl font-bold text-foreground tracking-tight">
              TaskFlow
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-muted rounded-xl px-4 py-2 w-64">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground tracking-tight">
            My Board
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your tasks with drag & drop
          </p>
        </div>

        <KanbanBoard />
      </main>

      {/* AI Chat */}
      <ChatPanel />
    </div>
  );
};

export default Index;
