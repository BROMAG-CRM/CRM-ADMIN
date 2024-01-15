import { Menu } from 'antd'
import { useEffect } from 'react'
import { adminItems,marketingItems,salesItems,bdmItems,legalItems,accountsItems,fieldSalesItems } from '../helper/menu'
import {get} from "lodash"
import axios from 'axios'
const url = import.meta.env.VITE_REACT_APP_URL;
import { useDispatch,useSelector } from 'react-redux'
import Cookies from "js-cookie"
import { changeUserValues } from '../redux/userSlice'

function SideNavbar() {
  const user=useSelector((state)=>state.user.user)
  console.log(user.role);
  console.log('user');

  const dispatch=useDispatch()



  const fetchData = async (req, res) => {
    const token = localStorage.getItem("token");
    try {
      const result = await axios.get(
        `${url}/validateToken`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(changeUserValues(get(result,"data")))
      
    } catch (err) {
       console.log(err)
  }
}

useEffect(()=>{
  fetchData()
},[])



  return (
<div className="h-[100vh] fixed top-[7.5vh] bg-black flex flex-col justify-between lg:border-r z-50">
<div
  className={`w-[19vw] h-[92vh] overflow-y-scroll`}
>
  {user && user.role && (
    <Menu
      defaultSelectedKeys={get(location, "pathname", "/")}
      mode="inline"
      items={
        user.role === "admin"
          ? adminItems
          : user.role === "sales executive"
          ? salesItems
          : user.role === "bdm executive"
          ? bdmItems
          : user.role === "marketing executive"
          ? marketingItems
          : user.role === "legal management executive"
          ? legalItems
          : user.role === "accounts management executive"
          ? accountsItems
          : user.role === "field sales executive"
          ? fieldSalesItems
          : [] // Set a default value or an empty array for unknown roles
      }
    />
  )}
</div>

</div>

  )
}

export default SideNavbar