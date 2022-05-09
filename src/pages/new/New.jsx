import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
function New({ inputs, title }) {
  const [file, setFile] = useState("");
  console.log(file);
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
            <form>
              <div className="formInput">
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
              </div>
              {/* <div className="formInput">
                <label>Username</label>
                <input type="text" placeholder="john_doe" />
              </div>
              <div className="formInput">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input type="text" placeholder="johndoe@email.com" />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input type="text" placeholder="+62 123 123" />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input type="text" />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input type="text" placeholder="Jl. Palsu, Jakarta Barat" />
              </div>
              <div className="formInput">
                <label>Country</label>
                <input type="text" placeholder="Indonesia" />
              </div> */}
              {inputs.map((item) => {
                return (
                  <div className="formInput" key={item.id}>
                    <label>{item.label}</label>
                    <input type={item.type} placeholder={item.placeholder} />
                  </div>
                );
              })}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
