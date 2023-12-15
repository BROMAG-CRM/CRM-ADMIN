import { Button, Image, Menu, Dropdown, Space, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import Logo from "../assets/logo1.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { get, isEmpty } from "lodash";
import {
  PhoneOutlined,
  UserOutlined,
  WhatsAppOutlined,
  MailOutlined,
} from "@ant-design/icons";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ApartmentIcon from "@mui/icons-material/Apartment";

function AdminNavbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState("");

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const nameMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
      {get(user, "name", "")}
      </Menu.Item>
    </Menu>
  );

  const numberMenu = (
    <Menu>
      <Menu.Item key="1" icon={<PhoneOutlined />}>
        <a href="tel:+9150289762" className="text-[10px] lg:text-[14px]">
          {get(user, "mobileNumber", "")}
        </a>
      </Menu.Item>
    </Menu>
  );

  const emailMenu = (
    <Menu>
      <Menu.Item key="1" icon={<MailOutlined />}>
        <a href="tel:+9150289762" className="text-[10px] lg:text-[14px]">
          {get(user, "email", "")}
        </a>
      </Menu.Item>
    </Menu>
  );

  const cityMenu = (
    <Menu>
      <Menu.Item key="1" icon={<ApartmentIcon />}>
        <a href="tel:+9150289762" className="text-[10px] lg:text-[14px]">
          {get(user, "city", "")}
        </a>
      </Menu.Item>
    </Menu>
  );

  const items = [
    {
      key: "1",
      label: (
        <a href="tel:+9150289762" className="text-[10px] lg:text-[14px]">
          Call
        </a>
      ),
      icon: <PhoneOutlined />,
    },
    {
      key: "2",
      label: (
        <a
          href="https://wa.me/9150289762"
          className="text-[10px] lg:text-[14px]"
        >
          Whatsapp
        </a>
      ),
      icon: <WhatsAppOutlined />,
    },
    {
      key: "3",
      label: (
        <a
          href="mailto:example@example.com"
          className="text-[10px] lg:text-[14px]"
        >
          Email
        </a>
      ),
      icon: <MailOutlined />,
    },
  ];

  return (
    <div>
      {user && user.name && user.name.toLowerCase().startsWith("admin@") ? (
        <div
          className={`w-screen px-20 z-50 fixed border-b shadow-md flex items-center justify-between h-[7.5vh] bg-black`}
        >
          <div>
            <Image src={Logo} preview={false} width={100} />
          </div>
          <div>
            <Button className="!text-white" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <div className={`fixed w-screen z-40 h-[30vh] md:h-[45vh] !bg-black`}>
          <div className="flex flex-col md:flex-row pt-2 items-center  !justify-between md:px-20">
            <div className="flex justify-between  px-2">
              <div>
                <Image
                  src={Logo}
                  preview={false}
                  className="!w-24 md:!w-40 flex items-start justify-start"
                />
              </div>
              <div className="items-center justify-end hidden sm:flex  w-[60vw] sm:w-[70vw] md:w-[10vw] md:absolute md:right-10 md:top-[20px]">
                <Button
                  className="!text-white h-[28px] w-[75px] text-[10px] md:h-[32px] md:w-[80px] flex items-center justify-center md:text-[12px]"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
              <div
                className="items-center justify-end  flex sm:hidden  w-[60vw] sm:w-[70vw] md:w-[10vw] md:absolute md:right-10 md:top-[20px]"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <MenuIcon className="!text-white" />
              </div>
            </div>
            <div className=" justify-center hidden sm:flex lg:gap-8 xl:20 md:w-[100vw] w-[100vw] lg:pl-[17vw] px-2 gap-10 md:gap-4">
              <div className="!text-white">
                <Dropdown overlay={nameMenu}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <h1 className="text-[10px] flex items-center justify-center md:text-[12px] lg:text-[14px]">
                        Employee Name <ArrowDropDownIcon />
                      </h1>
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className="!text-white">
                <Dropdown overlay={numberMenu}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <h1 className="text-[10px] flex items-center justify-center md:text-[12px] lg:text-[14px]">
                        Contact Number <ArrowDropDownIcon />
                      </h1>
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div
                className={`!text-white ${
                  get(user, "email") === "" ? "hidden" : "block"
                }`}
              >
                <Dropdown overlay={emailMenu}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <h1 className="text-[10px] flex items-center justify-center md:text-[12px] lg:text-[14px]">
                        Email <ArrowDropDownIcon />
                      </h1>
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className="!text-white">
                <Dropdown overlay={cityMenu}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <h1 className="text-[10px] flex items-center justify-center md:text-[12px] lg:text-[14px]">
                        City <ArrowDropDownIcon />
                      </h1>
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className="!text-white">
                <Dropdown
                  menu={{
                    items,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <h1 className="text-[10px] md:text-[12px] flex items-center justify-center lg:text-[14px]">
                        Support <ArrowDropDownIcon />
                      </h1>
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-white text-2xl md:text-4xl text-center pt-2 md:pt-14">
              Lead Generation Forms
            </h1>
            <p className="text-white text-center text-[14px] md:text-2xl tracking-wider pt-5 sm:text-sm">
              Collect leads effortlessly for our business
            </p>
          </div>
        </div>
      )}
      <Drawer
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
        width={200}
        placement="left"
      >
        <div className="flex flex-col justify-center px-2 gap-5 w-[70vw]">
          <div className="!text-black">
            <Dropdown overlay={nameMenu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <h1 className="text-[14px] flex justify-between items-center gap-[11px]">
                    <span>Employee Name</span>
                    <span>
                      <ArrowDropDownIcon />
                    </span>
                  </h1>
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="!text-black">
            <Dropdown overlay={numberMenu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <h1 className="text-[14px] flex justify-between gap-[10px] items-center">
                    <span>Contact Number</span>
                    <span>
                      <ArrowDropDownIcon />
                    </span>
                  </h1>
                </Space>
              </a>
            </Dropdown>
          </div>
          <div
            className={`!text-black ${
              get(user, "email") === "" ? "hidden" : "block"
            }`}
          >
            <Dropdown overlay={emailMenu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <h1 className="text-[14px] flex justify-between items-center gap-[80px]">
                    <span>Email</span>
                    <span>
                      <ArrowDropDownIcon />
                    </span>
                  </h1>
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="!text-black">
            <Dropdown overlay={cityMenu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <h1 className="text-[14px] flex justify-between items-center gap-[90px]">
                    <span>City</span>
                    <span>
                      <ArrowDropDownIcon />
                    </span>
                  </h1>
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="!text-black">
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <h1 className="text-[14px] flex justify-between items-center gap-[64px]">
                    <span>Support</span>
                    <span>
                      <ArrowDropDownIcon />
                    </span>
                  </h1>
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="pt-10 pl-5">
            <Button
              className="!text-white bg-black h-[30px] w-[100px] text-[10px] flex items-center justify-center "
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default AdminNavbar;
