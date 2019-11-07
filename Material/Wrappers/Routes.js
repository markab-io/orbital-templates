import React from "react";
import { ListItem, ListItemText, Icon } from "@material-ui/core";

export const Routes = ({ onClick, currentRoute, routeList }) => {
  return (
    <React.Fragment>
      {routeList.map((route, index) => {
        return (
          <ListItem
            style={{ borderRadius: "50px" }}
            selected={index === currentRoute}
            key={index}
            onClick={event => (!route.external ? onClick(route) : "")}
            button
          >
            <Icon>{route.icon}</Icon>
            {!route.external ? (
              <ListItemText primary={route.name} />
            ) : (
              <a href={route.url} target="_blank">
                <ListItemText primary={route.name} />
              </a>
            )}
          </ListItem>
        );
      })}
    </React.Fragment>
  );
};
