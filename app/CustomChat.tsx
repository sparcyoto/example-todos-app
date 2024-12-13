"use client";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import { useState } from "react";

export default function CustomChat() {
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <CopilotKit runtimeUrl="/api/chat">
      <div className="fixed bottom-0 right-0 w-[400px] h-[600px] bg-white shadow-xl rounded-tl-2xl overflow-hidden">
        <CopilotChat
          isOpen={chatOpen}
          onOpenChange={setChatOpen}
          title="Custom Assistant"
          description="How can I help you today?"
          suggestions={[
            "How do I implement authentication?",
            "What's the best way to handle state?",
            "Can you explain routing in Next.js?",
          ]}
          className="h-full"
          defaultOpen={true}
          style={{
            boxShadow: "none",
            border: "none",
            background: "transparent",
          }}
        />
      </div>
    </CopilotKit>
  );
}
