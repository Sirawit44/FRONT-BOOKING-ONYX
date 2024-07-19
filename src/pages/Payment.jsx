import { StrictMode, useEffect, useState } from "react";
import roomTypeAPI from "../api/roomTypeAPI";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";
import { toast } from "react-toastify";
import Input from "../components/Input";
import reservationAPI from "../api/reservationAPI";
import paymentAPI from "../api/paymentAPI";
import qrCode from "../assets/qr-Code.png"

const stayDate = {
  checkInDate : "",
  checkOutDate : ""
}

export default function Payment() {
  const [data, setData] = useState([]);
  const [file, setFile]= useState(null)
  const { authUser } = useAuth();
  const params = useParams();
  const [isClick, setIsClick] = useState(false); // State to track button click
  const [checkInCheckOut, setCheckInCheckOut] = useState(stayDate)
  const [countDay, setCountDay] = useState(0)
  const navigate = useNavigate();
  console.log('countDay',countDay)

  console.log('checkInCheckOut',checkInCheckOut)
  console.log('ffff',params)
  // Function to fetch data
  const getData = async () => {
    try {
      const res = await roomTypeAPI.getRoomTypeById(params.id);
      console.log('front',res.data)
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("file", file)

  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
  calculateDays();
  },[checkInCheckOut])

  const calculateDays = () => {
    const checkInDate = new Date(checkInCheckOut.checkInDate);
    const checkOutDate = new Date(checkInCheckOut.checkOutDate);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if(diffDays) setCountDay(diffDays);
    // return diffDays;
  };



  // Function checkin checkout 
  const handleOnChangeInputDate =(e)=>{
    setCheckInCheckOut({...checkInCheckOut, [e.target.name]: e.target.value})
  }
  
  // Function sent slip before checkout
  const handleButtonClick = () => {
    // Toggle the value of isClick
    setIsClick(!isClick);
  };

  console.log('data',data)

  // Function complete
  const onClickComplete = async()=>{
    const branchId = localStorage.getItem("branchId")
    const input = {
      roomTypeId : data.id,
      bookingDate : new Date(),
      totalPrice : String(`${countDay}` * `${data.pricePerDay}`),
      checkInDate : new Date(checkInCheckOut.checkInDate) ,
      checkOutDate : new Date(checkInCheckOut.checkOutDate),
      branchId: branchId
    }

    const formData =  new FormData();
    formData.append('imageSlip',file)


    const reserved = await reservationAPI.createReservation(input)
    console.log('reserved',reserved)
    
    formData.append('reservationId',reserved.data.reservation.id)

    await paymentAPI.createPayment(formData)
    toast.success('Booking complete!!!!!')
    navigate("/")
  }

  return (
    <>
      <div className="p-5">
        <div className="text-center">ONYX</div>
        <div className="text-center">Payment</div>
        <div className=" flex flex-col justify-center">
          <div className="flex">
            <h1>Name: {authUser?.firstName} {authUser?.lastName}</h1>
          </div>
          <div className="flex">
            <h1>Location: {params.branchName}</h1>
          </div>
          <div className="flex">
            <h1>Room Type: {data.typeName}</h1>
          </div>
          <h1>Room Type: {data.typeName}</h1>
          <h1>price per day : {data.pricePerDay}</h1>
          <div>
            check-in (eg. 24/12/2024) <input type="datetime-local" min='11:00' name="checkInDate" value={checkInCheckOut.checkInDate} onChange={handleOnChangeInputDate}></input>
            check-out (eg. 24/12/2024) <input type="datetime-local" name="checkOutDate" value={checkInCheckOut.checkOutDate} onChange={handleOnChangeInputDate}></input>
          </div>
          <div>
            total price : {`${countDay}`* `${data.pricePerDay}`}
           
          </div>
        </div>
        
        <div>
          <h1 className="text-2xl">CHOOSE A PAYMENT METHOD:</h1>
          <div>
            <Button onClick={handleButtonClick}>Mobile Banking</Button>
            {isClick ? (
              <div>
                <img src={qrCode} alt="qr-code"/>
              </div>
            ) : (
             null
            )}
          </div>

        </div>
          Slip Payment:<Input 
          type="file"  
          onChange={e=>{
            if(e.target.files[0]){
              setFile(e.target.files[0]);
            }
          }}
          />
          { file ?
           <>
           <Button onClick={onClickComplete}>CHECKOUT</Button>
          </>
          : null}
      </div>
    </>
  );
}
