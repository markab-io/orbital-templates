/**
 * Renders the component for displaying a confirmation message after resetting the password.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.classes - The CSS classes injected by the withStyles higher-order component.
 * @param {Function} props.onDone - The callback function to be called when the password reset is done.
 * @param {Object} props.history - The history object provided by React Router.
 * @returns {JSX.Element} The JSX element representing the ResetPasswordConfirmation component.
 */

import React from "react";
import { withStyles, WithStyles } from "@mui/styles";
import theme from "theme";
import { styles } from "./ResetPassword.styles";
import { Typography, Grid } from "@mui/material";

interface ResetPasswordConfirmationProps extends WithStyles<typeof styles> {
  onDone: () => void;
  history: any; // Define a specific type if available
}

const ResetPasswordConfirmation: React.FC<ResetPasswordConfirmationProps> = ({ classes, onDone, history }) => {
  return (
    <React.Fragment>
      <Grid container alignContent="center" alignItems="center" justifyContent="center">
        <Grid item>
          <Typography variant="h5">
            Your password has been reset!
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles, { defaultTheme: theme })(ResetPasswordConfirmation);
