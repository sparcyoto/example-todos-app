"use client";

import { TasksList } from "@/components/TasksList";
import { TasksProvider } from "@/lib/hooks/use-tasks";
import CustomChat from "./CustomChat";
import Main from "./Main";
import { CopilotKit } from "@copilotkit/react-core";

export default function Home() {
  return (
    <main className="min-h-screen p-4 max-w-4xl mx-auto">
      <CopilotKit runtimeUrl="/api/chat">
        <CustomChat />
      </CopilotKit>
      <Main />
    </main>
  );
}
