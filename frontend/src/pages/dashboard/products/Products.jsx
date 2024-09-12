import { useState } from "react";
import "./Products.scss";
import DataTable from "../../../components/dashboard/dataTable/DataTable";

import { products } from "../../../data";
import Add from "../../../components/dashboard/add/Add";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../../util/http";
import LoadingIndicator from "../../../UI/LoadingIndicator";



const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {

      return (
        <img
          src={params.row.image?.startsWith("http") || params.row.image?.startsWith("data")
            ? params.row.image
            : `/${params.row.image || "noavatar.png"}`}
          alt="Image"
        />
      );
      
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 120,
  },
  {
    field: "author",
    type: "string",
    headerName: "Author",
    width: 130,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 100,
  },
  {
    field: "discountPrice",
    type: "string",
    headerName: "Discount",
    width: 100,
  },
  {
    field: "description",
    type: "string",
    headerName: "description",
    width: 150,
  },


  {
    field: "rating",
    headerName: "Rating",
    type: "string",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    type: "string",
  },
  {
    field: "updatedAt",
    headerName: "updated At",
    width: 130,
    type: "string",
  },
  {
    field: "stockQuantity",
    headerName: "Stock",
    width: 100,
    type: "string",

  },
];

const Products = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allproducts"],
    queryFn: fetchBooks

  });
  console.log("products", data);

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
      </div>
      {/* <DataTable slug="products" columns={columns} rows={products} /> */}

      {/* TEST THE API */}

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )}
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
