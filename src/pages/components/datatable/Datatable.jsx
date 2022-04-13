import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../config/url";

function Datatable() {
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageState, setPageState] = useState({
    pageNumber: 0,
    pageSize: 5,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = (id) => {
    setRows((prev) => {
      const deletedData = prev.filter((item) => item.id !== id);
      return deletedData;
    });
  };

  const getUserList = () => {
    setIsLoading(true);
    Axios.post(`${API_URL}/user/list`, pageState)
      .then((response) => {
        // console.log(response.data.data);
        setRows(response.data.data.items);
        setTotalRows(response.data.data.total_items);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      });
  };

  useEffect(() => {
    getUserList();
  }, [pageState]);

  console.log(totalRows);

  const column = [
    // uuid dihide karena kepanjangan
    // { field: "uuid", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.avatar} alt="avatar" />
            {`${params.row.firstName} ${params.row.lastName}`}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },

    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.uuid}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => {
                handleDelete(params.row.uuid);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        loading={isLoading}
        rows={rows}
        getRowId={(row) => row.uuid}
        columns={column}
        rowCount={totalRows}
        page={pageState.pageNumber}
        pageSize={pageState.pageSize}
        paginationMode="server"
        rowsPerPageOptions={[5, 25, 100]}
        onPageChange={(page) => {
          // console.log("page", page);
          setPageState((prev) => ({ ...prev, pageNumber: page }));
        }}
        onPageSizeChange={(pageSize) =>
          setPageState((prev) => ({ ...prev, pageSize }))
        }
        checkboxSelection
      />
    </div>
  );
}

export default Datatable;
