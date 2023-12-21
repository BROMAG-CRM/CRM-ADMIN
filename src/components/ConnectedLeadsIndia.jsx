import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table, Upload, message} from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { get} from "lodash";
import { useEffect, useState, useRef } from "react";
import FeatureModal from "./FeatureModal";
const url = import.meta.env.VITE_REACT_APP_URL;
const token = localStorage.getItem("token");






function ConnectedLeadsIndia() {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [update,setUpdate] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

const fetchData = async () => {
    try {
const response = await axios.get(`${url}/connectedleadsdataindia`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

      setData(get(response, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  } 



  useEffect(() => {
    fetchData();
  }, [update]);

  console.log(data);



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
      `${url}/addfeature`,
      {featureName: values.feature, featureDescription: values.featureDescription, id: selectedRowData._id},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });
};
    //  setUpdate(!update)

//business status
const handleBusinessStatus = async (record)=>{


  const id = record._id

  const res = await axios.post(
    `${url}/businessstatus`,
    {userId:id,newBusinessStatus:"telesales"},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(res);
  setUpdate(!update)
}



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
      title: <h1>Description</h1>,
      dataIndex: "leadDescription",
      key: "leadDescription",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
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
      dataIndex: "features",
      key: "features",
      align: "center",
      render: (data, record) => (
        <Button type="primary" style={{ backgroundColor: "blueviolet" }} onClick={() => handleButtonClick(record)}>
          Add
        </Button>
      ),
    }, 
    {
      title: <h1>Upload Call Record</h1>,
      dataIndex: "audio",
      key: "audio",
      align: "center",
      render: (data, record) => {
        const props = {
          name: 'file',
          action: `${url}/uploadcallrecord/${record._id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onChange(info) {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          },
        };
    
        const onUpload = async (options) => {
          const { file } = options;
    
          const formData = new FormData();
          formData.append('file', file);
    
          try {
            const response = await axios.post(
              `${url}/uploadcallrecord/${record._id}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
    
            const newFileUrl = response.data.fileUrl;
    
            // Update the data state with the new audio file URL
            setData((prevData) => {
              const newData = prevData.map((item) =>
                item._id === record._id
                  ? { ...item, callRecord: [...(item.callRecord || []), newFileUrl] }
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
                <Button icon={<UploadOutlined />}>Upload Audio</Button>
              </Upload>
            
          </div>
        );
      },
    },
    {
      title: <h1>Play Call Records</h1>,
      dataIndex: "callRecord",
      key: "callRecord",
      align: "center",
      render: (data) => {
        if (!data || !Array.isArray(data) || data.length === 0) {
          console.error('Invalid or empty data array:', data);
          return null;
        }
    
        const mimeTypes = {
          mp3: 'audio/mp3',
          ogg: 'audio/ogg',
          wav: 'audio/wav',
          // Add more supported audio formats as needed
        };
    
        const getFileExtension = (filename) => {
          if (filename) {
            return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
          }
          return '';
        };
    
        return (
          <div>
            {data.map((audioUrl, index) => {
              if (!audioUrl) {
                console.error('Invalid audio URL at index', index);
                return null;
              }
    
              const fileExtension = getFileExtension(audioUrl);
              const fileType = mimeTypes[fileExtension] || 'audio/*';
        
              // Generate a unique key based on the audio URL
              const key = `audioKey_${index}`;
        
              console.log('Audio URL:', audioUrl);
        
              return (
                <div key={key}>
                  <audio controls>
                    <source src={audioUrl} type={fileType} />
                    Your browser does not support the audio tag.
                  </audio>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: <h1>Features</h1>,
      dataIndex: "features",
      key: "features",
      align: "center",
      render: (data) => {

        const handleViewFeatures = (features) => {
          setSelectedFeatures(features);
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
      title: <h1>Move to Telesales</h1>,
      dataIndex: "businessStatus",
      key: "businessStatus",
      align: "center",
      render: (data, record) => (
        <Button type="primary" style={{ backgroundColor: "green" }} onClick={() => handleBusinessStatus(record)}>
          Okay
        </Button>
      ),
    }, 
    
  ]

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <>


<div className="pl-[18vw]  pt-14 w-screen">
      <div className="w-[80vw] pl-20 pt-4 bg-white-70 shadow-md"></div>
      <div className="pl-6 w-[80vw]">
        <div className="pt-10">
          <Table
            columns={columnsData}
            dataSource={data}
            scroll={{ x: 3000 }}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
            onChange={handleTableChange}
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
          <Button key="addFeature" type="primary" style={{ backgroundColor: "green" }} onClick={handleAddFeature}>
            Add Feature
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Feature" name="feature" rules={[{ required: true, message: 'Please select a feature' }]}>
            <Select placeholder="Select a feature description">
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
            </Select>
          </Form.Item>
          <Form.Item label="Feature Description" name="featureDescription" rules={[{ required: true, message: 'Please enter a feature description' }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>



    </div>
    </>
  );
}

export default ConnectedLeadsIndia;
