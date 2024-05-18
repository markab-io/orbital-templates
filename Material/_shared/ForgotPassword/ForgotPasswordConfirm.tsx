import React from "react";
import { makeStyles } from "@mui/styles";
import { CssBaseline, Typography, Button, Card, CardHeader, CardContent, Grid } from "@mui/material";
import theme from "theme";

const useStyles = makeStyles({
  layout: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
    position: "relative",
    top: "7em",
  },
  bold: {
    fontWeight: "bold",
  },
  top20: {
    marginTop: theme.spacing(2),
  },
});

interface ForgotPasswordConfirmProps {
  onDone: () => void;
}

const ForgotPasswordConfirm: React.FC<ForgotPasswordConfirmProps> = ({ onDone }) => {
  const classes = useStyles();

  return (
    <>
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
          <Grid container alignContent="center" alignItems="center" justifyContent="center">
            <Grid item>
              <Typography variant="h5">Check your email for a password reset email</Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignContent="center" alignItems="center">
            <Grid item>
              <Button className={classes.top20} variant="outlined" color="secondary" onClick={onDone}>
                Home
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ForgotPasswordConfirm;
