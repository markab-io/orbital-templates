import React from "react";
import { visibleWhenFilter } from "Templates/_shared/Forms/VisibleWhenFilter";
import { styles } from "./Forms.styles";
import { withStyles } from "@material-ui/styles";
import { withState, compose, lifecycle } from "recompose";
// import theme from "Theme";
import RichTextEditor from "react-rte";
import moment from "moment";
import ClientNotification from "Templates/_shared/ClientNotification/ClientNotification";
import Autocomplete from "Templates/_shared/Autocomplete/Autocomplete";
import {
  EditableArray,
  EditableObjectArray,
  TextFieldInput,
  SelectInput,
  GalleryInput,
  ImageFileInput,
  CheckboxInput,
  MarkdownInput
} from "Templates/_shared/Forms/Inputs";
import { CircularProgress, Typography, Button } from "@material-ui/core";

const enhance = compose(
  withState(
    "textEditorValue",
    "setTextEditorValue",
    RichTextEditor.createEmptyValue()
  ),
  withState("timeoutValue", "setTimeoutValue", null),
  withState("currentGalleryIndex", "setCurrentGalleryIndex", 0)
);

const Fields = enhance(
  ({
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
    textEditorValue,
    setTextEditorValue,
    timeoutValue,
    setTimeoutValue,
    currentGalleryIndex,
    setCurrentGalleryIndex,
    isSubmitting,
    theme,
    classes,
    onRefGet,
    onRefCreate,
    onRefUpdate,
    onRefFormGet,
    onRefMediaGet,
    onRefGalleryGet,
    onRefMediaDrop,
    onRefGalleryDrop,
    onRefDelete,
    ...rest
  }) => {
    if (form) {
      let fieldsView = form.fields.map((field, index) => {
        let falseDecisions = visibleWhenFilter(
          field,
          ["visibleWhen", "notVisibleWhen"],
          [true, false],
          values
        );
        if (falseDecisions.length > 0) {
          return;
        }
        return (
          <div key={field.name} style={{ margin: "1em" }}>
            {(field.type === "text" ||
              field.type === "number" ||
              field.type === "password" ||
              field.type === "email") && (
              <TextFieldInput
                field={field}
                value={values[field.name]}
                type={field.type}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
              />
            )}
            {field.type === "select" && (
              <SelectInput
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                field={field}
                values={values}
                type={field.type}
              />
            )}
            {field.type === "checkbox" && (
              <CheckboxInput
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                field={field}
                type={field.type}
                checked={values && values[field.name]}
              />
            )}
            {field.type === "markdown" && (
              <div>
                <MarkdownInput
                  field={field}
                  setFieldValue={setFieldValue}
                  value={values[field.name]}
                  classes={classes}
                />
              </div>
            )}
            {field.type === "date" && (
              <div>
                <TextFieldInput
                  type="date"
                  value={moment(values[field.name]).format("YYYY-MM-DD")}
                  field={field}
                  InputProps={{ shrink: true }}
                />
              </div>
            )}
            {field.type === "datetime" && (
              <div>
                <TextFieldInput
                  type="datetime-local"
                  value={moment(values[field.name]).format("YYYY-MM-DDThh:mm")}
                  field={field}
                  InputProps={{ shrink: true }}
                />
              </div>
            )}
            {field.type === "text-editor" && (
              <div>
                <RichTextEditor
                  value={textEditorValue}
                  onChange={value => {
                    setTextEditorValue(value);
                    if (timeoutValue) {
                      clearTimeout(timeoutValue);
                    }
                    let timeout = setTimeout(() => {
                      setFieldValue(field.name, value.toString("html"));
                    }, 1000);
                    setTimeoutValue(timeout);
                  }}
                />
                {values[field.name]}
              </div>
            )}
            {field.type === "array" && (
              <EditableArray
                field={field}
                setFieldValue={setFieldValue}
                classes={classes}
                form={form}
                values={values}
              />
            )}
            {field.type === "object-array" && (
              <EditableObjectArray
                form={field.form}
                field={field}
                values={values[field.name]}
                setFieldValue={(key, value) => {
                  const el = values[field.name].find(
                    ({ _id }) => _id === value._id
                  );
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
                  setFieldValue(field.name, [...values[field.name], {}]);
                }}
                onDelete={index => {
                  const filtered = values[field.name].filter(
                    (v, i) => i !== index
                  );
                  setFieldValue(field.name, filtered);
                }}
                FieldsComponent={Fields}
                {...rest}
              />
            )}
            {field.type === "image" && (
              <ImageFileInput
                onMediaDrop={onMediaDrop}
                media={media}
                field={field}
              />
            )}
            {field.type === "gallery" && (
              <GalleryInput
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
                onSelect={suggestion => {
                  const value = [suggestion._id];
                  setFieldValue(field.name, value);
                }}
                loadSuggestions={text => {
                  return onRefGet(field.name);
                }}
              />
            )}
            {field.type === "ref-array" &&
              (values[field.name].length && values[field.name].length > 0 ? (
                values[field.name].map(val => {
                  return <Fields form={form} values={val} />;
                })
              ) : (
                <>
                  <Fields
                    form={form}
                    values={{}}
                    setFieldValue={(key, value) => onRefUpdate(key, value)}
                    onRefMediaDrop={onMediaDrop}
                    onRefGalleryDrop={onGalleryDrop}
                    onRefMediaDelete={onMedialDelete}
                    refMedia={onRefMediaGet}
                    refGallery={onRefGalleryGet}
                    onRefFormGet={onRefFormGet}
                    onRefGet={onRefGet}
                    onRefCreate={onRefCreate}
                    onRefUpdate={onRefUpdate}
                    onRefDelete={onRefDelete}
                    {...rest}
                  />
                  <Button onClick={onRefCreate}>Add new Fields</Button>
                </>
              ))}
            {errors[field.name] && touched[field.name] && (
              <Typography>{errors[field.name]}</Typography>
            )}
          </div>
        );
      });
      let notifications = Object.keys(errors).map(k => {
        return {
          message: `${k}: ${errors[k]}`,
          type: "error"
        };
      });
      return (
        <>
          {notifications.length > 0 && (
            <ClientNotification
              notifications={(notifications.length > 0 && notifications) || []}
              handleClose={() => {}}
            />
          )}
          {fieldsView}
        </>
      );
    }
    return <CircularProgress />;
  }
);

export default withStyles(styles)(Fields);
