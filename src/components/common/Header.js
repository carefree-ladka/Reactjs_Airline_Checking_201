import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  Button
} from "@material-ui/core";
import { logout } from "../../redux/actions/authAction";
import HomeIcon from "@material-ui/icons/Home";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "black"
  },
  title: {
    flexGrow: 1
  }
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = localStorage.getItem("role");

  const SignOut = () => {
    dispatch(logout(localStorage.removeItem("role")));
    history.replace("/signin");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavLink
            to="/dashboard"
            activeClassName="selected"
            activeStyle={{
              color: "red"
            }}
          >
            <IconButton
              size="small"
              edge="start"
              className={classes.menuButton}
              arial-label="menu"
            >
              <HomeIcon className="header__btn" />
              Home
            </IconButton>
          </NavLink>
          <Typography variant="subttitle 2" className={classes.title}>
            <div className="headerTitle">Airline Check-in System</div>
          </Typography>
          {user ? (
            <Button color="inherit" onClick={SignOut} variant="outlined">
              Logout
            </Button>
          ) : (
            <Button color="inherit" variant="outlined">
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
