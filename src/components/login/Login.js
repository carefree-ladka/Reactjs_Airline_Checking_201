import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Container,
  makeStyles,
  Typography,
  Box
} from "@material-ui/core";
import { login } from "../../redux/actions/authAction";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";

const responseGoogle = (response) => {
  console.log(response);
};

const CopyRight = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://reactjs.org/">
        React Airline 2021
      </Link>{" "}
      {new Date().getFullYear}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignInPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  const [state, setState] = useState({
    username: ""
  });

  //single handleChange for email & password
  function handleChange(event) {
    const input = event.target;
    setState({ [input.name]: input.value });
  }

  function handleSignIn(event) {
    event.preventDefault();
    const { username } = state;

    if (username === "admin" || username === "staff") {
      dispatch(login(localStorage.setItem("role", username)));
      history.replace("/dashboard");
    } else {
      localStorage.clear();
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSignIn} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={state.username}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!state.username}
          >
            Sign In
          </Button>
        </form>
        <GoogleLogin
          //create your client id on console.developer.google.com
          clientId="377525080701-66efhqffcb1uhbi5dqtt8lvkf8vsqinp.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          width="100%"
        ></GoogleLogin>
      </div>
      <Box mt={8}>
        <CopyRight />
      </Box>
    </Container>
  );
};

export default SignInPage;
