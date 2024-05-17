import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

interface Route {
  name: string;
  url: string;
  icon?: React.ReactNode;
  type?: string;
  external?: boolean;
}

interface RoutesProps {
  onClick: (route: Route) => void;
  currentRoute: number;
  routeList: Route[];
  classes: { [key: string]: string };
}

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      // Add your styles here
    },
    buttonListItem: {
      // Add your styles here
    },
  })
);

const Icon: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ children, style }) => {
  return (
    <i className="material-icons" style={style}>
      {children}
    </i>
  );
};

export const Routes: React.FC<RoutesProps> = ({ onClick, currentRoute, routeList, classes }) => {
  return (
    <React.Fragment>
      {routeList.map((route, index) => (
        <ListItem
          style={{ borderRadius: "50px" }}
          selected={index === currentRoute}
          key={index}
          onClick={() => !route.external && onClick(route)}
          component={route.type === "button" ? "button" : "a"}
          className={
            route.type === "button" ? classes.buttonListItem : classes.listItem
          }
        >
          <>
            <Icon style={{ marginRight: "10px" }} />
            {!route.external ? (
              <ListItemText primary={route.name} />
            ) : (
              <a href={route.url} target="_blank" rel="noopener noreferrer">
                <ListItemText primary={route.name} />
              </a>
            )}
          </>
        </ListItem>
      ))}
    </React.Fragment>
  );
};
