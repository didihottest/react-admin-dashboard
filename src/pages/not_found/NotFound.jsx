import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MaterialLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik } from "formik";
import Axios from "axios";
import { API_URL } from "../../config/url";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MaterialLink color="inherit" href="https://mui.com/">
        Your Website
      </MaterialLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        password: "",
        email: "",
      }}
      // validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
        Axios.post(`${API_URL}/auth/login`, values)
          .then((response) => {
            // console.log(response);
            localStorage.setItem("auth", JSON.stringify(response.data.data));
            navigate("/");
            toast.success("You Are Logged In, Welcome");
          })
          .catch((error) => {
            if (error.response) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Cannot Connect to Server");
            }
            console.log(error);
          });
      }}
    >
      {({ handleSubmit, handleChange }) => (
        <Form>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h1>404 Your Page Is Not Found</h1>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>
        </Form>
      )}
    </Formik>
  );
}
