import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Upload,
  message,
  notification,
} from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { get } from "lodash";
import { useEffect, useState, useRef } from "react";
import FeatureModal from "../../../Modals/FeatureModal";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_REACT_APP_URL;
import { UploadOutlined, CameraOutlined } from '@ant-design/icons';

function Connected() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);



  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/indiaconnectedinbdm`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(get(response, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [update]);


  console.log(data);




 //location function

 const getLocationName = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    const data = response.data;
    const locationName = data.display_name;
    return locationName;
  } catch (error) {
    console.error('Error getting location name:', error.message);
    return null;
  }
};


const locationAutoFetch = async (record) => {
  try {
    console.log("0");

    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });

    console.log("1");
    const { latitude, longitude } = position.coords;
    const locationName = await getLocationName(latitude, longitude);
    console.log("2");
    setLocation({ latitude, longitude, locationName });

    if (location) {
      console.log("3");
      const formData = {
        location: location
      };

      console.log("4");
      console.log(formData);

      await axios.post(
        `${url}/updatebdmlocation/${record._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("5");
      notification.success({
        message: "Location fetched successfully",
      });

      setUpdate(!update);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};



  //feature function
  const handleButtonClick = (record) => {
    setSelectedRowData(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleAddFeature = async() => {
    form.validateFields().then(async(values) => {
  
      form.resetFields(['featureName', 'featureDescription']);
      handleModalClose();
  
      console.log(values);
       await axios.post(
        `${url}/addbdmfeature`,
        {featureName: values.feature, featureDescription: values.featureDescription, id: selectedRowData._id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     setUpdate(!update)

    });
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
    setUpdate(!update);
  };

  // status function
  const handleStatusChange = async (value, record) => {
    await axios.post(
      `${url}/updateleadstatus`,
      { value: value, id: record._id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUpdate(!update);
  };

  const columnsData = [
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
      title: <h1>Mobile Number</h1>,
      dataIndex: "restaurantMobileNumber",
      key: "restaurantMobileNumber",
      align: "center",
      render: (data) => {
        return (
          <a href={`tel:${data}`} className="text-blue-500">
            {data}
          </a>
        );
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
      title: <h1>Contact Person Name</h1>,
      dataIndex: "contactPersonname",
      key: "contactPersonname",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Contact Person Designation</h1>,
      dataIndex: "designation",
      key: "designation",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Contact Person Mobile Number</h1>,
      dataIndex: "contactPersonNumber",
      key: "contactPersonNumber",
      align: "center",
      render: (data) => {
        return (
          <a href={`tel:${data}`} className="text-blue-500">
            {data}
          </a>
        );
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
      title: <h1>Lead Status</h1>,
      dataIndex: "leadStatus",
      key: "leadStatus",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Add Features</h1>,
      dataIndex: "bdmFeatures",
      key: "bdmFeatures",
      align: "center",
      render: (data, record) => (
        <Button type="primary" style={{ backgroundColor: "blueviolet" }} onClick={() => handleButtonClick(record)}>
          Add
        </Button>
      ),
    },
    {
      title: <h1>Features</h1>,
      dataIndex: "bdmFeatures",
      key: "bdmFeatures",
      align: "center",
      render: (data) => {

        const handleViewFeatures = (videoFeatures) => {
          setSelectedFeatures(videoFeatures);
          setModalOpen(true);
        };
    
        const handleCloseModal = () => {
          setModalOpen(false);
          setSelectedFeatures([]);
        };
    
        return (
          <div style={{ maxWidth: '300px', overflow: 'hidden' }}>
            <Button onClick={() => handleViewFeatures(data)}>View Features</Button>
            <FeatureModal isOpen={isModalOpen} onClose={handleCloseModal} features={selectedFeatures} />
          </div>
        );
      },
    },
    {
      title: <h1>Upload Selfi Image</h1>,
      dataIndex: "photo",
      key: "photo",
      align: "center",
      render: (data, record) => {
        const props = {
          name: "file",
          action: `${url}/uploadselfiphoto/${record._id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onChange(info) {
            if (info.file.status !== "uploading") {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
              message.error(`${info.file.name} file upload failed.`);
            }
          },
        };
    
        const onUpload = async (options) => {
          const { file } = options;
    
          const formData = new FormData();
          formData.append("file", file);
    
          try {
            const response = await axios.post(
              `${url}/uploadselfiphoto/${record._id}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
    
            const newFileUrl = response.data.fileUrl;
            setUpdate(!update);
    
            // Update the data state with the new photo file URL
            setData((prevData) => {
              const newData = prevData.map((item) =>
                item._id === record._id
                  ? {
                      ...item,
                      photo: newFileUrl,
                    }
                  : item
              );
              return newData;
            });
    
            message.success(`${file.name} file uploaded successfully`);
          } catch (error) {
            message.error(`${file.name} file upload failed.`);
          }
        };
    
        return (
          <div>
            <Upload {...props} customRequest={onUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </div>
        );
      },
    },
    {
      title: <h1>Fetch Current Location</h1>,
      dataIndex: "locationBdm",
      key: "locationBdm",
      align: "center",
      render: (data, record) => (
        <Button
          type="primary"
          style={{ backgroundColor: "green" }}
          onClick={() => locationAutoFetch(record)}
        >
          Okay
        </Button>
      ),
    },
    {
      title: <h1>Current Location</h1>,
      dataIndex: "locationBdm",
      key: "locationBdm",
      align: "center",
      render: (data) => {
        if (!data || typeof data !== 'object') {
          return null; // or handle the case when data is undefined or not an object
        }
    
        return (
          <div className="w-[14vw] ml-12 text-center">
            <p>Longitude: {data.latitude}</p>
            <p>Latitude: {data.longitude}</p>
            <p>Location Name: {data.locationName}</p>
          </div>
        );
      },
    },    
    {
      title: <h1>Move to New Lead</h1>,
      dataIndex: "leadStatus",
      key: "leadStatus",
      align: "center",
      render: (data, record) => (
        <Button
          type="primary"
          style={{ backgroundColor: "green" }}
          onClick={() => handleStatusChange("new-lead", record)}
        >
          Okay
        </Button>
      ),
    },
    {
      title: <h1>Move to Legal Management</h1>,
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

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <>
      <div className="pl-[18vw]  pt-14 w-screen">
        <div className="w-[80vw] pl-20 pt-4 bg-white-70 shadow-md"></div>
        <div className="pl-6 w-[80vw]">
          <Button
            className="text-white bg-black mt-4"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <div className="pt-7">
            <Table
              columns={columnsData}
              dataSource={data}
              scroll={{ x: 3000 }}
              ref={tableRef}
              pagination={{ pageSize: 5 }}
              onChange={handleTableChange}
              className="w-full"
              bordered
              style={{ background: "white" }}
            />
          </div>
        </div>

        <Modal
          title="Add New Feature"
          open={modalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="cancel" onClick={handleModalClose}>
              Cancel
            </Button>,
            <Button
              key="addFeature"
              type="primary"
              style={{ backgroundColor: "green" }}
              onClick={handleAddFeature}
            >
              Add Feature
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Feature"
              name="feature"
              rules={[{ required: true, message: "Please select a feature" }]}
            >
              <Select placeholder="Select a feature">
                <Option value="Online Order">Online Order</Option>
                <Option value="Dining">Dining</Option>
                <Option value="Call for Order">Call for Order</Option>
                <Option value="Take Away">Take Away</Option>
                <Option value="Content Banner">Content Banner</Option>
                <Option value="Top Notch">Top Notch</Option>
                <Option value="Vegetarian">Vegetarian</Option>
                <Option value="Non Vegetarian">Non Vegetarian</Option>
                <Option value="Scratch Card">Scratch Card</Option>
                <Option value="Food Review">Food Review</Option>
                <Option value="Others">Others</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Feature Description"
              name="featureDescription"
              rules={[
                {
                  required: true,
                  message: "Please enter a feature description",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default Connected;
