import { Button, Form, Image, Input, Modal, notification, Select, Table } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import { get, debounce } from "lodash";
import React, { useEffect, useState, useRef } from "react";
const url = import.meta.env.VITE_REACT_APP_URL;
const token = localStorage.getItem("token");
import toast, { Toaster } from 'react-hot-toast';



function UsersList() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const [updated,setUpdated] = useState(false)


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

 




  const columnsData = [
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
        const formattedDate = new Date(data).toLocaleString();
        return formattedDate
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


  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editModalData, setEditModalData] = useState(null);

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

  const handleEdit = (id) => {
    const userData = data.filter((data)=>data._id === id)
    setEditModalData(userData);
    setEditModalVisible(true);
  };

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
          <Table
            columns={columnsData}
            dataSource={
               data
            }
            scroll={{ x: 1000 }}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
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
