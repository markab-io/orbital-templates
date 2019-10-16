import React from "react";
import {
  Button,
  Icon,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Divider
} from "@material-ui/core";

const EditableObjectArray = ({
  field,
  setFieldValue,
  children,
  edited,
  setEdited,
  classes,
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
  ...rest
}) => {
  return (
    <Card>
      <CardHeader title={field.placeholder}></CardHeader>
      <CardContent>
        {values && values.map((val, index) => {
          return (
            <>
              <FieldsComponent
                form={field.form}
                setFieldValue={(key, value) => {
                  values[index] = { ...values[index], [key]: value };
                  setFieldValue(field.name, values);
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
              <Grid container justify="flex-end">
                <Button
                  onClick={() => {
                    values = values.filter((v, i) => i !== index);
                    setFieldValue(field.name, [...values]);
                    onDelete(index);
                  }}
                  variant="contained"
                  color="secondary"
                >
                  <Icon>delete</Icon>
                </Button>
              </Grid>
              <Divider />
            </>
          );
        })}
      </CardContent>
      <CardActionArea>
        <Grid container justify="flex-end">
          <Button
            onClick={() => onAdd()}
            variant="contained"
            style={{ marginLeft: "10px" }}
          >
            <Icon>add</Icon>
            Add {field.placeholder}
          </Button>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default EditableObjectArray;
