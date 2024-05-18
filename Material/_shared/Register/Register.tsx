/**
 * Register component for user registration.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onChange - The function to handle input change.
 * @param {Function} props.onSubmit - The function to handle form submission.
 * @param {Function} props.onProviderAuth - The function to handle provider authentication.
 * @param {Function} props.onSuccess - The function to handle successful registration.
 * @param {Function} props.onLogin - The function to handle login.
 * @param {Function} props.onForgotPassword - The function to handle forgot password.
 * @param {Object} props.classes - The CSS classes for styling the component.
 * @param {Object} props.location - The location object from React Router.
 * @param {Object} props.history - The history object from React Router.
 * @param {Object} props.match - The match object from React Router.
 * @param {string} props.logo - The URL of the logo image.
 * @returns {JSX.Element} The Register component.
 */

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Typography,
  Avatar,
  Icon,
  Grid,
} from "@mui/material";
import Forms from "../Forms/Forms";
import { Formik } from "formik";
import ClientNotification from "../ClientNotification/ClientNotification";
import * as Yup from "yup";

// Synchronous validation
const registerSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match"),
});

const form = {
  fields: [
    {
      type: "text",
      name: "name",
      placeholder: "Name",
      required: true,
    },
    {
      type: "email",
      name: "email",
      placeholder: "Email",
      required: true,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Password",
      required: true,
    },
    {
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm password",
      required: true,
    },
  ],
};

interface RegisterProps {
  onChange: (event: React.ChangeEvent<any>) => void;
  onSubmit: (values: any) => Promise<any>;
  onProviderAuth: (provider: string) => void;
  onSuccess: (values: any) => void;
  onLogin: () => void;
  onForgotPassword: () => void;
  classes: any; // Replace with the appropriate type if using a specific styling solution
  location: any; // Define a specific type if available
  history: any; // Define a specific type if available
  match: any; // Define a specific type if available
  logo: string;
}

export const Register: React.FC<RegisterProps> = ({
  onChange,
  onSubmit,
  onProviderAuth,
  onSuccess,
  onLogin,
  onForgotPassword,
  classes,
  location,
  history,
  match,
  logo,
}) => {
  return (
    <Card className={classes.layout}>
      <CardHeader
        style={{ justifyContent: "center" }}
        component={() => (
          <Grid container direction="column" justifyContent="center" alignContent="center">
            {logo ? (
              <img className={classes.logo} src={logo} alt="Logo" />
            ) : (
              <Avatar className={classes.avatar}>
                <Icon>keyboard</Icon>
              </Avatar>
            )}
            <Typography style={{ textAlign: "center", fontWeight: "bold" }} variant="h5">
              Sign Up
            </Typography>
          </Grid>
        )}
      />
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "", name: "" }}
        onSubmit={(values, actions) => {
          onSubmit(values)
            .then((res) => {
              onSuccess(res);
              actions.setSubmitting(false);
            })
            .catch((err) => {
              actions.setErrors({ server: err.message });
              actions.setSubmitting(false);
            });
        }}
        validationSchema={registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          submitCount,
          setErrors,
          ...rest
        }) => {
          const notifications =
            errors &&
            Object.keys(errors).map((k) => ({
              message: `${k}: ${errors[k]}`,
              type: "error",
            }));

          return (
            <>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Forms
                    id="login-fields"
                    form={form}
                    errors={errors}
                    modelSchema={registerSchema}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    values={values}
                    touched={touched}
                    isSubmitting={isSubmitting}
                    {...rest}
                  />
                </form>

                <CardActions style={{ justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    fullWidth={true}
                    color="secondary"
                    onClick={handleSubmit}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </CardActions>
                <Grid container direction="column">
                  <Button color="secondary" variant="outlined" onClick={onLogin}>
                    <Typography style={{ textTransform: "lowercase" }} variant="subtitle2" color="primary">
                      already have an account? login here
                    </Typography>
                  </Button>
                </Grid>
                {notifications && notifications.length > 0 && submitCount > 0 && (
                  <ClientNotification
                    notifications={notifications}
                    handleClose={() => {
                      setErrors({});
                    }}
                  />
                )}
              </CardContent>
            </>
          );
        }}
      </Formik>
    </Card>
  );
};

export default Register;
