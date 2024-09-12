import { data } from "framer-motion/client";
import "./Add.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Add = (props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      console.log("Form Data:",  formData);
      console.log("Slug:", props.slug);
      const response = await fetch(`http://127.0.0.1:5000/${props.slug}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Send as JSON
        },
        body: JSON.stringify(formData), // Directly send the FormData object
      });
      if (!response.ok) {
        throw new Error("Failed to add the item");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect form data using the FormData API
    const formData = {};
    new FormData(e.target).forEach((value, key) => {
      formData[key] = value;
    });
    console.log("Form Data:", formData);
    // Trigger mutation and send form data to the backend
    mutation.mutate(formData);

    props.setOpen(false); // Close the modal
  };

  return (
    <div className="add-dash">
      <div className="modal-dash">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "createdAt" && item.field !== "updatedAt")
            .map((column, index) => (
              <div className="item" key={index}>
                <label>{column.headerName}</label>
                <input
                  type={column.type || "text"}
                  name={column.field} // Set name attribute for FormData to capture
                  placeholder={column.field}
                />
              </div>
            ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;