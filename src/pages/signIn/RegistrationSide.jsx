import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Link,
  TextField,
} from '@mui/joy'
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Image from "../../assets/images/hole-std-bckgrd.jpg";

export default function RegistrationSide() {

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      email: user.email,
    };
    try {
      // const response = await serviceLayer.registerUser(data);
      // console.log(response);
      // setUser({
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      //   username: data.username,
      //   password: data.password,
      //   email: data.email,
      // phoneNumber: data.phoneNumber,

      // });
      // if (response.data.token !== null) {
      //   window.location.href = "/login";
      // }
    } catch (ex) {
      console.log("Error in API call", ex.response.data);
    }
  }

  const onChangeFirstName = (e) => {
    setUser({
      ...user,
      firstName: e.target.value,
    });
  };

  const onChangeLastName = (e) => {
    setUser({
      ...user,
      lastName: e.target.value,
    });
  };

  const onChangeEmail = (e) => {
    setUser({
      ...user,
      email: e.target.value,
    });
  };

  const onChangeUsername = (e) => {
    setUser({
      ...user,
      username: e.target.value,
    });
  };

  const onChangePassword = (e) => {
    setUser({
      ...user,
      password: e.target.value,
    });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
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
            Registration
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2} >
              <Grid item xs={6}>
                <TextField
                  variant="solid"
                  margin="normal"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  name="fname"
                  value={user.firstName}
                  onChange={onChangeFirstName}
                  autoComplete="fname"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="solid"
                  margin="normal"
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  value={user.lastName}
                  onChange={onChangeLastName}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="solid"
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label="UserName"
                  name="userName"
                  value={user.userName}
                  onChange={onChangeUsername}
                  autoComplete="userName"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="solid"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={onChangePassword}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="solid"
                  margin="normal"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={onChangeEmail}
                  autoComplete="email"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="solid"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link component={RouterLink} to={"/login"} >
                  <Typography variant="body2" color="secondary">
                    Already have an account? Sign In
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
