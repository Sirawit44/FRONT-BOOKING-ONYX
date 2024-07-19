import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { toast } from "react-toastify";
import reservationAPI from "../api/reservationAPI";
import CancelBooking from "../components/CancelBooking";

export default function CheckBookingPage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await reservationAPI.getAllReservation();
      setData(response.data);
      // console.log('response',response)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log("data", data);
  return (
    <div className="grid grid-cols-2 p-5 m-5">
      {data.map((el) => (
        <CancelBooking fetch={fetchData} key = {el.id} el={el}/>
      ))}
    </div>
  );
}
