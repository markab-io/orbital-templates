import React, { useState } from "react";
import Autosuggest, {
  ChangeEvent,
  SuggestionsFetchRequestedParams,
  SuggestionSelectedEventData,
  RenderSuggestionsContainerParams,
} from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { MenuItem, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styles } from "./Autocomplete.styles";
import * as Inputs from "../Forms/Inputs";

const useStyles = makeStyles(styles);

const renderInputComponent = (inputProps: { 
  inputRef?: (() => void) | React.RefObject<any>; 
  ref: React.Ref<any>; 
}) => {
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
      value={"Type"}
      type={""} // Add the 'type' property
      setFieldTouched={() => {}} // Add the 'setFieldTouched' property
      setFieldValue={() => {}} // Add the 'setFieldValue' property
      InputProps={{
        inputRef: (node) => {
          if (ref && typeof ref === 'function') {
            ref(node);
          }
          if (inputRef && inputRef.current) {
            inputRef.current = node;
          }
        },
      }}
      {...other}
    />
  );
};

const renderSuggestion = (suggestion: Suggestion, { query, isHighlighted }: { query: string; isHighlighted: boolean }) => {
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
  inputClassName,
  throttleSearch,
}) => {
  const classes = useStyles();

  const [single, setSingle] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleSuggestionsFetchRequested = async ({ value }: SuggestionsFetchRequestedParams) => {
    const updateSuggestions = (newState: any, prevState: any) =>
      setSuggestions(newState);
    const res = await loadSuggestions(value, updateSuggestions);
    setSuggestions(res);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, { newValue }: ChangeEvent) => {
    setSingle(newValue);
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <Autosuggest
      className={inputClassName}
      {...autosuggestProps}
      inputProps={{
        classes,
        placeholder: placeholder || "Search",
        value: single,
        onChange: handleChange,
      }}
      theme={{
        container: inputClassName || classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
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
