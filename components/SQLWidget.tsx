import React, { useState } from "react";
import AceEditor from "react-ace";
import {
  SQLWidgetProps,
  ExecuteSqlRequest,
  ExecuteSqlResponse,
} from "../types/models";

// Import necessary Ace modes and themes
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";

interface SQLWidgetComponentProps {
  props: SQLWidgetProps;
  onExecute: (request: ExecuteSqlRequest) => Promise<ExecuteSqlResponse>;
}

const SQLWidget: React.FC<SQLWidgetComponentProps> = ({ props, onExecute }) => {
  const [sqlQuery, setSqlQuery] = useState(props.sqlQuery);
  const [results, setResults] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExecute = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await onExecute({
        sqlQuery,
        tenantId: "selectedTenantId", // Replace with actual tenant ID
        enablePagination: props.requiresExternalPagination,
        pagination: props.requiresExternalPagination ? pagination : undefined,
      });
      setResults(response.results);
      setPagination({
        page: response.pagination.currentPage,
        pageSize: pagination.pageSize,
      });
    } catch (err: any) {
      setError(err.message || "Error executing SQL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ border: "1px solid #ddd", padding: "10px", marginTop: "10px" }}
    >
      <blockquote>{props.naturalLanguageInterpretation}</blockquote>
      <AceEditor
        mode="sql"
        theme="monokai"
        name="sql_widget"
        value={sqlQuery}
        onChange={setSqlQuery}
        width="100%"
        height="200px"
        setOptions={{
          useWorker: false,
          showGutter: true,
          showLineNumbers: true,
        }}
      />
      <button onClick={handleExecute} disabled={loading}>
        {loading ? "Executing..." : "Execute Query"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {results.length > 0 && (
        <div>
          <p>Found {results.length} records.</p>
          <table>
            <thead>
              <tr>
                {Object.keys(results[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination controls can be added here */}
        </div>
      )}
    </div>
  );
};

export default SQLWidget;
