import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Avatar,
  Icon,
  Grid,
} from "@mui/material";
import Forms from "../Forms/Forms";
import { Formik } from "formik";
import * as Yup from "yup";
import { RouteComponentProps } from "react-router-dom";

interface DisclaimerProps extends RouteComponentProps {
  onChange: () => void;
  onSubmit: () => void;
  onProviderAuth: () => void;
  onSuccess: (values: { name: string }) => void; // Update the type of values
  onLogin: () => void;
  onForgotPassword: () => void;
  classes: Record<string, string>;
  logo: string;
  content: React.ReactNode;
}

// Synchronous validation
const disclaimerSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

const form = {
  fields: [
    {
      type: "text",
      name: "name",
      placeholder: "Write Your Name here.",
      required: true,
    },
  ],
};

export const Disclaimer: React.FC<DisclaimerProps> = ({
  onSuccess,
  classes,
  content,
  logo
}) => {
  return (
    <Card className={classes.layout}>
      <CardHeader
        style={{ justifyContent: "center" }}
        component={() => (
          <Grid container direction="column" justifyContent="center" alignItems="center">
            {logo ? (
              <img className={classes.logo} src={logo} alt="Logo" />
            ) : (
              <Avatar className={classes.avatar}>
                <Icon>legal</Icon>
              </Avatar>
            )}
            <Typography style={{ textAlign: "center", fontWeight: "bold" }} variant="h5">
              Disclaimer
            </Typography>
          </Grid>
        )}
      />

      <Formik
        initialValues={{ name: "" }}
        validationSchema={disclaimerSchema}
        onSubmit={(values) => {
          onSuccess(values);
        }}
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
              <p>I, </p>
              <form style={{ display: "inline" }} onSubmit={handleSubmit}>
                <Forms
                  id="login-fields"
                  form={form}
                  modelSchema={disclaimerSchema}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  values={values}
                  touched={touched}
                  isSubmitting={isSubmitting}
                />
                {content}
                <Grid container direction="column">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    style={{ marginTop: "1rem" }}
                  >
                    Continue
                  </Button>
                </Grid>
              </form>
            </CardContent>
          </>
        )}
      </Formik>
    </Card>
  );
};

export default Disclaimer;
