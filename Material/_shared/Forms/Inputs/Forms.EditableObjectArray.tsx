import React from "react";
import {
  Button,
  Icon,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  makeStyles,
} from "@material-ui/core";

interface Field {
  name: string;
  placeholder: string;
  form: unknown;
}

interface EditableObjectArrayProps {
  field: Field;
  setFieldValue: (field: string, value: unknown) => void;
  values: unknown[];
  onAdd: () => void;
  onDelete: (index: number) => void;
  setFieldTouched: (field: string, touched: boolean, shouldValidate?: boolean) => void;
  onMediaDrop?: (media: unknown) => void;
  onGalleryDrop?: (gallery: unknown) => void;
  onMediaDelete?: (media: unknown) => void;
  errors?: unknown;
  touched?: unknown;
  handleBlur?: (e: React.FocusEvent<unknown>) => void;
  FieldsComponent: React.ComponentType<unknown>;
  hideAdd?: boolean;
  hideDelete?: boolean;
  Actions?: React.ComponentType<{ model: unknown; index: number; onAction: (action: string) => void }>;
  onAction?: (action: string) => void;
  [key: string]: unknown;
}

const useStyles = makeStyles(() => ({
  chipTextField: {
    padding: "10px",
  },
}));

const EditableObjectArray: React.FC<EditableObjectArrayProps> = ({
  field,
  setFieldValue,
  values,
  onAdd,
  onDelete,
  setFieldTouched,
  onMediaDrop,
  onGalleryDrop,
  onMediaDelete,
  errors,
  touched,
  handleBlur,
  FieldsComponent,
  hideAdd,
  hideDelete,
  Actions,
  onAction,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title={field.placeholder}></CardHeader>
      <CardContent>
        {values &&
          values.map((val, index) => (
            <div key={`${field.name}-${index}`}>
              {!hideDelete && (
                <Grid style={{ marginTop: "1em" }} container justifyContent="flex-end">
                  <Button
                    onClick={() => {
                      const newValues = values.filter((_, i) => i !== index);
                      setFieldValue(field.name, newValues);
                      onDelete(index);
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    <Icon>delete</Icon>
                  </Button>
                </Grid>
              )}
              <FieldsComponent
                form={field.form}
                setFieldValue={(key: string, value: unknown) => {
                  const updatedValues = values.map((item, i) =>
                    i === index ? { ...item, [key]: value } : item
                  );
                  setFieldValue(field.name, updatedValues);
                }}
                setFieldTouched={setFieldTouched}
                onMediaDrop={onMediaDrop}
                onGalleryDrop={onGalleryDrop}
                onMediaDelete={onMediaDelete}
                values={val}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                classes={classes}
                {...rest}
              />
              <Divider />
              {Actions && <Actions model={values} index={index} onAction={onAction} />}
            </div>
          ))}
      </CardContent>
      {!hideAdd && (
        <CardActionArea>
          <Grid container justifyContent="flex-end">
            <Button onClick={onAdd} variant="contained" style={{ marginLeft: "10px" }}>
              <Icon>add</Icon>
              Add {field.placeholder}
            </Button>
          </Grid>
        </CardActionArea>
      )}
    </Card>
  );
};

export default EditableObjectArray;
