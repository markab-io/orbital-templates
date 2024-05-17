import React, { FormEvent, useState } from "react";
import Autosuggest, {
  ChangeEvent,
  SuggestionsFetchRequestedParams,
  SuggestionSelectedEventData,
  RenderSuggestionsContainerParams,
  InputProps,
} from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { MenuItem, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styles } from "./Autocomplete.styles";
import * as Inputs from "../Forms/Inputs";

const useStyles = makeStyles(styles);

interface Suggestion {
  name: string;
  title: string;
  [key: string]: unknown; // Change the type from 'any' to 'unknown'
}

interface Section {
  modelName: string;
  res: Suggestion[];
}

interface AutocompleteProps {
  loadSuggestions: (
    value: string,
    updateSuggestions: (newState: Suggestion[], prevState: Suggestion[]) => void
  ) => Promise<Suggestion[]>;
  isMultiple?: boolean;
  onSelect: (suggestion: Suggestion) => void;
  placeholder?: string;
  inputClassName?: string;
  throttleSearch?: boolean;
}

const renderInputComponent = (inputProps: InputProps<Suggestion>) => {
  const {
    inputRef = () => {},
    ref,
    ...other
  } = inputProps;

  return (
    <Inputs.TextFieldInput
      fullWidth
      field={{ name: "" }}
      standAlone={true}
      type={""} // Add the 'type' property
      setFieldTouched={() => {}} // Add the 'setFieldTouched' property
      setFieldValue={() => {}} // Add the 'setFieldValue' property
      InputProps={{
        inputRef: (node: HTMLInputElement) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          if (inputRef && typeof inputRef === 'function') {
            inputRef(node);
          } else if (inputRef) {
            inputRef.current = node;
          }
        },
      }}
      {...other}
    />
  );
};

const renderSuggestion = (
  suggestion: Suggestion,
  { query, isHighlighted }: { query: string; isHighlighted: boolean }
) => {
  const matches = match(suggestion.name || suggestion.title, query);
  const parts = parse(suggestion.name || suggestion.title, matches);
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
      </div>
    </MenuItem>
  );
};

const getSuggestionValue = (suggestion: Suggestion) => {
  return suggestion.name || suggestion.title;
};

const renderSectionTitle = (section: Section) => {
  return <strong>{section.modelName}</strong>;
};

const getSectionSuggestions = (section: Section) => {
  return section.res;
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  loadSuggestions,
  isMultiple = false,
  onSelect,
  placeholder,
}) => {
  const classes = useStyles();

  const [single, setSingle] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleSuggestionsFetchRequested = async ({
    value,
  }: SuggestionsFetchRequestedParams) => {
    const updateSuggestions = (newState: Suggestion[]) =>
      setSuggestions(newState);
    const res = await loadSuggestions(value, updateSuggestions);
    setSuggestions(res);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };


  const autosuggestProps = {
    renderInputComponent,
    suggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  function handleChange // Add the onChange property
    (event: FormEvent<HTMLElement>, params: ChangeEvent): void {
      setSingle(params.newValue);
  }

  return (
    <Autosuggest
      {...autosuggestProps}
      inputProps={{
        placeholder: placeholder || "Search",
        value: single,
        onChange: handleChange // Add the onChange property
      }}
      multiSection={isMultiple}
      getSectionSuggestions={getSectionSuggestions}
      renderSectionTitle={renderSectionTitle}
      renderSuggestionsContainer={(options: RenderSuggestionsContainerParams) => (
        <Paper {...options.containerProps} square>
          {options.children}
        </Paper>
      )}
      onSuggestionSelected={(
        event,
        { suggestion }: SuggestionSelectedEventData<Suggestion>
      ) => {
        onSelect(suggestion);
      }}
    />
  );
};

export default Autocomplete;
