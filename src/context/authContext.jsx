import { useState } from 'react';
import { createContext } from 'react'
import userAPI from '../api/userAPI';
import authAPI from '../api/authAPI';
import { setAccessToken } from '../utils/localStorage';
import { getAccessToken, removeAccessToken } from '../utils/localStorage';
import { useEffect } from 'react';
 

export const AuthContext = createContext();

export default function AuthContextProvider({children}){
  const [authUser, setAuthUser] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)


  useEffect(()=>{
    const fetchUser = async ()=>{
      try{
        if(getAccessToken()){
          const res = await authAPI.getAuthUser();
          setAuthUser(res.data.user);
        }
      }catch(err){
        console.log(err);
      } finally {
        setIsAuthLoading(false)
      }
    }
  

    fetchUser();
  },[])

  // console.log('authUser',authUser)

  const login = async (credentials)=>{
    const res = await authAPI.login(credentials);
    setAccessToken(res.data.accessToken);
    const resGetAuthUser = await authAPI.getAuthUser();
    setAuthUser(resGetAuthUser.data.user)
  };
  const logout = () => {
    removeAccessToken()
    setAuthUser(null)
  };

  const updateAuthUser = async formData =>{
    const res = await userAPI.uploadUserImage(formData)
    setAuthUser(prev=> ({...prev, ...res.data}))
  };


  return( 
    <AuthContext.Provider value={{login,logout, authUser, isAuthLoading, updateAuthUser}}>
      {children}
    </AuthContext.Provider>
)};
