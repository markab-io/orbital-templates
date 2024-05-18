import React, { ReactNode, useState } from "react";
import classNames from "classnames";
import MenuIcon from "@mui/icons-material/Menu";
import { Routes } from "./Routes";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Drawer,
  Paper,
  Grid,
  Chip,
  Icon,
} from "@mui/material";
import { RouteComponentProps } from "react-router-dom";
import { WithStyles } from "@mui/styles";

interface Route {
  name: string;
  url: string;
  icon?: string;
  type?: string;
}

interface MainWrapperProps
  extends RouteComponentProps {
  classes: any;
  children: ReactNode;
  auth: boolean;
  user: any; // Define a more specific type based on your application
  logo: string;
  onLogout: () => void;
  routeList: Route[];
  drawerRouteList: Route[];
  brand: string;
  isTabMenu: boolean;
  isTagMenu: boolean;
  tags: string[];
  tabMenuPosition: "top" | "bottom";
  onDrawerRouteClick: (route: string) => void;
  onRouteClick: (route: string) => void;
  selectedRoute: number;
  hideDrawer: boolean;
  hideAppBar: boolean;
  render?: (props: MainWrapperProps) => ReactNode;
  length: number[];
}

const MainWrapper: React.FC<MainWrapperProps> = (props) => {
  const {
    children,
    location,
    match,
    history,
    auth,
    user,
    logo,
    onLogout,
    routeList,
    drawerRouteList,
    brand,
    isTabMenu,
    isTagMenu,
    tags,
    tabMenuPosition,
    onDrawerRouteClick,
    onRouteClick,
    selectedRoute,
    hideDrawer,
    hideAppBar,
    render,
    length,
    classes,
  } = props;

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [title, setTitle] = useState("");
  const [route, setRoute] = useState(0);

  const isAnchor = Boolean(anchorEl);

  const currentRoute =
    selectedRoute !== undefined
      ? selectedRoute
      : routeList.findIndex((r) => location.pathname.includes(r.url));

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        {isTagMenu && (
          <AppBar
            style={{
              bottom: tabMenuPosition === "top" ? "auto" : 0,
              top: tabMenuPosition === "top" ? 0 : "auto",
              backgroundColor: "white",
            }}
            className={classes.tabMenu}
          >
            <Grid container justifyContent="flex-start">
              {routeList.map((route, index) => (
                <Grid item key={index}>
                  <Chip
                    label={route.name}
                    id={route.name}
                    className={
                      tags.includes(route.name)
                        ? classes.chip__selected
                        : classes.chip
                    }
                    onClick={() => onRouteClick(route.name)}
                  />
                </Grid>
              ))}
            </Grid>
          </AppBar>
        )}
        {isTabMenu && (
          <Paper
            style={{
              bottom: tabMenuPosition === "top" ? "auto" : 0,
              top: tabMenuPosition === "top" ? 0 : "auto",
              backgroundColor: "white",
            }}
            className={classes.tabMenu}
          >
            <Tabs
              value={currentRoute || 0}
              onChange={(event, route) => {
                onRouteClick
                  ? onRouteClick(routeList[route].url)
                  : history.push(`${match.path}${routeList[route].url}`);
              }}
              style={{ color: "black" }}
              variant="scrollable"
              indicatorColor="primary"
              textColor="secondary"
              aria-label="scrollable force tabs example"
            >
              {routeList.map((route, index) => (
                <Tab
                  label={route.name.replace(
                    "${length}",
                    length && length[index] ? String(length[index]) : "0"
                  )}
                  icon={<Icon>{route.icon}</Icon>}
                  key={index}
                  className={
                    tabMenuPosition === "top"
                      ? route.type === "button"
                        ? classes.buttonListItem
                        : classes.listItem
                      : classes.tagTab
                  }
                />
              ))}
            </Tabs>
          </Paper>
        )}
        {!hideAppBar && (
          <AppBar className={classes.menu}>
            <Toolbar className={classes.toolbar}>
              <Grid container justifyContent="flex-start" alignItems="center">
                {!hideDrawer && (
                  <Grid item>
                    <IconButton
                      aria-label="Open drawer"
                      onClick={() => setOpen(true)}
                      className={classNames(
                        classes.menuButton,
                        open && classes.menuButtonHidden
                      )}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                )}
                <Grid item>
                  <img src={logo} width="80px" height="45px" alt="Logo" />
                </Grid>
                {/* <Grid item>
                  <Typography variant="h6" noWrap className={classes.title}>
                    {brand
                      ? brand
                      : (routeList[currentRoute] &&
                          routeList[currentRoute].name) ||
                        routeList[0].name}
                  </Typography>
                </Grid> */}
                <Grid style={{ marginLeft: "auto" }} item>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    keepMounted
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    open={isAnchor}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem
                      onClick={() => {
                        setMenuOpen(false);
                        onRouteClick
                          ? onRouteClick("/settings")
                          : history.push(`${match.path}settings`);
                      }}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setMenuOpen(false);
                        onRouteClick
                          ? onRouteClick("logout")
                          : history.push(`${match.path}auth/login`);
                      }}
                    >
                      Log out
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        )}
        <Drawer
          className={classes.menu}
          open={open}
          onClose={() => setOpen(false)}
        >
          <Routes
            currentRoute={currentRoute || 0}
            classes={classes}
            routeList={drawerRouteList ? drawerRouteList : routeList}
            onClick={(route) => {
              setOpen(false);
              if (onDrawerRouteClick) {
                return onDrawerRouteClick(route.url);
              }
              onRouteClick
                ? onRouteClick(route.url)
                : history.push(`${match.path}${route.url}`);
            }}
          />
        </Drawer>
        <main className={`${classes.hasPadding} ${classes.content}`}>
          {render ? render(props) : children}
        </main>
      </div>
    </>
  );
};

export default MainWrapper;
