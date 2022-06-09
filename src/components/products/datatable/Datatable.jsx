import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns, productRows } from "../../../datatablesource";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../../config/url";
import { toast } from "react-toastify";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
  PaginationTotalStandalone,
} from "react-bootstrap-table2-paginator";

function Datatable() {
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageState, setPageState] = useState({
    pageNumber: 1,
    pageSize: 10,
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

  // console.log(totalRows);

  const column = [
    // uuid dihide karena kepanjangan
    // { field: "uuid", headerName: "ID", width: 70 },
    {
      dataField: "product",
      text: "Product",
      formatter: (cell, row) => {
        console.log("cell", cell);
        console.log("row", row);
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={row.img_url} alt="avatar" />
            {cell}
          </div>
        );
      },
    },
    {
      dataField: "price",
      text: "Price",
    },
    {
      dataField: "action",
      text: "Action",
      formatter: (cell, row) => {
        return (
          <div className="cellAction">
            <Link
              to={`/products/${row.uuid}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => {
                handleDelete(row.uuid);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
      // renderCell: (params) => {
      //   return (
      //     <div className="cellAction">
      //       <Link
      //         to={`/products/${params.row.uuid}`}
      //         style={{ textDecoration: "none" }}
      //       >
      //         <div className="viewButton">View</div>
      //       </Link>
      //       <div
      //         className="deleteButton"
      //         onClick={() => {
      //           handleDelete(params.row.uuid);
      //         }}
      //       >
      //         Delete
      //       </div>
      //     </div>
      //   );
      // },
    },
  ];
  const paginationOptions = {
    custom: true,
    page: pageState.pageNumber,
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
      {
        text: "25",
        value: 25,
      },
      {
        text: "50",
        value: 50,
      },
      {
        text: "All",
        value: totalRows,
      },
    ],
    showTotal: true,
    totalSize: totalRows,
  };

  function handleTableAction() {
    return (type, { page, sizePerPage }) => {
      const pageNumber = page || 1;
      setPageState((prev) => {
        return { ...prev, pageNumber: pageNumber, pageSize: sizePerPage };
      });
      // setQueryParams((prev) => {
      //   if (type === "sort") {
      //     return { ...prev, sortOrder, sortField };
      //   } else if (type === "pagination") {
      //     return { ...prev, pageNumber, pageSize: sizePerPage };
      //   } else {
      //     return prev;
      //   }
      // });
    };
  }
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Product
        <Link to="/products/new" className="link">
          Add New
        </Link>
      </div>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <div>
              <div>
                <BootstrapTable
                  wrapperClasses="table-responsive"
                  classes="table table-head-custom table-vertical-center overflow-hidden table-striped"
                  bootstrap4
                  bordered={false}
                  remote
                  keyField="uuid"
                  data={rows}
                  columns={column}
                  onTableChange={handleTableAction()}
                  {...paginationTableProps}
                />
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <SizePerPageDropdownStandalone {...paginationProps} />
                    <PaginationTotalStandalone {...paginationProps} />
                  </div>
                  <div className="col-md-6 col-lg-6 mt-2 mt-md-0 mt-lg-0 mt-sm-2">
                    <PaginationListStandalone {...paginationProps} />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </PaginationProvider>
      {/* <DataGrid
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
      /> */}
    </div>
  );
}

export default Datatable;
