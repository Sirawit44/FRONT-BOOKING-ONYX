import { useEffect, useState } from "react"
import branchAPI from "../api/branchAPI"
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";



export default function HomePage() {

  const [branch, setBranch] = useState([]);
  
  const navigate = useNavigate();

  // get
  const getBranch = async () => {
    try {
      const res = await branchAPI.getBranch();
      console.log('branch==>', res)
      setBranch(res.data.branch);
      
    } catch (error) {
      console.log(error)
    }

  };

  console.log('branchessssss',branch)

  //show
  const showBranch = branch?.map((el)=>{
    // console.log('elllll===>',el)
    return <Card key = {el.id} data={el} onClick={() => onDirect(el)} />
  });


  //hover => click => navigate
  const onDirect = (branchDetail) => {
    console.log(branchDetail.id);
    localStorage.setItem("branchId",branchDetail.id)
    navigate(`/detail/${branchDetail.name}` ,{state: branchDetail.name } );
  }


  // 

  useEffect(()=>{
    getBranch();
  },[])


  return (
   <>
   <div className=" mx-28 mt-10">
    <div>
      <h1 className="font-bold text-2xl mb-5">Discover Destination</h1>
      <div className="w-32 text-center mb-5">
        <h1 className="bg-black text-white rounded-md ">Thailand</h1>
      </div>

      <div className="grid grid-cols-3 justify-center px-36">
        {showBranch}
      </div>
    </div>
   </div>
   </>

  )
}
