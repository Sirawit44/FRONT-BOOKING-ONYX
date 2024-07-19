import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import HomePage from '../pages/HomePage'
// import LoginPage from '../pages/LoginPage'
// import RegisterPage from '../pages/RegisterPage'
import MainContainer from "../layouts/MainContainer";
import DetailPage from "../pages/DetailPage";
import RoomType from "../pages/RoomType";
import Payment from "../pages/Payment";
import AdminPage from "../pages/AdminPage";
import CheckBookingPage from "../pages/CheckBookingPage";


// const LoginPage = lazy(()=> import('../pages/LoginPage'))
// const HomePage = lazy(()=> import('../pages/HomePage'))
// const RegisterPage = lazy(()=> import("../pages/RegisterPage"))


const isAuthenticated = ()=>{
  const bbbbb = localStorage.getItem('ACCESS_TOKEN') !== null; // ตรวจสอบว่ามีโทเค็นที่เก็บอยู่ใน localStorage มั้ย
  console.log('bbbbbbb',bbbbb)
};





const router = createBrowserRouter([
  {path: '/', 
  element: <MainContainer />,
  children: [
    {path: '/', element:<HomePage />},
    {path: '/detail/:branchName', element: <DetailPage />},
    {path: '/detail/:branchName/:roomType', element: <RoomType />},
    {path: '/detail/:branchName/:roomType/:id', element:<Payment />},
    {path: '/booking', element:<CheckBookingPage/>} , 
    {path: '/admin-pages', element: <AdminPage />},
    
    
    // {path: '/detail/:branchName/:roomType/:payment', 
    // element:(
      //   <ProtectedRoute>
      //     <Payment />
      //   </ProtectedRoute>
      // )}
      
    ]}
  
 

]);

export default function  Router(){
  return <RouterProvider router={router} />
}