import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, Grid, Paper, Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import FlightIcon from "@material-ui/icons/Flight";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const DashboardPage = () => {
  const classes = useStyles();
  const role = localStorage.getItem("role");
  return (
    <div className={classes.root}>
      {role === "admin" && (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <NavLink to="/passenger">
                <Button
                  startIcon={<PersonIcon />}
                  variant="contained"
                  color="secondary"
                >
                  Manage Passenger
                </Button>
              </NavLink>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <NavLink to="/ancillary">
                <Button
                  startIcon={<FlightIcon />}
                  variant="contained"
                  color="secondary"
                >
                  Manage anciallry service per flight
                </Button>
              </NavLink>
            </Paper>
          </Grid>
        </Grid>
      )}
      {role === "staff" && (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <NavLink to="/checking">
                <Button
                  startIcon={<PersonIcon />}
                  variant="contained"
                  color="secondary"
                >
                  Check-in
                </Button>
              </NavLink>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <NavLink to="/inflight">
                <Button
                  startIcon={<FlightIcon />}
                  variant="contained"
                  color="secondary"
                >
                  In flight
                </Button>
              </NavLink>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DashboardPage;
