import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useForm from "../hooks/forman/forman";
import type { FinalObject } from "../hooks/forman/forman.types";
import "../App.css";

export default function FormMaterial() {
  const initialValues = {
    email: "aliam@gmail.com",
    password: "password"
  };

  const { handleSubmit, register } = useForm(initialValues);

  const submit = (values: FinalObject) => {
    console.log(values);
  };

  return (
    <Container sx={{ width: 690 }} className="form-wrapper">
      <CssBaseline />
      <Box onSubmit={handleSubmit(submit)} component="form" sx={{ margin: 0 }}>
        <Grid container spacing={2}>
          <Typography component="h1" variant="h5">
            Material ui
          </Typography>
          <Grid item md={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...register("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              {...register("password")}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          submit
        </Button>
      </Box>
    </Container>
  );
}
