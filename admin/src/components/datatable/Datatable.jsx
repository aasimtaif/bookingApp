import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useApiCalls } from "../../hooks/useApiCalls";
import { MagnifyingGlass } from 'react-loader-spinner'
const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const { data, loading, error, reFetch } = useFetch(`/${path}`);
  const { deleteData } = useApiCalls()
  const [list, setList] = useState();
  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await deleteData(`/${path}/${id}`)
      reFetch(`/${path}`)
    } catch (err) {
      console.log(err)
    }

  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {path !== 'rooms' && <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>}
          </div>
        );
      },
    },
  ];
  console.log(list)
  if (loading) {
    return (
      <div className="loader">
        <MagnifyingGlass
          color="#00BFFF"
          height={300}
          width={300}
          timeout={3000}
        />
      </div>
    );
  }
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
        getRowId={(row) =>row.id}
      />}
    </div>
  );
};

export default Datatable;
