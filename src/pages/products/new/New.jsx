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
  const { productId } = useParams();
  let navigate = useNavigate();
  const [file, setFile] = useState("");
  // console.log(file);
  const [initialValues, setInitialValues] = useState({
    product: "",
    img_url: "",
    price: "",
  });

  useEffect(() => {
    // lakukan proses get axios hanya ketika product id nya true atau tidak null
    productId &&
      Axios.get(`${API_URL}/product/single/${productId}`)
        .then((response) => {
          const apiData = response.data.data;
          setInitialValues((prevState) => {
            return {
              product: apiData.product,
              img_url: apiData.img_url,
              price: apiData.price,
            };
          });
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something Wrong");
          }
          navigate("/products");
        });
  }, [productId]);

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
                // kalau product id dari params nya kosong maka arahkan submit data ke create new product
                if (!productId) {
                  Axios.post(`${API_URL}/product/create`, values)
                    .then((response) => {
                      toast.success(response.data.message);
                      navigate(`/products/${response.data.data.uuid}`);
                    })
                    .catch((error) => {
                      toast.error(error.response.data.message);
                    });
                } else {
                  Axios.put(`${API_URL}/product/update/${productId}`, values)
                    .then((response) => {
                      toast.success(response.data.message);
                      navigate(`/products/${productId}`);
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
                          <label>Product Name</label>
                          <input
                            name="product"
                            type="text"
                            placeholder="Product Name"
                            onChange={(e) => {
                              // console.log(e.target.value);
                              setFieldValue("product", e.target.value);
                            }}
                            value={values.product}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Image URL</label>
                          <input
                            name="img_url"
                            type="text"
                            placeholder="http://www.imageurl.com"
                            onChange={handleChange}
                            value={values.img_url}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Price</label>
                          <input
                            name="price"
                            type="text"
                            placeholder="Doe"
                            onChange={handleChange}
                            value={values.price}
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
