import React from "react";
import { Message } from "../types/models";
import MessageComponent from "./Message";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((msg) => (
        <MessageComponent key={msg.id} msg={msg} />
      ))}
    </div>
  );
};

export default MessageList;
