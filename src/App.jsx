import AuthContextProvider from "./context/authContext";
import Router from "./routes"
import { Slide, ToastContainer, toast } from 'react-toastify';


Router
function App() {
  return (
    <>
      {/* <Suspense fallback ={''}> */}
      <AuthContextProvider>
        <Router />
        <ToastContainer 
          position="bottom-right" 
          autoClose ={3000} 
          transition={Slide}
        />
        
      </AuthContextProvider>
      {/* </Suspense> */}
    </>
  )
}
export default App

