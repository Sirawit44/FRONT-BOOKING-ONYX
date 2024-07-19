import { useEffect, useState } from "react";
import Room from "../components/Room";
import roomTypeAPI from "../api/roomTypeAPI";
import LoginForm from "../features/authentication/components/LoginForm";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import roomAPI from "../api/roomAPI";

export default function RoomType() {
  const [room, setRoom] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const { authUser } = useAuth();

  const navigate = useNavigate();

  // Function to fetch room types
  const getRoom = async () => {
    try {
      const res = await roomTypeAPI.getRoomType();
      console.log(res);
      setRoom(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Effect to fetch room types on component mount and when initialLoad changes
  useEffect(() => {
    if (initialLoad) {
      getRoom();
      setInitialLoad(false);
    }
  }, [initialLoad]);

  // Function to handle payment click
  const onClickPayment = async (roomDetail) => {
    try {
      if (!authUser) {
        return toast.error("Sign In before payment");
      }
      await roomAPI.statusRoom()
      navigate(`${roomDetail.id}`);
    } catch (error) {
      console.log(error)
      toast.error('Not Available room')
    }
  };
  console.log("lognoooooooo", authUser);

  return (
    <>
      <div className="mx-20 mt-10">
        <div>
          <div className="grid grid-cols-3 justify-center px-36 pt-10">
            {room.map((el) => (
              <Room key={el.id} data={el} onClick={() => onClickPayment(el)} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
