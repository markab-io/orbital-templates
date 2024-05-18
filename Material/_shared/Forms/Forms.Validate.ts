import * as yup from 'yup';

interface Field {
  name: string;
  required?: boolean;
  type?: string;
  options?: string[];
}

interface Form {
  fields: Field[];
}

type Values = { [key: string]: unknown };

const validate = (values: Values, form: Form, modelSchema?: yup.ObjectSchema<Values>): Values => {
  const errors: Values = {};

  if (modelSchema) {
    try {
      modelSchema.validateSync(values, { abortEarly: false });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
      }
    }
  } else {
    form.fields.forEach((field) => {
      if (field.required && !values[field.name]) {
        errors[field.name] = "Required";
      }
      if (field.type === "email") {
        try {
          const schema = yup.string().email();
          schema.validateSync(values[field.name]);
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            errors[field.name] = error.message;
          }
        }
      } else if (field.required && field.options) {
        if (!field.options.includes(values[field.name] as string)) {
          errors[field.name] = `Please select from ${field.options}`;
        }
      }
    });
  }

  return errors;
};

export default validate;
