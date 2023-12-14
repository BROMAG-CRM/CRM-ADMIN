import { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
const url = import.meta.env.VITE_REACT_APP_URL;
import axios from "axios"
import {get,isEmpty} from "lodash"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Logo from "../assets/logo1.png";
import { useDispatch } from "react-redux";
import { changeUserValues } from "../redux/userSlice";

function Login() {

  const [data, setData] = useState("");
  const navigate=useNavigate()
  const dispatch = useDispatch()


  const handleFinish = async (value) => {
    try {
       const result= await axios.post(`${url}/getuser`,value)
       localStorage.setItem("token",get(result,"data.message",""))
       Cookies.set("token", get(result, "data.message"), { secure: true, sameSite: "Strict" });
       fetchData();
       setData(get(result, "data.message", []));
       notification.success({ message: "lets continue" });
    } catch (err) {
      if (err.response.data.message === "User not found") {
        notification.error({ message: err.response.data.message });
      }else if ((err.response.data.message === "Incorrect password")) {
        notification.error({ message: err.response.data.message });
      }
    }
  };


  const fetchData = async () => {
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
        if (err.response.data.message === "User not found") {
            notification.error({ message: err.response.data.message });
          }else if ((err.response.data.message === "Incorrect password")) {
            notification.error({ message: err.response.data.message });
          }
    }
  };


  useEffect(() => {
    if (!isEmpty(data)) {
      navigate("/");
    }
  }, [navigate, data]);

  return (
    <div className="w-screen h-[100vh] bg-black flex flex-col md:flex-row  items-center justify-between ">
      <div className="text-white border-b-2 md:border-b-0 md:border-r-2 h-[30vh] w-[100vw] md:h-[70vh] border-slate-400 flex items-center justify-center  md:w-[45%]">
        <img src={Logo} className="w-[20vw]" />
      </div>

      <div className="md:pr-32 pb-4  pt-5 md:pt-0 md:pb-0">
        <Form
          className="w-[80vw] md:w-[35vw] lg:w-[30vw] xl:w-[24vw] rounded-md bg-white/20 shadow-md backdrop-blur-sm flex flex-col  px-4 gap-4 py-5 !text-white"
          layout="vertical"
          onFinish={handleFinish}
        >
          <div className="text-center">
            <h1 className="text-xl">Welcome</h1>
            <p className="pt-2">Login to admin dashboard</p>
          </div>
          <Form.Item
            name="name"
            label={<p className="!text-white">Username</p>}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter your username..."
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<p className="!text-white">Password</p>}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              type="text"
              placeholder="Enter your password..."
              size="large"
            />
          </Form.Item>

          <div className="flex flex-col items-center justify-center">
            <Form.Item>
              <Button
                htmlType="submit"
                className="!w-[18vw] !text-white"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
            <p className="cursor-pointer">
              Forgotten your Password&nbsp;?
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
