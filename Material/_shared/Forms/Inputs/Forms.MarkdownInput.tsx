import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

interface Field {
  name: string;
  placeholder?: string;
}

interface AppProps {
  type?: string;
  value: string;
  field: Field;
  setFieldTouched: (field: string, touched: boolean, shouldValidate?: boolean) => void;
  setFieldValue: (field: string, value: string) => void;
  standAlone?: boolean;
  previewOnly?: boolean;
  [key: string]: unknown;
}

const App: React.FC<AppProps> = ({
  value,
  field,
  setFieldValue,
  previewOnly
}) => {
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">("write");

  return (
    <div className="container">
      {previewOnly ? (
        <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(value) }} />
      ) : (
        <ReactMde
          value={value}
          onChange={(newValue) => {
            setFieldValue(field.name, newValue);
          }}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
      )}
    </div>
  );
};

export default App;
