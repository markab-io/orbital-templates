import React from "react";
import { FastField, FieldProps } from "formik";
import { TextField } from "@mui/material";

interface Field {
  name: string;
  placeholder?: string;
  required?: boolean;
}

interface TextFieldInputProps {
  type: string;
  value: string;
  field: Field;
  setFieldTouched: (field: string, touched: boolean, shouldValidate?: boolean) => void;
  setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void;
  standAlone?: boolean;
}

const TextFieldInput: React.FC<TextFieldInputProps> = ({
  type,
  value,
  field,
  setFieldTouched,
  setFieldValue,
  standAlone,
  ...rest
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, event.target.value);
  };

  const handleBlur = () => {
    setFieldTouched(field.name, true);
  };

  return standAlone ? (
    <TextField
      id={field.name}
      key={field.name}
      label={field.placeholder || field.name}
      type={type}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      required={field.required || false}
      fullWidth
      {...rest}
    />
  ) : (
    <FastField name={field.name}>
      {({ field: formikField }: FieldProps) => (
        <TextField
          id={field.name}
          label={field.placeholder || field.name}
          type={type}
          {...formikField}
          onChange={handleChange}
          onBlur={handleBlur}
          required={field.required || false}
          fullWidth
          {...rest}
        />
      )}
    </FastField>
  );
};

export default TextFieldInput;
