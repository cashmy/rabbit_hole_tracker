import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Link,
  TextField,
} from '@mui/joy'

// import Avatar from "@mui/material/Avatar";
// import Box from '@mui/material/Box';
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Image from "../../assets/images/hole-std-bckgrd.jpg";



export default function SignInSide() {

  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  // const [user, setUser] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: userLogin.username,
      password: userLogin.password,
    };
    try {
      // const response = await ServiceLayer.userLogin(data);
      // console.log(response);
      console.log("simulated access to user info");
      // if (response.data.token !== null) {
      //   let token = response.data.token;
      //   window.localStorage.setItem("token", token);
      //   setUserLogin({
      //     username: data.username,
      //     password: data.password,
      //   });
      //   const jwt = localStorage.getItem("token");
      //   const userInfo = jwtDecode(jwt);
      //   setUser(userInfo);


    } catch (ex) {
      console.log("** Ensure your server is running!! **");
      console.log("Error in API call", ex);
      alert("Incorrect Username or Password. Try again.");
    }
  }

  const onChangeUsername = (e) => {
    setUserLogin({
      ...userLogin,
      username: e.target.value,
    });
  };

  const onChangePassword = (e) => {
    setUserLogin({
      ...userLogin,
      password: e.target.value,
    });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar color="info" variant="solid" sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              variant="solid"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={userLogin.username}
              onChange={onChangeUsername}
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="solid"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={userLogin.password}
              onChange={onChangePassword}
              autoComplete="current-password"
            />
            <Checkbox 
              label="Remember me" 
              variant="solid"
              sx={{ mt: 2 }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="solid"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#">
                  <Typography variant="body2" color="secondary">
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={"/registration"}>
                  <Typography variant="body2" color="secondary">
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
