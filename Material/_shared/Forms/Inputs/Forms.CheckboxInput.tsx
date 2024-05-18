import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

interface CheckboxInputProps {
  setFieldValue: (field: string, value: unknown) => void;
  field: {
    name: string;
    placeholder: string;
  };
  checked: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ setFieldValue, field, checked }) => (
  <FormControlLabel
    control={
      <Checkbox
        id={field.name}
        onChange={(event) => {
          setFieldValue(field.name, event.target.checked);
        }}
        checked={checked}
      />
    }
    label={field.placeholder}
  />
);

export default CheckboxInput;
