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
  const { orderId } = useParams();
  let navigate = useNavigate();
  const [file, setFile] = useState("");
  const [productList, setProductList] = useState([]);
  const [userList, setUserList] = useState([]);
  // console.log(file);
  const [initialValues, setInitialValues] = useState({
    tracking_id: "",
    product_uuid: "",
    user_uuid: "",
    date: "",
    qty: "",
    price_qty: "",
    total: "",
    status: "",
  });

  console.log(initialValues);

  const getProductList = () => {
    Axios.get(`${API_URL}/product/all`)
      .then((response) => {
        // console.log(response.data.data);
        setProductList(response.data.data);
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      });
  };

  const getUserList = () => {
    Axios.get(`${API_URL}/user/all`)
      .then((response) => {
        // console.log(response.data.data);
        setUserList(response.data.data);
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      });
  };

  useEffect(() => {
    orderId &&
      Axios.get(`${API_URL}/order/single/${orderId}`)
        .then((response) => {
          const apiData = response.data.data;
          setInitialValues((prevState) => {
            const date = new Date(apiData.date);
            console.log(
              `${date.getFullYear()}-${
                date.getMonth() + 1 < 10
                  ? `0${date.getMonth() + 1}`
                  : date.getMonth() + 1
              }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
            );
            return {
              tracking_id: apiData.tracking_id,
              product_uuid: apiData.product_uuid,
              user_uuid: apiData.user_uuid,
              date: `${date.getFullYear()}-${
                date.getMonth() + 1 < 10
                  ? `0${date.getMonth() + 1}`
                  : date.getMonth() + 1
              }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`,
              qty: apiData.qty,
              status: apiData.status,
              price_qty: apiData.price_qty,
              total: apiData.total,
              status: apiData.status,
            };
          });
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something Wrong");
          }
          navigate("/orders");
        });
  }, [orderId]);

  useEffect(() => {
    getProductList();
    getUserList();
  }, []);

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
                // kalau order id dari params nya kosong maka arahkan submit data ke create new order
                if (!orderId) {
                  Axios.post(`${API_URL}/order/create`, values)
                    .then((response) => {
                      toast.success(response.data.message);
                      navigate(`/orders/${response.data.data.uuid}`);
                    })
                    .catch((error) => {
                      toast.error(error.response.data.message);
                    });
                } else {
                  Axios.put(`${API_URL}/order/update/${orderId}`, values)
                    .then((response) => {
                      toast.success(response.data.message);
                      navigate(`/orders/${orderId}`);
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
                          <label>Tracking ID</label>
                          <input
                            name="tracking_id"
                            type="number"
                            placeholder="tracking id"
                            onChange={(e) => {
                              // console.log(e.target.value);
                              setFieldValue("tracking_id", e.target.value);
                            }}
                            value={values.tracking_id}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Tanggal Order</label>
                          <input
                            name="date"
                            type="date"
                            value={values.date}
                            onChange={(e) => {
                              // console.log(e.target.value);
                              setFieldValue("date", e.target.value);
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>User</label>
                          <select
                            onChange={(e) => {
                              setFieldValue("user_uuid", e.target.value);
                            }}
                            value={values.user_uuid}
                          >
                            <option value="">Pilih User</option>
                            {userList.map((item) => {
                              return (
                                <option value={item.uuid}>
                                  {item.firstName} {item.lastName}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Product</label>
                          <select
                            onChange={(e) => {
                              setFieldValue("product_uuid", e.target.value);
                              if (e.target.value) {
                                const selectedProduct = productList.find(
                                  (item) => item.uuid === e.target.value
                                );
                                setFieldValue(
                                  "price_qty",
                                  selectedProduct.price
                                );
                              } else {
                                setFieldValue("price_qty", "");
                              }
                            }}
                            value={values.product_uuid}
                          >
                            <option value="">Pilih Product</option>
                            {productList.map((item) => {
                              return (
                                <option value={item.uuid}>
                                  {item.product}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Harga Satuan</label>
                          <input
                            name="price_qty"
                            type="number"
                            placeholder="0"
                            value={values.price_qty}
                            disabled={true}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Harga Satuan</label>
                          <input
                            name="qty"
                            type="number"
                            placeholder="0"
                            onChange={(e) => {
                              // console.log(e.target.value);
                              setFieldValue("qty", e.target.value);

                              if (e.target.value) {
                                setFieldValue(
                                  "total",
                                  e.target.value * values.price_qty
                                );
                              } else {
                                setFieldValue("total", "");
                              }
                            }}
                            value={values.qty}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <div className="formInput">
                          <label>Harga Total</label>
                          <input
                            name="total"
                            type="number"
                            placeholder="0"
                            value={values.total}
                            disabled={true}
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
                            onChange={(e) => {
                              // console.log(e.target.value);
                              setFieldValue("status", e.target.value);
                            }}
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
