import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { CssBaseline, Typography, Button, Card, CardHeader, CardContent, Grid, Theme } from "@mui/material";
import queryString from "query-string";

const useStyles = makeStyles<Theme>((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  top30: {
    marginTop: theme.spacing(3),
  },
  bold: {
    fontWeight: "bold",
  },
  top10: {
    marginTop: theme.spacing(1),
  },
  top20: {
    marginTop: theme.spacing(2),
  },
}));

interface EmailConfirmationProps {
  location: {
    search: string;
  };
  onDone: () => void;
  confirmEmail: ({ email, token }: { email: string; token: string }) => Promise<void>;
}

const EmailConfirmation: React.FC<EmailConfirmationProps> = ({ location, onDone, confirmEmail }) => {
  const classes = useStyles();
  const { token, email } = queryString.parse(location.search) as { token: string; email: string };
  const [confirmed, setConfirmed] = useState(false);
  const [err, setErr] = useState<string | undefined>();

  useEffect(() => {
    confirmEmail({ email, token })
      .then(() => {
        setConfirmed(true);
      })
      .catch((error) => {
        setErr(error.message);
      });
  }, [confirmEmail, email, token]);

  return (
    <>
      <CssBaseline />
      <Card className={classes.layout}>
        <CardHeader
          className={classes.top30}
          component={() => (
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Typography className={classes.bold} variant="h5">
                Confirmation
              </Typography>
            </Grid>
          )}
        />
        <CardContent>
          <Grid container alignItems="center" justifyContent="center" className={classes.top10}>
            <Grid item>
              <Typography variant="h6">
                {confirmed
                  ? "Your email has been confirmed"
                  : err
                  ? `Error: ${err}`
                  : "Confirming your email..."}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" className={classes.top20}>
            <Grid item>
              <Button variant="outlined" color="secondary" onClick={onDone}>
                Back to App
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default EmailConfirmation;
