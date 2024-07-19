import React, { useEffect, useState } from "react";
import { formatReservation } from "../utils/convertDate";
import adminAPI from "../api/adminAPI";
import { toast } from "react-toastify";
import reservationAPI from "../api/reservationAPI";


export default function EditCart({ el , index, fetch }) {
  console.log(index)
  const [update, setUpdate] = useState(el.payments[0]?.paymentStatus);

  const handleChange = async (e) => {
    setUpdate(e.target.value);
  };



  const handleConfirm = async (e) => {
    try {
      // console.log(e)
    await reservationAPI.cancelReservation(el.id);
    toast.success("CANCEL BOOKING COMPLETE");
    fetch();
    // console.log("data", data);
    } catch (error) {
      
    }
  };

  const handleSummit = async (paymentId) => {
    console.log("firstrrrr");
    // const formData = {
    //   paymentId:el.payments[0]?.id,
    //   paymentStatus:update

    // }
    const body = {
      paymentStatus: update,
    };
    await adminAPI.updatePayment(paymentId, body);
    toast.success('update payment to SUCCESS complete')
    fetch()
    console.log(paymentId)
  };
  // console.log(el.payments[0]?.id);
  // console.log(el);
  return (
    <>
      <div className="grid grid-cols-1 border-4 p-5 m-5">
        <div>
            {el.payments[0].id}
        </div>
        <div>
          firstName:{el.user.firstName}
          lastName: {el.user.lastName}
        </div>
        <div>check-In: {formatReservation(el.checkInDate)}</div>
        <div>check-out: {formatReservation(el.checkOutDate)}</div>
        <div className="">
          branch: {el.room.branch.name}
          location: {el.room.branch.location}
          room Number: {el.room.roomNumber}
          price:{el.totalPrice} Baht
        </div>
        <div>payment: {el.payments[0]?.paymentStatus}</div>
        <div>
          slip payment: <img src={el.payments[0]?.imageSlip} alt="slip" />
        </div>

        <button
          className="btn"
          onClick={() =>
            document
              .getElementById(`my_modal_${index}`)
              .showModal()
          }
        >
          edit
        </button>

        <dialog id={`my_modal_${index}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
            <select
              className="select select-bordered w-full max-w-xs"
              value={update}
              onChange={handleChange}
            >
              <option value="option">update status</option>
              <option value="PENDING">PENDING</option>
              <option value="SUCCESS">SUCCESS</option>
            </select>
            <button
              onClick={() => handleSummit(el.payments[0]?.id)}
              className="pl-28"
            >
              ok
            </button>
            <button
              onClick={() => handleConfirm()}
              className="pl-28"
            >
              checkout
            </button>
          </div>
        </dialog>
      </div>
    </>
  );
}
