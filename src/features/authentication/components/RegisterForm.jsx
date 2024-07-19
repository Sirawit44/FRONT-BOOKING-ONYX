import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateRegister from "../../../validation/validate-register";
import authAPI from "../../../api/authAPI";
import { toast } from "react-toastify";




const initialInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",

};

const initialInputError = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",

};

export default function RegisterForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const handleChangeInput = (e) => {
    setInputError({...initialInput})
    setInput({ ...input, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const error = validateRegister(input);
      if (error) return setInputError(error);
      console.log("aaaa", input);

      setInputError({ ...initialInput})
      await authAPI.register(input);
      toast.success('registered successfully. Please login into cotinue')
      document.getElementById("register").close();

      
    } catch (err) {
      console.log(err);
      if(err.response.status === 400) {
        if(err.response.data.message) {
          toast.error(err.response.data.message )
        }
      }

    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="grid gap-4">
        <h1 className="mx-auto text-2xl gap-4">Register</h1>
        <div>
          <Input
            placeholder="Firstname"
            name="firstName"
            value={Input.firstName}
            onChange={handleChangeInput}
            error={inputError.firstName}
          />
        </div>
        <div>
          <Input
            placeholder="Lastname"
            name="lastName"
            value={Input.lastName}
            onChange={handleChangeInput}
            error={inputError.lastName}
          />
        </div>
        <div>
          <Input
            placeholder="Email"
            name="email"
            value={Input.email}
            onChange={handleChangeInput}
            error={inputError.email}
          />
        </div>
        <div>
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={Input.password}
            onChange={handleChangeInput}
            error={inputError.password}
          />
        </div>
        <div>
          <Input
            placeholder="Confirm password"
            name="confirmPassword"
            type="password"
            value={Input.confirmPassword}
            onChange={handleChangeInput}
            error={inputError.confirmPassword}
          />
        </div>
        <div>
          <Input
            placeholder="Phone number"
            name="phone"
            value={Input.phone}
            onChange={handleChangeInput}
            error={inputError.phone}
          />
        </div>
        <Button>Register</Button>
      </div>
    </form>
  );
}
