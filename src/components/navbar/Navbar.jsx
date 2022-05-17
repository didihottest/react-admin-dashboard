import React from "react";
import {
  ChatBubbleOutline,
  DarkModeOutlined,
  FullscreenExitOutlined,
  LanguageOutlined,
  ListOutlined,
  NotificationsNoneOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";

function Navbar() {
  const dispatch = useDispatch();
  const { toggle } = bindActionCreators(actionCreators, dispatch);

  const darkMode = useSelector((state) => {
    return state.darkMode;
  });
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" name="" id="" placeholder="Search" />
          <SearchOutlined />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlined className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlined
              onClick={() => toggle(darkMode)}
              className="icon"
            />
          </div>
          <div className="item">
            <FullscreenExitOutlined className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            <div className="counter">5</div>
          </div>
          <div className="item">
            <ChatBubbleOutline className="icon" />
            <div className="counter">20</div>
          </div>
          <div className="item">
            <ListOutlined className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
