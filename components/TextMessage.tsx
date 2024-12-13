import React from "react";

interface TextMessageProps {
  value: string;
}

const TextMessage: React.FC<TextMessageProps> = ({ value }) => {
  return <p>{value}</p>;
};

export default TextMessage;
