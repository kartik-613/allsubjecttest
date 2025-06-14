// src/components/CodeEditor.jsx
import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ value, onChange, language }) => {
  return (
    <Editor
      height="400px"
      defaultLanguage={language}
      language={language}
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
