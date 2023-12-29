import { Button, Image, Table,Modal,Input,Form} from "antd";
import axios from "axios";
import { get} from "lodash";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImageModal from "../../Modals/ImageModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
const url = import.meta.env.VITE_REACT_APP_URL;
const token = localStorage.getItem("token");




function Pending() {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()
  const [selectedImage,setSelectedImage] = useState('')
  const [isImageModalOpen,setImageModalOpen] = useState(false)
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const [updated,setUpdated] = useState(false)


const fetchData = async () => {
    try {
const response = await axios.get(`${url}/getform/Partnership`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

      setData(get(response, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);


    //edit function
    const handleEdit = (id) => {
        const userData = data.filter((data)=>data._id === id)
        setEditModalData(userData);
        setEditModalVisible(true);
      };


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



      //business status
      const handleBusinessStatus = async (record) => {
        const id = record._id;
    
        const res = await axios.post(
          `${url}/businessstatus`,
          { userId: id, newBusinessStatus: "legalmanagement" ,leadStatus:"new-lead" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        setUpdated(!updated);
      };
  



  const Partnershipcolumns = [
    {
      title: <h1>S. No</h1>,
      dataIndex: "serialNumber",
      key: "serialNumber",
      align: "center",
      render: (text, record, index) => {
        const pageSize = tableRef.current?.props?.pagination?.pageSize || 5;
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: <h1>Brand Name</h1>,
      dataIndex: "brandName",
      key: "brandName",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Firm Name</h1>,
      dataIndex: "firmName",
      key: "firmName",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Firm Option</h1>,
      dataIndex: "firmOption",
      key: "firmOption",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Pan Card</h1>,
      dataIndex: "panCard",
      key: "panCard",
      align: "center",
      render: (data) => {
        if (!data) {
          console.error('Invalid or empty data:', data);
          return null;
        }
      
        const handleViewImage = (imageUrl) => {
          console.log(imageUrl);
          console.log("View Image");
      
          setSelectedImage(imageUrl);
          setImageModalOpen(true);
        };
      
        const handleCloseImageModal = () => {
          setImageModalOpen(false);
          setSelectedImage(null);
        };
      
        return (
          <div style={{ maxWidth: '300px', overflow: 'hidden' }}>
            <Button onClick={() => handleViewImage(data)}>View Image</Button>
            <ImageModal isOpen={isImageModalOpen} onClose={handleCloseImageModal} imageUrl={selectedImage} />
          </div>
        );

      },
    },
    {
      title: <h1>Gst Copy</h1>,
      dataIndex: "gstCopy",
      key: "gstCopy",
      align: "center",
      render: (data) => {
        if (!data) {
          console.error('Invalid or empty data:', data);
          return null;
        }
      
        const handleViewImage = (imageUrl) => {
          console.log(imageUrl);
          console.log("View Image");
      
          setSelectedImage(imageUrl);
          setImageModalOpen(true);
        };
      
        const handleCloseImageModal = () => {
          setImageModalOpen(false);
          setSelectedImage(null);
        };
      
        return (
          <div style={{ maxWidth: '300px', overflow: 'hidden' }}>
            <Button onClick={() => handleViewImage(data)}>View Image</Button>
            <ImageModal isOpen={isImageModalOpen} onClose={handleCloseImageModal} imageUrl={selectedImage} />
          </div>
        );

      },
    },
    {
      title: <h1>FSSAI</h1>,
      dataIndex: "fss",
      key: "fss",
      align: "center",
      render: (data) => {
        if (!data) {
          console.error('Invalid or empty data:', data);
          return null;
        }
      
        const handleViewImage = (imageUrl) => {
          console.log(imageUrl);
          console.log("View Image");
      
          setSelectedImage(imageUrl);
          setImageModalOpen(true);
        };
      
        const handleCloseImageModal = () => {
          setImageModalOpen(false);
          setSelectedImage(null);
        };
      
        return (
          <div style={{ maxWidth: '300px', overflow: 'hidden' }}>
            <Button onClick={() => handleViewImage(data)}>View Image</Button>
            <ImageModal isOpen={isImageModalOpen} onClose={handleCloseImageModal} imageUrl={selectedImage} />
          </div>
        );

      },
    },
    {
      title: <h1>Cancel Cheque</h1>,
      dataIndex: "cancelCheck",
      key: "cancelCheck",
      align: "center",
      render: (data) => {
        if (!data) {
          console.error('Invalid or empty data:', data);
          return null;
        }
      
        const handleViewImage = (imageUrl) => {
          console.log(imageUrl);
          console.log("View Image");
      
          setSelectedImage(imageUrl);
          setImageModalOpen(true);
        };
      
        const handleCloseImageModal = () => {
          setImageModalOpen(false);
          setSelectedImage(null);
        };
      
        return (
          <div style={{ maxWidth: '300px', overflow: 'hidden' }}>
            <Button onClick={() => handleViewImage(data)}>View Image</Button>
            <ImageModal isOpen={isImageModalOpen} onClose={handleCloseImageModal} imageUrl={selectedImage} />
          </div>
        );

      },
    },
    {
      title: <h1>Table Counts</h1>,
      dataIndex: "tableCount",
      key: "tableCount",
      align: "center",
      render: (data) => {
        return (
          <>
            {data.map((res, i) => {
              return (
                <div className="flex gap-2" key={i}>
                  <p>Table Count-{res.tableCount}</p>
                  <p>Seaters-{res.seaters}</p>
                </div>
              );
            })}
          </>
        );
      },
    },
    {
      title: <h1>Table Images</h1>,
      dataIndex: "tablePhotos",
      key: "tablePhotos",
      align: "center",
      render: (data) => {
        if (!data || !Array.isArray(data) || data.length === 0) {
          console.error('Invalid or empty data:', data);
          return null;
        }
    
        const handleViewImage = (imageUrl) => {
          setSelectedImage(imageUrl);
          setImageModalOpen(true);
        };
    
        const handleCloseImageModal = () => {
          setImageModalOpen(false);
          setSelectedImage(null);
        };
    
        return (
              <div style={{ maxWidth: '300px', overflow: 'hidden'}}>
                <Button onClick={() => handleViewImage(data)}>View Images</Button>
            <ImageModal isOpen={isImageModalOpen} onClose={handleCloseImageModal} imageUrl={selectedImage} />
          </div>
        );
      },
    },
    {
      title: <h1>Billing Software</h1>,
      dataIndex: "billingSoftware",
      key: "billingSoftware",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Online Aggregator</h1>,
      dataIndex: "onlineAggregator",
      key: "onlineAggregator",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Aggregator List</h1>,
      dataIndex: "onlineAggregatersList",
      key: "onlineAggregatersList",
      align: "center",
      render: (data) => {
        return (
          <>
            {data.length > 0 ? (
              data.map((res, i) => (
                <div className="flex gap-2 items-center justify-center" key={i}>
                  <p>{res.aggregateName}</p>
                </div>
              ))
            ) : (
              <p className="text-center">No list</p>
            )}
          </>
        );
      },
    },
    {
      title: <h1>Two Wheeler Parking</h1>,
      dataIndex: "twoWheelerparking",
      key: "twoWheelerparking",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Two Wheeler Slots</h1>,
      dataIndex: "twoWheelerSlot",
      key: "twoWheelerSlot",
      align: "center",
      render: (data) => {
        return <>{data === undefined ? <p>No slots</p> : <p>{data}</p>}</>;
      },
    },
    {
      title: <h1>Four Wheeler Parking</h1>,
      dataIndex: "fourWheelerparking",
      key: "fourWheelerparking",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Four Wheeler Slots</h1>,
      dataIndex: "fourWheelerSlot",
      key: "fourWheelerSlot",
      align: "center",
      render: (data) => {
        return <>{data === undefined ? <p>No slots</p> : <p>{data}</p>}</>;
      },
    },
    {
      title: <h1>Restaurant Mobile Number</h1>,
      dataIndex: "restaurantMobileNumber",
      key: "restaurantMobileNumber",
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
      title: <h1>Contact Person Name</h1>,
      dataIndex: "contactPersonname",
      key: "contactPersonname",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Contact Person Number</h1>,
      dataIndex: "contactPersonNumber",
      key: "contactPersonNumber",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Designation</h1>,
      dataIndex: "designation",
      key: "designation",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Domain</h1>,
      dataIndex: "domain",
      key: "domain",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Domain Name</h1>,
      dataIndex: "domainName",
      key: "domainName",
      align: "center",
      render: (data) => {
        return <>{data === undefined ? <p>no</p> : <p>{data}</p>}</>;
      },
    },
    {
      title: <h1>Trade Mark</h1>,
      dataIndex: "tradeMark",
      key: "tradeMark",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Trade Images</h1>,
      dataIndex: "tradePhotos",
      key: "tradePhotos",
      align: "center",
      render: (data) => {
        if (!data || !Array.isArray(data) || data.length === 0) {
          console.error('Invalid or empty data:', data);
          return null;
        }
    
        const handleViewImage = (imageUrl) => {
          setSelectedImage(imageUrl);
          setImageModalOpen(true);
        };
    
        const handleCloseImageModal = () => {
          setImageModalOpen(false);
          setSelectedImage(null);
        };
    
        return (
          <div style={{ maxWidth: '300px', overflow: 'hidden'}}>
            <Button onClick={() => handleViewImage(data)}>View Images</Button>
        <ImageModal isOpen={isImageModalOpen} onClose={handleCloseImageModal} imageUrl={selectedImage} />
      </div>
    );
      },
    },
    {
      title: <h1>DLT</h1>,
      dataIndex: "dld",
      key: "dld",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>DLT Email</h1>,
      dataIndex: "dldEmail",
      key: "dldEmail",
      align: "center",
      render: (data) => {
        return <>{data === undefined ? <p>no</p> : <p>{data}</p>}</>;
      },
    },
    {
      title: <h1>DLT Password</h1>,
      dataIndex: "dldPassword",
      key: "dldPassword",
      align: "center",
      render: (data) => {
        return <>{data === undefined ? <p>no</p> : <p>{data}</p>}</>;
      },
    },
    {
      title: <h1>Status</h1>,
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Address</h1>,
      dataIndex: "address",
      key: "address",
      align: "center",
      render: (data) => {
        return (
          <div>
            {data.map((res, i) => {
              return (
                <div key={i}>
                  <p> Door:{res.doorNo}</p>
                  <p> Area:{res.areaName}</p>
                  <p> Landmark:{res.landMark}</p>
                  <p> City:{res.locationCity}</p>
                  <p> Pincode:{res.pinCode}</p>
                  <p> State:{res.state}</p>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: <h1>Auto Location</h1>,
      dataIndex: "location",
      key: "location",
      align: "center",
      render: (data) => {
        return (
            <div className="w-[14vw] ml-12 text-center">
            {data && data.length > 0 ? (
              data.map((res, i) => (
                <div key={i} >
                  <p> Longitude:{res.latitude}</p>
                  <p> Latitude:{res.longitude}</p>
                  <p> Location Name:{res.locationName}</p>
                </div>
              ))
            ) : (
              <p>No location data available</p>
            )}
          </div>
        );
      },
    },
    {
        title: <h1>Created At</h1>,
        dataIndex: "createdDate",
        key: "createdDate",
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
            <div>
              <EditOutlined
                key={`edit-${data._id}`}
                style={{ fontSize: '18px', marginRight: '20px', fontWeight: 'bold', cursor: 'pointer',}}
                onClick={() => handleEdit(data._id)}
              />
              <DeleteOutlined
                key={`delete-${data._id}`}
                style={{ fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => handleDelete(data._id)}
              />
            </div>
          );
        },
      },
      {
        title: <h1>Move to Completed</h1>,
        dataIndex: "businessStatus",
        key: "businessStatus",
        align: "center",
        render: (data, record) => (
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => handleBusinessStatus(record)}
          >
            Okay
          </Button>
        ),
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
        const response = await axios.post(`${url}/updateform/${userId}`, updatedData, {
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
            <Form.Item label="PanCard" name="panCard">
              <Input />
            </Form.Item>
            <Form.Item label="GST Copy" name="gstCopy">
              <Input />
            </Form.Item>
            <Form.Item label="FSSAI" name="fss">
              <Input />
            </Form.Item>
            <Form.Item label="Cancel Check" name="cancelCheck">
              <Input />
            </Form.Item>
            <Form.Item label="Table Count" name="tableCount">
              <Input />
            </Form.Item>
            <Form.Item label="Table Photos" name="tablePhotos">
              <Input />
            </Form.Item>
            <Form.Item label="Billing Software" name="billingSoftware">
              <Input />
            </Form.Item>
            <Form.Item label="Online Aggregator" name="onlineAggregator">
              <Input />
            </Form.Item>
            <Form.Item label="Aggregator List" name="onlineAggregatersList">
              <Input />
            </Form.Item>
            <Form.Item label="Two Wheeler Parking" name="twoWheelerparking">
              <Input />
            </Form.Item>
            <Form.Item label="Two Wheeler Slots" name="twoWheelerSlot">
              <Input />
            </Form.Item>
            <Form.Item label="Four Wheeler Parking" name="fourWheelerparking">
              <Input />
            </Form.Item>
            <Form.Item label="Four Wheeler Slots" name="fourWheelerSlot">
              <Input />
            </Form.Item>
            <Form.Item label="Restaurant Mobile Number" name="restaurantMobileNumber">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Contact Person Name" name="contactPersonname">
              <Input />
            </Form.Item>
            <Form.Item label="Contact Person Number" name="contactPersonNumber">
              <Input />
            </Form.Item>
            <Form.Item label="Designation" name="designation">
              <Input />
            </Form.Item>
            <Form.Item label="Domain" name="domain">
              <Input />
            </Form.Item>
            <Form.Item label="tradeMark" name="tradeMark">
              <Input />
            </Form.Item>
            <Form.Item label="Trade Photos" name="tradePhotos">
              <Input />
            </Form.Item>
            <Form.Item label="DLT Email" name="dldEmail">
              <Input />
            </Form.Item>
            <Form.Item label="DLT Password" name="dldPassword">
              <Input />
            </Form.Item>
            <Form.Item label="DLT" name="dld">
              <Input />
            </Form.Item>
            <Form.Item label="Status" name="status">
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Auto Location" name="location">
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

<div className="pt-28 w-screen ml-2">
      <div className="w-[80vw] pl-20 pt-4 bg-white-70 shadow-md"></div>
      <div className="w-[100vw]">
      <Button className="text-white bg-black mt-4" onClick={() => navigate(-1)}>Go Back</Button>
        <div className="pt-3">
          <Table
            columns={Partnershipcolumns}
            dataSource={data}
            scroll={{ x: 7000 }}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
            onChange={handleTableChange}
            className="w-full"
            bordered
            style={{  background: 'white' }}
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

export default Pending;
