import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import reservationAPI from "../api/reservationAPI";

export default function CancelBooking({ el, fetch }) {
  const [cencel, setCencel] = useState();
  const [confirm, setConfirm] = useState();

  const handleConfirm = async (e) => {
    try {
      // console.log(e)
    await reservationAPI.cancelReservation(e.target.id);
    toast.success("CANCEL BOOKING COMPLETE");
    fetch();
    // console.log("data", data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    handleConfirm();
  }, []);

  const handleCancel = async () => {
    try {
      toast.success("UN-CANCEL BOOKING COMPLETE");
    } catch (error) {}
  };
  return (
    <div className="grid grid-cols-2 border-4 p-5 m-5 w-[600px]">
      <div className="grid grid-cols-2 gap-5">
        Firstname: {el.user.firstName}
        Lastname: {el.user.lastName}
      </div>
      <div>Booking Date: {el.bookingDate}</div>
      <div>
        Branch: {el.room.branch.name}
        Location : {el.room.branch.location}
      </div>
      <div>
        Total Price: {el.totalPrice}
        Status: {el.payments[0].paymentStatus}
      </div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal").showModal()}
      >
        CANCEL BOOKING
      </button>
      <dialog id="my_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-white mb-3">
            Confirm to <span className="text-red-700">CANCEL</span> booking at{" "}
            {el.room.branch.name} booking Date: {el.bookingDate}
          </h3>
          <form method="dialog" className="px-64 flex">
            <button
              className="btn bg-gray-400 opacity-100 text-black mx-2"
              onClick={handleCancel}
            >
              CANCEL
            </button>
            <button
              className="btn bg-black text-white"
              id={el.id}
              onClick={handleConfirm}
            >
              CONFIRM
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
