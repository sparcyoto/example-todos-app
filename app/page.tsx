"use client";

import { TasksList } from "@/components/TasksList";
import { TasksProvider } from "@/lib/hooks/use-tasks";
import CustomChat from "./CustomChat";
import Main from "./Main";

export default function Home() {
  return (
    <main className="min-h-screen p-4 max-w-4xl mx-auto">
      <CustomChat />
      <Main />
      {/* <TasksProvider>
        <TasksList />
      </TasksProvider> */}
    </main>
  );
}
