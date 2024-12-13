import React from "react";
import { formatRelativeTime } from "../utils/formatRelativeTime";

interface TimestampProps {
  createdAt: Date;
}

const Timestamp: React.FC<TimestampProps> = ({ createdAt }) => {
  return <small>{formatRelativeTime(createdAt)}</small>;
};

export default Timestamp;
