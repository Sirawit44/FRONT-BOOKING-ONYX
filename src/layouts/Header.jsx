import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import RegisterForm from "../features/authentication/components/RegisterForm";
import LoginForm from "../features/authentication/components/LoginForm";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import bg from "../assets/3rdStreet.jpg"
// import CheckBookingPage from "../pages/CheckBookingPage";


export default function Header() {
  const { authUser, logout } = useAuth();
  // console.log(authUser);
  const navigate = useNavigate();

  const onClickOnyx = (e) => {
    navigate("/");
  };
  const onClickRegister = (e) => {
    navigate("/register");
  };

  const onClickLogin = (e) => {
    navigate("/login");
  };

  const onClickLogout = () => {
    logout();
    toast.success('logout completed')
    navigate("/")
  };

  const onClickCheckBooking = () => {
    navigate('/booking')
  };

  return (
    <>
      <div
        className="bg-red-500 w-full h-72 bg-cover bg-left"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <header className="flex justify-between bg-gray-300 bg-opacity-90 p-3  z-40">
          <div className="navbar">
            <div className="flex-1">
              <button
                onClick={onClickOnyx}
                className="font-sans text-4xl font-bold"
              >
                ONYX
              </button>
            </div>
            <div className="flex-none gap-2">
              {authUser ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    {authUser.firstName}
                  </div>

                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <div onClick={onClickLogout}>Logout</div>
                    </li>
                    <li>
                      <div onClick={onClickCheckBooking}>Booking</div>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Button
                    bg="white"
                    onClick={() =>
                      document.getElementById("register").showModal()
                    }
                  >
                    Register
                  </Button>

                  <Button
                    onClick={() =>
                      document.getElementById("signin").showModal()
                    }
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </div>

          <dialog id="register" className="rounded-lg">
            <div className="p-5">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <RegisterForm />
            </div>
          </dialog>

          <dialog id="signin" className="rounded-lg">
            <div className="p-5">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              {/* <h3 className="font-bold text-lg">Hello!</h3> */}

              <LoginForm />

              {/* <p className="py-4">
                  Press ESC key or click on ✕ button to close
                </p> */}
            </div>
          </dialog>
        </header>
      </div>
    </>
  );
}
