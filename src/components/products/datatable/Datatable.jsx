import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns, productRows } from "../../../datatablesource";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../config/url";
import { toast } from "react-toastify";

function Datatable() {
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageState, setPageState] = useState({
    pageNumber: 0,
    pageSize: 5,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = (id) => {
    Axios.delete(`${API_URL}/product/delete/${id}`)
      .then((response) => {
        // console.log(response.data.data);
        toast.success(response.data.message);
        getProductList();
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something Wrong");
        }
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      });
  };

  const getProductList = () => {
    setIsLoading(true);
    Axios.post(`${API_URL}/product/list`, pageState)
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
    getProductList();
  }, [pageState]);

  console.log(totalRows);

  const column = [
    // uuid dihide karena kepanjangan
    // { field: "uuid", headerName: "ID", width: 70 },
    {
      field: "product",
      headerName: "Product",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img_url} alt="avatar" />
            {params.row.product}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 230,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/products/${params.row.uuid}`}
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
        Add New Product
        <Link to="/products/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
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
