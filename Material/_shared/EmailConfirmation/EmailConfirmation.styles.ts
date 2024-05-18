import { Theme } from "@mui/material/styles";

const useStyles = (theme: Theme) => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    position: "relative",
    top: "7em",
  },
  paper: {
    paddingTop: "1em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

export default useStyles;
