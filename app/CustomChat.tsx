"use client";
import { CopilotKit } from "@copilotkit/react-core";
import { useCopilotChat } from "@copilotkit/react-core";
import { useState, useRef, useEffect } from "react";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";

export default function CustomChat() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize the chat hook with all available properties
  const {
    visibleMessages,
    appendMessage,
    setMessages,
    deleteMessage,
    reloadMessages,
    stopGeneration,
    isLoading,
  } = useCopilotChat({
    apiEndpoint: "/api/chat",
  });

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages]);

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Append user message
    appendMessage(
      new TextMessage({
        content: { abc: 20, input: input },
        role: Role.User,
      })
    );

    const abc = new TextMessage({
      content: { abc: 20 },
      role: Role.User,
    });

    console.log(abc, "sad");

    // Clear input early to improve perceived performance
    setInput("");

    // try {
    //   // Send message to backend and get response
    //   const response = await fetch("/api/chat", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       messages: [...visibleMessages, { role: "user", content: input }],
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to send message");
    //   }

    //   // The response will be handled automatically by useCopilotChat
    // } catch (error) {
    //   console.error("Error sending message:", error);
    //   // Optionally show an error message to the user
    //   appendMessage({
    //     role: "assistant",
    //     content: "Sorry, there was an error processing your message.",
    //   });
    // }
  };

  // Handle message deletion
  const handleDeleteMessage = (index: number) => {
    deleteMessage(index);
  };

  // Handle stop generation
  const handleStopGeneration = () => {
    stopGeneration();
  };

  // console.log("message", message.content);

  return (
    <div className="fixed bottom-0 right-0 w-[400px] h-[600px] bg-white shadow-xl rounded-tl-2xl overflow-hidden flex flex-col">
      {/* Chat Header */}
      <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Custom Assistant</h2>
          <p className="text-sm">How can I help you today?</p>
        </div>
        <button
          onClick={reloadMessages}
          className="p-2 hover:bg-blue-700 rounded"
        >
          🔄 Reload
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {visibleMessages.map((message, index) => {
          console.log("message", message.content);
          return (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="group relative">
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {JSON.stringify(message.content)}
                </div>
                {/* <button
                  onClick={() => handleDeleteMessage(index)}
                  className="absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  🗑️
                </button> */}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
          />
          {isLoading ? (
            <button
              type="button"
              onClick={handleStopGeneration}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
