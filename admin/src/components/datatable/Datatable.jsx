import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useApiCalls } from "../../hooks/useApiCalls";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const { data, loading, error, reFetch } = useFetch(`/${path}`);
  const { deleteData } = useApiCalls()

  const handleDelete = (id) => {
    try {
      deleteData(`/${path}/${id}`);
      reFetch(`/${path}`)
    } catch (err) {
      console.log(err)
    }
  };
  console.log(columns, path)
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {path !== 'rooms' && <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {!loading && <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />}
    </div>
  );
};

export default Datatable;
