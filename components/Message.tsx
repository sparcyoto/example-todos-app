import React from "react";
import {
  Message,
  AuthorRole,
  MessagePartType,
  WidgetType,
} from "../types/models";
import TextMessage from "./TextMessage";
import ToolRequest from "./ToolRequest";
import ToolResponse from "./ToolResponse";
import SQLWidget from "./SQLWidget";
import Timestamp from "./Timestamp";

interface MessageProps {
  msg: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ msg }) => {
  const isUser = msg.author.role === AuthorRole.USER;

  return (
    <div
      className={`chat-message ${isUser ? "user" : "assistant"}`}
      style={{ marginBottom: "20px" }}
    >
      <strong>{isUser ? "You" : "Navira ✨"}</strong>
      {msg.parts.map((part, index) => {
        switch (part.type) {
          case MessagePartType.TEXT:
            return <TextMessage key={index} value={part.value} />;
          case MessagePartType.TOOL_REQUEST:
            return (
              <ToolRequest
                key={index}
                name={part.value.name}
                args={part.value.args}
              />
            );
          case MessagePartType.TOOL_RESPONSE:
            return <ToolResponse key={index} result={part.value.result} />;
          case MessagePartType.WIDGET:
            if (part.value.widgetType === WidgetType.SQL) {
              return (
                <SQLWidget
                  key={index}
                  props={part.value.props}
                  onExecute={() => {
                    /* Implement execute */
                  }}
                />
              );
            }
            return null;
          default:
            return null;
        }
      })}
      {msg.createdAt && <Timestamp createdAt={msg.createdAt} />}
    </div>
  );
};

export default MessageComponent;
