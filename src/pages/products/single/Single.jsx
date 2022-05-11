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
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    uuid: "",
    product: "",
    img_url: "",
    price: "",
  });

  useEffect(() => {
    Axios.get(`${API_URL}/product/single/${productId}`)
      .then((response) => {
        const apiData = response.data.data;
        setProduct({
          product: apiData.product,
          img_url: apiData.img_url,
          price: apiData.price,
          uuid: apiData.uuid,
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
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to={`/products/edit/${product.uuid}`}>
              <div
                // onClick={() => navigate(`/products/edit/${product.uuid}`)}
                className="editButton"
              >
                Edit
              </div>
            </Link>
            <div className="title">Product Detail</div>
            <div className="item">
              <img src={product.img_url} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{product.product}</h1>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{product.price}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="Product Spending ( Last 6 Months )" />
          </div> */}
        </div>
        {/* <div className="bottom">
          <div className="title">Past Transaction</div>
          <List />
        </div> */}
      </div>
    </div>
  );
}

export default Single;
