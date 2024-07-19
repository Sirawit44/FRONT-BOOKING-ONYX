import Joi, { string } from "joi";

const registerSchema = Joi.object({
  firstName : Joi.string().required().trim().messages({'string.empty': 'firstname is required'}),
  lastName: Joi.string().required().trim().messages({'string.empty': 'lastname is required'}),
  email : Joi.string().required().email({tlds: false}).trim().messages({'string.empty': 'email is required'}),
  password : Joi.string().required().pattern(/^[0-9a-zA-z]{6,12}$/).trim().messages({'string.empty': 'password is required','string.pattern.base': 'password must be 6-12 characters and contain only alphabet and number'}),
  confirmPassword : Joi.string().valid(Joi.ref('password')).required().strip().messages({'string.empty':'comfirm password is required','any.only' : 'comfirm password is incorrect'}),
  phone : Joi.string().pattern(/^[0-9]{10}$/).messages({'string.empty': 'phone number is required'}),
});


const loginSchema = Joi.object({
  email : Joi.string().required().email({tlds: false}).trim().messages({'string.empty': 'email is required'}),
  password : Joi.string().required().pattern(/^[0-9a-zA-z]{6,12}$/).trim().messages({'string.empty': 'password is required'})
})




const validateRegister = (data) =>{
  const { error } = registerSchema.validate(data, {abortEarly: false});

  if(error) {
    const result = error.details.reduce((acc, item)=>{
      acc[item.path[0]] = item.message;
      return acc;
    },{});
    console.log('validate',result)
    return result
  }
};


export default validateRegister;