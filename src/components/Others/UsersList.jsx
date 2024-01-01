import { Button, Form, Image, Input, Modal, notification, Select, Table } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import { get, debounce } from "lodash";
import React, { useEffect, useState, useRef } from "react";
const url = import.meta.env.VITE_REACT_APP_URL;
import toast, { Toaster } from 'react-hot-toast';



function UsersList() {
  const { Search } = Input;
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const [updated,setUpdated] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPartner, setsearchPartner] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const token = localStorage.getItem("token");
  console.log(token)
  console.log("token")




  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/getusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sortedData = get(response, "data.data", []).sort((a, b) =>
        new Date(b.joiningDate) - new Date(a.joiningDate)
      );

      setData(sortedData);
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    fetchData();
  }, [updated]);


 //search function
  const handleSearchPartnership = (value) => {
    const filteredData = data.filter((item) => {
      console.log(value, item.city, "wehgjhv");
      return item.uniqueId.toLowerCase().includes(value.toLowerCase()) || item.name.toLowerCase().includes(value.toLowerCase());
    });
    setsearchPartner(filteredData);
  }
  const debouncedSearch = debounce(handleSearchPartnership, 300);



  //delete function
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/deleteuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        toast.success('User deleted successfully');
        setUpdated(!updated);
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };



  //edit function
  const handleEdit = (id) => {
    const userData = data.filter((data)=>data._id === id)
    setEditModalData(userData);
    setEditModalVisible(true);
  };





  const columnsData = [
    {
      title: <h1>Serial Number</h1>,
      dataIndex: "serialNumber",
      key: "serialNumber",
      align: "center",
      render: (text, record, index) => {
        const pageSize = tableRef.current?.props?.pagination?.pageSize || 5;
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: <h1>Employee Id</h1>,
      dataIndex: "uniqueId",
      key: "uniqueId",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>User Role</h1>,
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>User Name</h1>,
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>City</h1>,
      dataIndex: "city",
      key: "city",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Email</h1>,
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Contact Number</h1>,
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      align: "center",
      render: (data) => {
        return <p>{data}</p>
      },
    },
    {
      title: <h1>Password</h1>,
      dataIndex: "password",
      key: "password",
      align: "center",
      render: (data) => {
        return <p>{data}</p>
      },
    },
    {
      title: <h1>Joining Date</h1>,
      dataIndex: "joiningDate",
      key: "joiningDate",
      align: "center",
      render: (data) => {
        const formattedDate = new Date(data).toLocaleString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        });
        return formattedDate;
      },
    },    
    {
      title: <h1>Actions</h1>,
      align: "center",
      render: (data) => {
        return (
          <>
            <EditOutlined
              key={`edit-${data._id}`}
              style={{ fontSize: '18px', marginRight: '15px', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => handleEdit(data._id)}
            />
            <DeleteOutlined
              key={`delete-${data._id}`}
              style={{ fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => handleDelete(data._id)}
            />
          </>
        );
      },
    },
  
    
  ];


  








  const handleCancelEditModal = () => {
    setEditModalVisible(false);
  };

  function UserModal({ visible, onCancel, userData }) {
    const [form] = Form.useForm();

    
  
    React.useEffect(() => {
      if (visible) {
        form.setFieldsValue(userData[0]);
      }
    }, [visible, userData, form]);

  
    const submitModal = async () => {
      const updatedData = form.getFieldsValue();
      const userId = userData[0]._id;
    
      try {
        const response = await axios.post(`${url}/updateduser/${userId}`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 200) {
          toast.success('Userdata updated successfully')
        } else {
          console.log("Unexpected response status:", response.status);
        }
        setUpdated(!updated)
        onCancel();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };

    return (
      <Modal
        title="Edit User"
        open={visible}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="update" onClick={submitModal}>
            Update Changes
          </Button>,
        ]}
      >
        {userData && (
          <Form form={form}>
            <Form.Item label="User Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Contact Number" name="mobileNumber">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    );
  }

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <>
     <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <div className="pl-[18vw]  pt-14 w-screen">
      <div className="w-[80vw] pl-20 pt-4 bg-white-70 shadow-md">
      </div>

      <div className="pl-6 w-[80vw]">
        <div className="pt-10">
        <div className="flex items-center justify-between px-4">
            <h1 className="text-center text-2xl pb-2">Users Details</h1>
            <Search
              placeholder="Search by Name or Employee Id..."
              onChange={(e) => debouncedSearch(e.target.value)}
              enterButton
              className="mt-4 w-[60%] mb-5"
              size="large"
            />
          </div>
          <Table
            columns={columnsData}
            dataSource={searchPartner.length > 0 ? searchPartner : data}
            scroll={{ x: 2500 }}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
            onChange={handleTableChange}
          />
        </div>
      </div>
      <UserModal
        visible={editModalVisible}
        onCancel={handleCancelEditModal}
        userData={editModalData}
      />
    </div>
    </>
  );
}

export default UsersList;
