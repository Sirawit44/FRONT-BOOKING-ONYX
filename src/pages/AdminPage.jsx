import React, { useEffect, useState } from "react";
import adminAPI from "../api/adminAPI";
import { formatReservation } from "../utils/convertDate";
import Button from "../components/Button";
import EditCart from "../components/EditCart";
export default function AdminPage() {
  const [data, setData] = useState([]);
  

  const fetchData = async () => {
    try {
      const response = await adminAPI.getAllCustomers();
      setData(response.data);
      // console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log('data',data)
  
  return (
    <div>
      {data.map((el,index) => (
        <EditCart
        fetch={fetchData}
        key={index} index={index} el={el}/>
      ))}
    </div>
  );
}
