import React, { useState, useEffect } from "react";
import Chart from "../../../components/chart/Chart";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import List from "../../../components/table/Table";
import "./single.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../config/url";
import { toast } from "react-toastify";

function Single() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    uuid: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: "http://defaultimage.com/image.jpg",
    age: "",
    status: "",
    phone: "",
    address: "",
    country: "",
  });

  useEffect(() => {
    orderId &&
      Axios.get(`${API_URL}/order/single/${orderId}`)
        .then((response) => {
          const apiData = response.data.data;
          setOrder({
            firstName: apiData.firstName,
            lastName: apiData.lastName,
            email: apiData.email,
            avatar: apiData.avatar,
            age: apiData.age,
            status: apiData.status,
            phone: apiData.phone,
            address: apiData.address,
            country: apiData.country,
            uuid: apiData.uuid,
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
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to={`/orders/edit/${order.uuid}`}>
              <div
                // onClick={() => navigate(`/orders/edit/${order.uuid}`)}
                className="editButton"
              >
                Edit
              </div>
            </Link>
            <div className="title">Information</div>
            <div className="item">
              <img src={order.avatar} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">
                  {order.firstName} {order.lastName}
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{order.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{order.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{order.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{order.country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Order Spending ( Last 6 Months )" />
          </div>
        </div>
        <div className="bottom">
          <div className="title">Past Transaction</div>
          <List />
        </div>
      </div>
    </div>
  );
}

export default Single;
