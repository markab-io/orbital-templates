import React from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import theme from "theme";
import { styles } from "./Loading.styles";

interface ErrorObject {
  message: string;
  stack?: string;
}

interface LoadingProps {
  logo?: string;
  title?: string;
  err?: {
    error: ErrorObject;
  };
}

const Loading: React.FC<LoadingProps> = ({ logo, title, err }) => {
  return (
    <React.Fragment>
      <Grid container justifyContent="center">
        <Grid item>
          {logo ? (
            <img className="loading" width="200px" height="auto" src={logo} alt="Loading logo" />
          ) : (
            <CircularProgress color="primary" />
          )}
        </Grid>
        {err && err.error && (
          <Grid item>
            {err.error.message}:{err.error.stack}
          </Grid>
        )}
      </Grid>
      <Typography
        variant="h3"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {title}
      </Typography>
    </React.Fragment>
  );
}

export default Loading;
