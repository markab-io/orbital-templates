import React, { useState } from "react";
import { CircularProgress, Button, Typography } from "@mui/material";
import moment from "moment";
import * as Inputs from "./Inputs";
import Autocomplete from "../Autocomplete/Autocomplete";
import { visibleWhenFilter } from "./VisibleWhenFilter";
import { FormikErrors, FormikTouched } from "formik";


interface FormField {
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  editable?: boolean;
  form?: unknown; // Define more specific types if necessary
}

interface FormsProps {
  form: {
    fields: FormField[];
  };
  setFieldValue: (field: string, value: unknown) => void;
  errors: FormikErrors<unknown>;
  touched: FormikTouched<unknown>;
  handleBlur: (e: React.FocusEvent<unknown>) => void;
  setFieldTouched: (field: string, touched: boolean, shouldValidate?: boolean) => void;
  values: unknown;
  media?: unknown;
  onMediaDrop?: (media: unknown) => void;
  onGalleryDrop?: (gallery: unknown) => void;
  onMediaDelete?: (media: unknown) => void;
  gallery?: unknown;
  textEditorValue?: unknown;
  setTextEditorValue?: (value: unknown) => void;
  isSubmitting?: boolean;
  onRefGet?: (fieldName: string, text: string, updateSuggestions: (newState: unknown[]) => void) => Promise<unknown[]>;
  onSelect?: (fieldName: string, value: unknown) => void;
  onRefCreate?: () => void;
  onRefUpdate?: (key: string, value: unknown) => void;
  onRefFormGet?: (fieldName: string) => void;
  onRefMediaGet?: (media: unknown) => void;
  onRefGalleryGet?: (gallery: unknown) => void;
  onRefMediaDrop?: (media: unknown) => void;
  onRefGalleryDrop?: (gallery: unknown) => void;
  onRefDelete?: (fieldName: string) => void;
}

const Fields: React.FC<FormsProps> = ({
  form,
  setFieldValue,
  errors,
  touched,
  handleBlur,
  setFieldTouched,
  values,
  media,
  onMediaDrop,
  onGalleryDrop,
  onMediaDelete,
  gallery,
  onRefGet,
  onSelect,
  onRefCreate,
  onRefUpdate,
  onRefFormGet,
  onRefMediaGet,
  onRefGalleryGet,
  onRefDelete,
}) => {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(0);

  if (!form) return <CircularProgress />;

  const fieldsView = form.fields.map((field) => {
    const falseDecisions = visibleWhenFilter(field, ["visibleWhen", "notVisibleWhen"], [true, false], values);

    if (falseDecisions.length > 0 || field.editable === false) return null;

    return (
      <div key={field.name} style={{ margin: "1em" }}>
        {["text", "number", "password", "email"].includes(field.type) && (
          <Inputs.TextFieldInput
            field={field}
            value={values[field.name]}
            type={field.type}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
          />
        )}
        {field.type === "select" && (
          <Inputs.SelectInput
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            field={field}
            values={values}
            type={field.type}
          />
        )}
        {field.type === "checkbox" && (
          <Inputs.CheckboxInput
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            field={field}
            type={field.type}
            checked={values && values[field.name]}
          />
        )}
        {field.type === "markdown" && (
          <Inputs.MarkdownInput
            field={field}
            setFieldValue={setFieldValue}
            value={values[field.name]}
            classes={classes}
          />
        )}
        {field.type === "date" && (
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label={field.placeholder}
            value={moment(values[field.name])}
            onChange={(date) => setFieldValue(field.name, date)}
            KeyboardButtonProps={{ "aria-label": "change date" }}
          />
        )}
        {field.type === "time" && (
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label={field.placeholder}
            value={values[field.name]}
            onChange={(date) => setFieldValue(field.name, date)}
            KeyboardButtonProps={{ "aria-label": "change time" }}
          />
        )}
        {field.type === "datetime" && (
          <Inputs.TextFieldInput
            type="datetime-local"
            value={moment(values[field.name]).format("YYYY-MM-DDThh:mm")}
            field={field}
            InputProps={{ shrink: true }}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
          />
        )}
        {field.type === "code-editor" && (
          <Inputs.CodeInput
            type={field.type}
            value={values[field.name]}
            field={field}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
        )}
        {field.type === "array" && (
          <Inputs.EditableArray
            field={field}
            setFieldValue={setFieldValue}
            classes={classes}
            form={form}
            values={values}
          />
        )}
        {field.type === "object-array" && (
          <Inputs.EditableObjectArray
            form={field.form}
            field={field}
            values={values[field.name]}
            setFieldValue={(key, value) => {
              const el = values[field.name].find(({ _id }: { _id: string }) => _id === value._id);
              setFieldValue(key, values[field.name]);
            }}
            setFieldTouched={setFieldTouched}
            onMediaDrop={onMediaDrop}
            onGalleryDrop={onGalleryDrop}
            onMediaDelete={onMediaDelete}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            classes={classes}
            onAdd={() => {
              const passedValues = values[field.name] ? values[field.name] : [];
              setFieldValue(field.name, [...passedValues, {}]);
            }}
            onDelete={(index: number) => {
              const filtered: unknown[] = values[field.name].filter((v: unknown, i: number) => i !== index);
              setFieldValue(field.name, filtered);
            }}
            FieldsComponent={Fields}
            />
          )}
          {field.type === "image" && (
            <Inputs.ImageFileInput onMediaDrop={onMediaDrop} media={media} field={field} />
          )}
          {field.type === "gallery" && (
            <Inputs.GalleryInput
            gallery={gallery}
            onMediaDelete={onMediaDelete}
            setCurrentGalleryIndex={setCurrentGalleryIndex}
            currentGalleryIndex={currentGalleryIndex}
            field={field}
            onGalleryDrop={onGalleryDrop}
            />
          )}
          {field.type === "ref" && (
            <Autocomplete
            placeholder={field.placeholder}
            onSelect={(suggestion) => {
              const value = suggestion;
              setFieldValue(field.name, value);
              onSelect && onSelect(field.name, value);
            }}
            loadSuggestions={(text, updateSuggestions) => onRefGet(field.name, text, updateSuggestions)}
          />
        )}
        {field.type === "ref-array" &&
          (values[field.name].length && values[field.name].length > 0 ? (
            values[field.name].map((val) => <Fields key={val._id} form={form} values={val} />)
          ) : (
            <>
              <Fields
                form={form}
                values={{}}
                setFieldValue={(key, value) => onRefUpdate(key, value)}
                onRefMediaDrop={onMediaDrop}
                onRefGalleryDrop={onGalleryDrop}
                onRefMediaDelete={onMediaDelete}
                refMedia={onRefMediaGet}
                refGallery={onRefGalleryGet}
                onRefFormGet={onRefFormGet}
                onRefGet={onRefGet}
                onRefCreate={onRefCreate}
                onRefUpdate={onRefUpdate}
                onRefDelete={onRefDelete}
              />
              <Button onClick={onRefCreate}>Add new Fields</Button>
            </>
          ))}
        {errors && errors[field.name] && touched[field.name] && <Typography>{errors[field.name]}</Typography>}
      </div>
    );
  });

  return <>{fieldsView}</>;
};

export default Fields;
