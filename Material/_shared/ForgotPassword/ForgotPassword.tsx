import React from "react";
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import LockIcon from "@mui/icons-material/LockOutlined";
import { useTheme, Theme } from "@mui/material/styles";
import {
  Button,
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import { Route, RouteComponentProps } from "react-router-dom";
import ForgotPasswordConfirm from "./ForgotPasswordConfirm";
import Forms from "../Forms/Forms";

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    position: "relative",
    top: "7em",
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
}));

interface ForgotPasswordProps extends RouteComponentProps {
  forgotPassword: (values: { email: string }) => Promise<void>;
}

// Synchronous validation
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const form = {
  fields: [
    {
      type: "email",
      name: "email",
      placeholder: "Your Email",
      required: true,
    },
  ],
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ forgotPassword, history, match }) => {
  const classes = useStyles(useTheme());

  return (
    <>
      <Route
        exact
        path={`${match.path}`}
        render={() => (
          <Card className={classes.layout}>
            <CardHeader
              style={{ justifyContent: "center" }}
              component={() => (
                <Grid container direction="column" justifyContent="center" alignItems="center">
                  <Avatar className={classes.avatar}>
                    <LockIcon />
                  </Avatar>
                  <Typography variant="h5">Forgot Password</Typography>
                </Grid>
              )}
            />
            <Formik
              initialValues={{ email: "" }}
              onSubmit={(values, actions) => {
                forgotPassword(values)
                  .then(() => {
                    history.push(`${match.url}/confirm`);
                    actions.setSubmitting(false);
                  })
                  .catch(() => {
                    actions.setSubmitting(false);
                  });
              }}
              validationSchema={forgotPasswordSchema}
            >
              {({
                values,
                errors,
                touched,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                setFieldTouched,
              }) => (
                <>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <Forms
                        form={form}
                        errors={errors}
                        modelSchema={forgotPasswordSchema} // Add the missing modelSchema property
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        values={values}
                        touched={touched}
                        isSubmitting={isSubmitting}
                      />
                    </form>
                    <CardActions style={{ justifyContent: "flex-end" }}>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => handleSubmit()}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Reset Password
                      </Button>
                    </CardActions>
                  </CardContent>
                </>
              )}
            </Formik>
          </Card>
        )}
      />
      <Route
        path={`${match.path}/confirm`}
        render={() => (
          <ForgotPasswordConfirm
            onDone={() => {
              history.push("/auth/login");
            }}
          />
        )}
      />
    </>
  );
};

export default ForgotPassword;
