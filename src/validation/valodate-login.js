import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().required().messages({'string.empty': 'email address is required'}),
  password: Joi.string().required().messages({'string.empty': 'password is required' ,'string.pattern.base': 'email pr password is incorrect'})
});

const validateLogin = input =>{
  const {error} = loginSchema.validate(input, {abortEarly: false});
  if (error){
    const result = error.details.reduce((acc,item)=>{
      acc[item.path[0]] = item.message;
      return acc;
    },{});
    console.dir(error)

    return result
  }
};

export default validateLogin;
