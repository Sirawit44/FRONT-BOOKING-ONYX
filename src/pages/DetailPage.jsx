import { useEffect, useState } from "react";
import branchAPI from "../api/branchAPI";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";


export default function DetailPage() {

  const [map, setMap] = useState([])
  const location = useLocation()

  const navigate = useNavigate();

  // get
  const details = async() => {
    try {
      const res = await branchAPI.getBranch();
      console.log('res====>',res)

    } catch (error) {
    console.log(error)
    }
  };

  // click => navigate
  const onClickBooking = () =>{
    navigate('./roomType')
  }

  useEffect(() => {
    console.log(`${location.state}`)
  },[])



  return (
    <>
      <div>
        <h1 className="text-3xl font-bold justify-center px-36 mt-10 mb-10">{location.state}</h1>
      </div>
      <div className="grid grid-cols-2 justify-center px-36">
        <img src="../../public/Screenshot 2567-07-17 at 09.01.39.png" alt="map" />
        <div>
          <h2>
            WELCOME HOME Welcome to <strong>{location.state}</strong> , a residential community
            featuring <strong>studio, one, and two-bedroom apartments</strong>. Spacious layouts
            and amenities welcome you home, along with exceptional service and an
            ideal location within walking distance to shopping, dining, and
            entertainment options. Are you looking for an apartment for rent in {' '}
            {location.state}Contact our friendly, professional office staff to schedule
            a booking today.
          </h2>
          <br/>
          <Button onClick={onClickBooking}>Booking</Button>

        </div>
      </div>
    </>
  );
}
