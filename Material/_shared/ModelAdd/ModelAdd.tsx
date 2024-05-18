import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Icon,
  Typography,
} from "@material-ui/core";
import Forms from "../Forms/Forms";
import ClientNotification from "../ClientNotification/ClientNotification";
import FormsValidate from "../Forms/Forms.Validate";
import { ObjectSchema } from "yup";

interface FormField {
  name: string;
  value: unknown;
  [key: string]: unknown;
}

interface FormSchema {
  fields: FormField[];
}

interface ModelAddProps {
  onSave: (values: Record<string, unknown>) => void;
  onCancel: () => void;
  form: FormSchema;
  modelSchema: ObjectSchema<any>;
  modelName: string;
  notifications: unknown[];
  removeNotification: (notification: unkown) => void;
}

const ModelAdd: React.FC<ModelAddProps> = ({
  onSave,
  onCancel,
  form,
  modelSchema,
  modelName,
  notifications,
  removeNotification,
  ...rest
}) => {
  const [initialValues, setInitialValues] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const formKeyVal: Record<string, unknown> = {};
    form &&
      form.fields.map((field) => {
        formKeyVal[field.name] = field.value;
      });
    setInitialValues(formKeyVal);
  }, [form]);

  return (
    <Formik
      onSubmit={(values) => {
        onSave(values);
      }}
      enableReinitialize={true}
      validate={(values) => {
        const errors = FormsValidate(values, form, modelSchema);
        return errors;
      }}
      initialValues={initialValues}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Card>
          <CardContent>
            <Typography variant="h6">Create {modelName}</Typography>
            <form id="add-form" onSubmit={handleSubmit}>
              <Forms
                modelSchema={modelSchema}
                form={{ fields: form.fields.map(field => ({ ...field, type: '' })) }}
                errors={errors}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                values={values}
                touched={touched}
                handleBlur={handleBlur}
                {...rest}
              />
            </form>
          </CardContent>
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={isSubmitting}>
              <Icon>save</Icon>
              <span style={{ marginLeft: "3px" }}>Save</span>
            </Button>
            <Button variant="contained" color="primary" onClick={onCancel}>
              Cancel
            </Button>
          </CardActions>
          <ClientNotification
            notifications={notifications}
            handleClose={(event, reason, notification) => {
              removeNotification(notification);
            }}
          />
        </Card>
      )}
    </Formik>
  );
};

export default ModelAdd;
