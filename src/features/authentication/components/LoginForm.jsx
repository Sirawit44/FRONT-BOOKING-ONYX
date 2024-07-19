import Input from "../../../components/Input.jsx";
import Button from "../../../components/Button.jsx";
import { useState } from "react";
import validateLogin from "../../../validation/valodate-login.js";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";


const initialInput = {
  email: '',
  password : ''
};

const initialInputError = {
  email: '',
  password : ''
};

export default function LoginForm() {

  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const {login} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setInput({...input, [e.target.name]: e.target.value})
  }


   const handleSubmit =async (e)=>{
    try{
      e.preventDefault();
      console.log(input)

      const error = validateLogin(input)
      if(error) return setInputError(error)

      setInputError(initialInputError)
      await login(input)
      document.getElementById("signin").close();
      navigate('/')
      toast.success('login success')
    }catch(err){
      console.log(err)
      if (err instanceof AxiosError) {
        const message = err.response.status === 400 ? 
        'invalid email or password' 
        : 'internal erver error'
        return toast.error(message);
        
      }
    }
   } 


  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5">
        <h1 className="mx-auto text-2xl">Sign In</h1>
        <div>
          <label>Email:</label>
          <Input 
            placeholder="Please enter an email address"
            name = 'email'
            value = {input.email}
            onChange = {handleChange}
            error = {inputError.email}

          />
        </div>
        <div>
        <label>Password:</label>
          <Input
            placeholder="Please enter password"
            type="password"
            name = 'password'
            value = {input.password}
            onChange = {handleChange}
            error = {inputError.password}
          />
        </div>
        <div>
          <Button>Sign In</Button>
        </div>
      </div>
    </form>
  );
}
