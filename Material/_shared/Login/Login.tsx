import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import LockIcon from "@material-ui/icons/LockOutlined";
import ClientNotification from "../ClientNotification/ClientNotification";
import {
  Button,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
} from "@material-ui/core";
import Forms from "../Forms/Forms";
import { RouteComponentProps } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginProps extends RouteComponentProps {
  onChange: () => void;
  onSubmit: (values: LoginFormValues) => Promise<void>;
  onProviderAuth: () => void;
  onRegister: () => void;
  onForgotPassword: () => void;
  onSuccess?: (values: LoginFormValues) => void;
  logo?: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const form = {
  fields: [
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
  ],
};

const Login: React.FC<LoginProps> = ({
  onSubmit,
  onRegister,
  onForgotPassword,
  history,
  onSuccess,
  logo,
}) => {
  return (
    <Card style={{ position: "relative", top: "6em" }}>
      <CardHeader
        style={{ justifyContent: "center" }}
        component={() => (
          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            alignContent="center"
          >
            {logo ? (
              <img src={logo} alt="Logo" />
            ) : (
              <Avatar>
                <LockIcon />
              </Avatar>
            )}
            <Typography
              style={{ textAlign: "center", fontWeight: "bold" }}
              variant="h5"
            >
              Sign in
            </Typography>
          </Grid>
        )}
      />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (
          values: LoginFormValues,
          actions: FormikHelpers<LoginFormValues>
        ) => {
          try {
            await onSubmit(values);
            if (onSuccess) {
              onSuccess(values);
            } else {
              history.push("/");
            }
          } catch (err) {
            actions.setErrors({ server: err });
          } finally {
            actions.setSubmitting(false);
          }
        }}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          submitCount,
          setErrors,
          ...formikProps
        }) => {
          const notifications =
            errors &&
            Object.keys(errors).map((k) => ({
              message: `${k}: ${errors[k as keyof typeof errors]}`,
              type: "error",
            }));
          return (
            <>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Forms
                    form={form}
                    errors={errors}
                    modelSchema={loginSchema} // Add the missing modelSchema property
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    values={values}
                    touched={touched}
                    isSubmitting={isSubmitting}
                    {...formikProps}
                  />
                </form>
                <CardActions style={{ justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      handleSubmit(e)
                    }
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </CardActions>
                <Grid container direction="column">
                  <Button
                    color="secondary"
                    fullWidth
                    variant="outlined"
                    onClick={onForgotPassword}
                  >
                    <Typography
                      style={{ textTransform: "lowercase" }}
                      variant="subtitle2"
                      color="primary"
                    >
                      Forgot Password?
                    </Typography>
                  </Button>
                  <Button
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    onClick={onRegister}
                  >
                    <Typography
                      style={{ textTransform: "lowercase" }}
                      variant="subtitle2"
                      color="primary"
                    >
                      Want a new account? Register here
                    </Typography>
                  </Button>
                </Grid>
                {notifications &&
                  notifications.length > 0 &&
                  submitCount > 0 && (
                    <ClientNotification
                      notifications={
                        notifications.length > 0 ? notifications : []
                      }
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

export default Login;
