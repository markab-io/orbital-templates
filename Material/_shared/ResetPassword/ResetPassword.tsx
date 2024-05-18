/**
 * ResetPassword component for resetting user password.
 *
 * @component
 * @param {Function} changePassword - Function to change the password.
 * @param {Function} onDone - Function to handle completion of password reset.
 * @param {Object} classes - CSS classes for styling the component.
 * @param {Object} location - Location object from react-router-dom.
 * @param {Object} history - History object from react-router-dom.
 * @param {Object} match - Match object from react-router-dom.
 * @returns {JSX.Element} ResetPassword component.
 */

import React from "react";
import { WithStyles } from "@mui/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { RouteComponentProps } from "react-router-dom";
import { styles } from "./ResetPassword.styles";
import queryString from "query-string";
import {
  Button,
  Typography,
  CssBaseline,
  Card,
  CardHeader,
  CardContent,
  Grid,
} from "@mui/material";
import * as Inputs from "../Forms/Inputs";

interface ResetPasswordProps extends WithStyles<typeof styles>, RouteComponentProps {
  changePassword: (data: { newPassword: string; email: string; token: string }) => Promise<void>;
  onDone: () => void;
}

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().required("Required"),
  confirmNewPassword: Yup.string().oneOf([Yup.ref("newPassword")], "Passwords do not match"),
});

const fields = [
  {
    type: "password",
    name: "newPassword",
    placeholder: "New Password",
    required: true,
  },
  {
    type: "password",
    name: "confirmNewPassword",
    placeholder: "Confirm New password",
    required: true,
  },
];

const ResetPassword: React.FC<ResetPasswordProps> = ({
  changePassword,
  onDone,
  classes,
  location,
  history,
  match,
}) => {
  const { token, email } = queryString.parse(location.search) as { token: string; email: string };

  return (
    <React.Fragment>
      <CssBaseline />
      <Card className={classes.layout}>
        <CardHeader
          style={{ justifyContent: "center" }}
          component={() => (
            <Grid container direction="column" justifyContent="center" alignContent="center">
              <Typography className={classes.bold} variant="h5">
                Password Reset!
              </Typography>
            </Grid>
          )}
        />
        <CardContent>
          <Formik
            initialValues={{ newPassword: "", confirmNewPassword: "" }}
            onSubmit={(values, actions) => {
              const { newPassword } = values;
              changePassword({ newPassword, email, token })
                .then(() => {
                  history.push(`${match.url}/confirm`);
                  actions.setSubmitting(false);
                })
                .catch((err) => {
                  actions.setErrors({ server: err.message });
                  actions.setSubmitting(false);
                });
            }}
            validationSchema={ResetPasswordSchema}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                {errors.server && <Typography color="error">{errors.server}</Typography>}
                {fields.map((field, index) => (
                  <div key={index}>
                    <Inputs.TextFieldInput
                      id={field.name}
                      field={field}
                      label={field.placeholder}
                      type={field.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      required={field.required}
                      onKeyPress={(event) => event.key === "Enter" && handleSubmit()}
                    />
                    {errors[field.name] && touched[field.name] && (
                      <Typography color="error">{errors[field.name]}</Typography>
                    )}
                  </div>
                ))}
                <Grid container justifyContent="center" className={classes.top30}>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={handleSubmit}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Reset Password
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
          <Grid container justifyContent="center" alignContent="center" alignItems="center" className={classes.top30}>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={onDone}>
                Home
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default ResetPassword;
