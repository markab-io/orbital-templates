import React from "react";
import { Select, InputLabel, MenuItem, FormControl } from "@mui/material";

interface Field {
  name: string;
  placeholder: string;
  required?: boolean;
  options: string[];
}

interface SelectInputProps {
  setFieldValue: (field: string, value: unknown) => void;
  field: Field;
  values: { [key: string]: unknown };
}

const SelectInput: React.FC<SelectInputProps> = ({ setFieldValue, field, values }) => {
  return (
    <FormControl fullWidth required={field.required || false}>
      <InputLabel htmlFor={field.name}>{field.placeholder}</InputLabel>
      <Select
        id={field.name}
        value={values[field.name] || ""}
        onChange={(event) => {
          setFieldValue(field.name, event.target.value);
        }}
      >
        {field.options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
