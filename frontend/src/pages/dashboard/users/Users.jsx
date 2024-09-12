import DataTable from "../../../components/dashboard/dataTable/DataTable";
import "./Users.scss";
import { useState } from "react";

import { userRows } from "../../../data";
import Add from "../../../components/dashboard/add/Add";

import { useQuery } from "@tanstack/react-query";
import { getEmails } from "../../../util/http";
import LoadingIndicator from "../../../UI/LoadingIndicator";




const columns = [
  { field: "id", headerName: "ID", width: 170 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "name",
    headerName: "name",
    width: 100,
    editable: true,
  },
  
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  
  {
    field: "created_at",
    headerName: "Created At",
    width: 220,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 100,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);
  console.log(userRows);

  // Uncomment when the API is ready
  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: getEmails
  });
  // console.log("emailsssssss",data);
  // const emails = ;
  // console.log("emailsssssss",emails);
  

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {/* <DataTable slug="users" columns={columns} rows={userRows} /> */}
      
      {/* Uncomment when using API */}
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )}

      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
