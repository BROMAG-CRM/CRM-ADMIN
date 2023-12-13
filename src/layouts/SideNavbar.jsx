import { Menu } from 'antd'
import React, { useEffect } from 'react'
import { items } from '../helper/menu'
import {get} from "lodash"
import axios from 'axios'
const url = import.meta.env.VITE_REACT_APP_URL;
import { useDispatch,useSelector } from 'react-redux'
import Cookies from "js-cookie"
import { changeUserValues } from '../redux/userSlice'

function SideNavbar() {
  const user=useSelector((state)=>state.user.user)
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
<div className="h-[100vh] fixed top-[7.5vh] bg-black flex flex-col justify-between lg:border-r">
  <div
    className={`w-[19vw] h-[92vh] overflow-y-scroll ${
      user && user.name && user.name.toLowerCase().startsWith("admin@") ? "block" : "hidden"
    }`}
  >
    <Menu
      defaultSelectedKeys={get(location, "pathname", "/")}
      mode="inline"
      items={items}
    />
  </div>
</div>

  )
}

export default SideNavbar