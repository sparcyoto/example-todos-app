import React from "react";
import AceEditor from "react-ace";

// Import necessary Ace modes and themes
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

interface ToolRequestProps {
  name: string;
  args: any;
}

const ToolRequest: React.FC<ToolRequestProps> = ({ name, args }) => {
  return (
    <details>
      <summary>🔧 Calling Tool `{name}`</summary>
      <AceEditor
        mode="json"
        theme="monokai"
        name={`tool_request_args_${name}`}
        value={JSON.stringify(args, null, 2)}
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

export default ToolRequest;
