import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./DataTable.scss";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DataTable = (props) => {
  console.log("props", props); 
  // users
  // products

  const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: async (id) => {
    const response = await fetch(`http://127.0.0.1:5000/${props.slug}/${id}`, {
      method: "delete",
    });
    if (!response.ok) {
      throw new Error("Failed to delete the item");
    }
    return await response.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries([`all${props.slug}`]);
  },
  onError: (error) => {
    console.error("Error:", error.message);
    // You can also handle the error by displaying it in the UI if needed
    alert(`Error: ${error.message}`);
  },
});


  const handleDelete = (id) => {
    //delete the item
    mutation.mutate(id);
    console.log("delete", id);
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="View" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="Delete" />
          </div>
        </div>
      );
    },
  };
  console.log(props.rows);

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
