// Enums representing various roles and message part types
export enum AuthorRole {
  USER = "USER",
  ASSISTANT = "ASSISTANT",
  SYSTEM = "SYSTEM",
  TOOL = "TOOL",
}

export enum MessagePartType {
  TEXT = "TEXT",
  ERROR = "ERROR",
  TOOL_REQUEST = "TOOL_REQUEST",
  TOOL_RESPONSE = "TOOL_RESPONSE",
  WIDGET = "WIDGET",
  CODE = "CODE",
}

export enum WidgetType {
  SQL = "SQL",
}

// Interfaces representing the structure of messages and widgets
import { UUID } from "crypto"; // You might need to install a UUID library or use string

export interface MessageAuthor {
  userId?: string; // UUID can be represented as a string
  role: AuthorRole;
}

export interface MessagePart {
  type: MessagePartType;
  value: any; // You can make this more specific based on use cases
}

export interface Message {
  id?: string; // UUID as string
  parts: MessagePart[];
  createdAt?: Date;
  updatedAt?: Date;
  author: MessageAuthor;
}

export interface WidgetProps {
  widgetType: WidgetType;
  props: any; // Define specific widget props as needed
}

export interface SQLWidgetProps {
  sqlQuery: string;
  naturalLanguageInterpretation: string;
  requiresExternalPagination: boolean;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface ExecuteSqlRequest {
  sqlQuery: string;
  tenantId: string;
  enablePagination: boolean;
  pagination?: PaginationParams;
}

export interface ExecuteSqlResponse {
  results: any[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
  executionTime: number;
}
