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

interface Field {
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
}

interface Form {
  fields: Field[];
}

interface NotificationsProps {
  onChange: (event: React.ChangeEvent<any>) => void;
  onSubmit: (values: any) => void;
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

const form: Form = {
  fields: [
    {
      type: "checkbox",
      name: "hasEnabledNotification",
      placeholder: "Enable Notifications?",
      required: true,
    },
  ],
};

export const Notifications: React.FC<NotificationsProps> = ({
  onSuccess,
  classes,
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
                <Icon>legal</Icon>
              </Avatar>
            )}
            <Typography style={{ textAlign: "center", fontWeight: "bold" }} variant="h5">
              Notifications
            </Typography>
          </Grid>
        )}
      />
      <Formik
        initialValues={{ hasEnabledNotification: true }}
        onSubmit={(values, actions) => {
          onSuccess(values);
          actions.setSubmitting(false);
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
          ...rest
        }) => (
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Forms
                form={form}
                errors={errors}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                values={values}
                touched={touched}
                isSubmitting={isSubmitting}
                {...rest}
              />
              <Grid container direction="column">
                <Button color="secondary" variant="contained" onClick={handleSubmit}>
                  Next
                </Button>
              </Grid>
            </form>
          </CardContent>
        )}
      </Formik>
    </Card>
  );
};

export default Notifications;
