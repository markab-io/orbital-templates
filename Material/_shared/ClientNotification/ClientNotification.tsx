import React from "react";
import classNames from "classnames";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { green, amber } from "@mui/material/colors";
import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

interface Notification {
  id: number;
  message: string;
  type: "success" | "warning" | "error" | "info";
  deleted?: boolean;
}

interface CustomizedSnackbarsProps {
  notifications: Notification[];
  handleClose: (
    event: Event | React.SyntheticEvent,
    reason: string,
    notification: Notification
  ) => void;
}

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles<Theme>((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  info: {
    backgroundColor: theme.palette.secondary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}));

interface MySnackbarContentProps {
  className?: string;
  message: React.ReactNode;
  onClose: () => void;
  variant: "success" | "warning" | "error" | "info";
}

const MySnackbarContent: React.FC<MySnackbarContentProps> = (props) => {
  const classes = useStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <span className="material-icons">close</span>
        </IconButton>,
      ]}
      {...other}
    />
  );
};

const CustomizedSnackbars: React.FC<CustomizedSnackbarsProps> = ({
  notifications,
  handleClose,
}) => {
  return (
    <div>
      {notifications.map((notification) =>
        !notification.deleted ? (
          <Snackbar
            key={notification.id}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            autoHideDuration={6000}
            open={true}
            onClose={(event, reason) =>
              handleClose(event, reason, notification)
            }
          >
            <MySnackbarContent
              onClose={() => {
                console.log("ON CLOSE");
              }}
              variant={notification.type}
              message={notification.message}
            />
          </Snackbar>
        ) : null
      )}
    </div>
  );
};

export default CustomizedSnackbars;
