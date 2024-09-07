import React from 'react'
import ShopDescription from '../components/Shop/ShopDescritpion'
import { json } from 'react-router-dom'

function ShopDesPage() {
  return (
     <ShopDescription />
  )
}

export default ShopDesPage



export async function loader({ request, params }) {
  const id = params.id;
  console.log("id",id)
  console.log("params", request)

  const response = await fetch('http://127.0.0.1:5000/api/details/'+ id, {
    credentials: 'include'
  });
    

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      }
    );
  } else {
      const data = await response.json();
      console.log("data",data)
    return data;
  }
}
