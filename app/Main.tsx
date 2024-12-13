import React, { useState } from "react";
import MessageList from "../components/MessageList";
import { Message, AuthorRole, MessagePartType } from "../types/models";

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      parts: [
        {
          type: MessagePartType.TEXT,
          value: "Hello! How can I assist you today?",
        },
      ],
      author: {
        role: AuthorRole.ASSISTANT,
      },
      createdAt: new Date(),
    },
    {
      id: "2",
      parts: [
        {
          type: MessagePartType.TEXT,
          value: "I need help with my React application.",
        },
      ],
      author: {
        role: AuthorRole.USER,
      },
      createdAt: new Date(),
    },
    {
      id: "3",
      parts: [
        {
          type: MessagePartType.TEXT,
          value:
            "I'd be happy to help! What specific issues are you facing with your React application?",
        },
      ],
      author: {
        role: AuthorRole.ASSISTANT,
      },
      createdAt: new Date(),
    },
    {
      id: "4",
      parts: [
        {
          type: MessagePartType.TEXT,
          value: "I'm having trouble with state management.",
        },
        {
          type: MessagePartType.CODE,
          value: "const [state, setState] = useState(null);",
        },
      ],
      author: {
        role: AuthorRole.USER,
      },
      createdAt: new Date(),
    },
  ]);

  return (
    <div>
      <h1>Chat Application</h1>
      <MessageList messages={messages} />
    </div>
  );
};

export default App;
