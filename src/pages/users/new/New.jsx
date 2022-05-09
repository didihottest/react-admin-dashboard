import React, { useState, useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from "axios";
import { API_URL } from "../../../config/url";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function New({ inputs, title }) {
  const { userId } = useParams();
  let navigate = useNavigate();
  console.log(userId);
  const [file, setFile] = useState("");
  // console.log(file);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    age: "",
    status: "active",
    phone: "",
    address: "",
    country: "",
  });

  useEffect(() => {
    Axios.get(`${API_URL}/user/single/${userId}`).then((response) => {
      const apiData = response.data.data;
      setInitialValues((prevState) => {
        return {
          firstName: apiData.firstName,
          lastName: apiData.lastName,
          email: apiData.email,
          avatar: apiData.avatar,
          age: apiData.age,
          status: apiData.status,
          phone: apiData.phone,
          address: apiData.address,
          country: apiData.country,
        };
      });
    });
  }, [userId]);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <Formik
              initialValues={initialValues}
              // supaya ketika ada perubahan initial value, initial valuenya ikut berubah
              enableReinitialize={true}
              // validate={(values) => {
              //   const errors = {};
              //   if (!values.email) {
              //     errors.email = "Required";
              //   } else if (
              //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              //   ) {
              //     errors.email = "Invalid email address";
              //   }
              //   return errors;
              // }}
              onSubmit={(values) => {
                // kalau user id dari params nya kosong maka arahkan submit data ke create new user
                if (!userId) {
                  Axios.post(`${API_URL}/user/create`, values)
                    .then((response) => {
                      toast.success(response.data.message);
                      navigate(`/users/${response.data.data.uuid}`);
                    })
                    .catch((error) => {
                      toast.error(error.response.data.message);
                    });
                } else {
                  Axios.put(`${API_URL}/user/update/${userId}`, values)
                    .then((response) => {
                      toast.success(response.data.message);
                    })
                    .catch((error) => {
                      toast.error(error.response.data.message);
                    });
                }
              }}
            >
              {({
                values,
                errors,
                handleSubmit,
                setFieldValue,
                handleChange,

                /* and other goodies */
              }) => (
                <form>
                  {/* {console.log(values)} */}
                  <Box>
                    {/* grid container =  <div className="row"></div> di bootstrap */}
                    <Grid container spacing={2}>
                      {/* grid item  = col-lg-6 */}
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>First Name</label>
                          <input
                            name="firstName"
                            type="text"
                            placeholder="John"
                            onChange={(e) => {
                              // console.log(e.target.value);
                              setFieldValue("firstName", e.target.value);
                            }}
                            value={values.firstName}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Last Name</label>
                          <input
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                            onChange={handleChange}
                            value={values.lastName}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Email</label>
                          <input
                            name="email"
                            type="text"
                            placeholder="johndoe@email.com"
                            onChange={handleChange}
                            value={values.email}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Avatar</label>
                          <input
                            name="avatar"
                            type="text"
                            placeholder="http://www.imageurl.com"
                            onChange={handleChange}
                            value={values.avatar}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Age</label>
                          <input
                            name="age"
                            type="number"
                            placeholder="23"
                            onChange={handleChange}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Phone</label>
                          <input
                            name="phone"
                            type="text"
                            placeholder="+62 123 123"
                            value={values.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Address</label>
                          <input
                            name="address"
                            type="text"
                            placeholder="Jl. Palsu, Jakarta Barat"
                            value={values.address}
                            onChange={handleChange}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Country</label>
                          <input
                            name="country"
                            type="text"
                            placeholder="Indonesia"
                            onChange={handleChange}
                            value={values.country}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Status</label>
                          <input
                            name="status"
                            type="text"
                            placeholder="status"
                            onChange={handleChange}
                            value={values.status}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                  {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </div> */}
                  <div>
                    <button type="button" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
