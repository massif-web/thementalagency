"use client";
import { Highlight, themes } from "prism-react-renderer";
import type React from "react";
import { CopyButton } from "./CopyButton";

type Props = {
  code: string;
  language?: string;
};

export const Code: React.FC<Props> = ({ code, language = "" }) => {
  if (!code) return null;

  return (
    <Highlight code={code} language={language} theme={themes.vsDark}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <pre className="bg-black p-4 border border-border rounded overflow-x-auto text-xs">
          {tokens.map((line, i) => {
            const key = `line-${i}`;
            return (
              <div
                key={key}
                {...getLineProps({ className: "table-row", line })}
              >
                <span className="table-cell text-white/25 text-right select-none">
                  {i + 1}
                </span>
                <span className="table-cell pl-4">
                  {line.map((token, key) => {
                    const lineKey = `token-${key}`;
                    return <span key={lineKey} {...getTokenProps({ token })} />;
                  })}
                </span>
              </div>
            );
          })}
          <CopyButton code={code} />
        </pre>
      )}
    </Highlight>
  );
};
