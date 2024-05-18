import { Theme } from '@mui/material';

interface Styles {
  root: {
    display: "flex";
    flexWrap: "wrap";
  };
  layout: {
    width: "auto";
    display: "block"; // Fix IE11 issue.
    marginLeft: number;
    marginRight: number;
    [key: string]: unknown; // Allow additional breakpoints
  };
  textField: {
    margin: string;
  };
  formControl: {
    margin: number;
    minWidth: number;
  };
  selectEmpty: {
    marginTop: number;
  };
  header: {
    display: "flex";
    alignItems: "center";
    height: number;
    paddingLeft: number;
    backgroundColor: string;
  };
  img: {
    height: number;
    maxWidth: number;
    overflow: "hidden";
    display: "block";
    width: "100%";
  };
  chipTextField: {
    color: string;
    display: "inline-flex";
    alignItems: "center";
    whiteSpace: "nowrap";
    borderRadius: string;
    verticalAlign: "middle";
    justifyContent: "center";
    textDecoration: "none";
    backgroundColor: string;
  };
}

export const styles: (theme: Theme) => Styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: .1,
    marginRight: .1
  },
  textField: {
    margin: "1em 0"
  },
  formControl: {
    margin: .1,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: .2
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: .2,
    backgroundColor: theme && theme.palette.background.default
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: "hidden",
    display: "block",
    width: "100%"
  },
  chipTextField: {
    color: "rgba(0, 0, 0, 0.87)",
    display: "inline-flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    borderRadius: "16px",
    verticalAlign: "middle",
    justifyContent: "center",
    textDecoration: "none",
    backgroundColor: "#e0e0e0"
  }
});
