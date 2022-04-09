import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import "./widget.scss";
function Widget({ type }) {
  let data = {
    title: "",
    isMoney: false,
    link: "",
    icon: <></>,
  };

  switch (type) {
    case "user":
      data.title = "USERS";
      data.isMoney = false;
      data.link = "View all users";
      data.icon = (
        <PersonOutlineIcon
          className="icon"
          style={{ color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2 )" }}
        />
      );
      break;
    case "order":
      data.title = "ORDERS";
      data.isMoney = false;
      data.link = "View all orders";
      data.icon = (
        <ShoppingCartOutlinedIcon
          className="icon"
          style={{
            color: "goldenrod",
            backgroundColor: "rgba(218, 165, 32, 0.2 )",
          }}
        />
      );
      break;
    case "earning":
      data.title = "EARNINGS";
      data.isMoney = true;
      data.link = "View all earnings";
      data.icon = (
        <MonetizationOnOutlinedIcon
          className="icon"
          style={{
            color: "green",
            backgroundColor: "rgba(0, 128, 0, 0.2 )",
          }}
        />
      );
      break;
    case "balance":
      data.title = "BALANCE";
      data.isMoney = true;
      data.link = "View all balance";
      data.icon = (
        <AccountBalanceOutlinedIcon
          className="icon"
          style={{
            color: "purple",
            backgroundColor: "rgba(128, 0, 128, 0.2 )",
          }}
        />
      );
      break;

    default:
      break;
  }

  const amount = 200;
  const diff = 20;
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {/* ketika is money true render tulisan dolar */}
          {data.isMoney && "$"}
          {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
}

export default Widget;
