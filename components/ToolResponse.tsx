import React from "react";
import AceEditor from "react-ace";

// Import necessary Ace modes and themes
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

interface ToolResponseProps {
  result: any;
}

const ToolResponse: React.FC<ToolResponseProps> = ({ result }) => {
  const formattedResult =
    typeof result === "object" ? JSON.stringify(result, null, 2) : result;

  return (
    <details>
      <summary>🔧 Tool Result</summary>
      <AceEditor
        mode="json"
        theme="monokai"
        name={`tool_response_result`}
        value={formattedResult}
        readOnly
        width="100%"
        height="200px"
        setOptions={{
          useWorker: false,
          showGutter: false,
          showLineNumbers: false,
        }}
      />
    </details>
  );
};

export default ToolResponse;
