import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

interface CodeInputProps {
  type: string;
  value: string;
  field: {
    name: string;
  };
  setFieldValue: (field: string, value: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ type, value, field, setFieldValue }) => {
  return (
    <Editor
      value={value || ""}
      onValueChange={(code) => {
        setFieldValue(field.name, code);
      }}
      highlight={(code) => highlight(code, languages.js, type)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
  );
};

export default CodeInput;
