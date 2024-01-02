import { Table,Input, Select, Button, Form, Modal, message, Upload} from "antd";
import axios from "axios";
import { get} from "lodash";
import { useEffect, useState, useRef } from "react";
const url = import.meta.env.VITE_REACT_APP_URL;
import FollowUpModal from "../../../Modals/FollowUpModal";
import { useNavigate } from "react-router-dom";
import FeatureModal from "../../../Modals/FeatureModal";
import { UploadOutlined } from "@ant-design/icons";
import CallRecordModal from "../../../Modals/CallRecordModal";
const { Option } = Select;




function NewLeads() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const [activeRow, setActiveRow] = useState(null);
  const [followUpModalVisible, setFollowUpModalVisible] = useState(false);
  const [selectedFollowUpDate, setSelectedFollowUpDate] = useState(null);
  const [selectedFollowUpTime, setSelectedFollowUpTime] = useState(null);
  const [statusId,setStatusId] = useState()
  const [statusValue,setStatusValue] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [form] = Form.useForm();
  const [updated,setUpdated] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()
  const [isModalOpen,setModalOpen] = useState(false)
  const [selectedFeatures,setSelectedFeatures] = useState([])
  const [selectedCallRecords,setSelectedCallRecords] = useState([])
  const [isCallRecordsModalOpen,setCallRecordsModalOpen] = useState(false)




const fetchData = async () => {
    try {
const response = await axios.get(`${url}/booksnewleadinmarketing`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

      setData(get(response, "data.data", []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [updated]);


//status function
  const handleStatusChange = async(value, record) => {

    console.log(value);
    console.log(record);

    if (value === "follow-up") {
      setStatusValue(value)
      setStatusId(record._id)
      setActiveRow(record.key);
      setFollowUpModalVisible(true);
    } else {
      await axios.post(`${url}/updatebooksstatus`,{value:value,id:record._id}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setActiveRow(null);
      setFollowUpModalVisible(false);
      setUpdated(!updated)
    }
  }


  const handleFollowUpDateChange = (date) => {
    setSelectedFollowUpDate(date);
  };

  const handleFollowUpTimeChange = (time) => {
    setSelectedFollowUpTime(time);
  };

const handleFollowUpModalClose = async () => {
  try {
    setActiveRow(null);
    setFollowUpModalVisible(false);

    if (selectedFollowUpDate && selectedFollowUpTime) {
      
      const date = selectedFollowUpDate.format("YYYY-MM-DD");
      const time = selectedFollowUpTime.format("HH:mm");

      await axios.post(
        `${url}/followupdetails`,
        { time: time, date: date, id: statusId, value: statusValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdated(!updated)
      console.log("Follow-up details posted successfully!");
    } else {
      console.log("selectedFollowUpDate or selectedFollowUpTime is null or undefined.");
    }
  } catch (err) {
    console.error("Error during follow-up details posting:", err);
  }
};



//new Lead Feature function
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
      `${url}/addnewleadfeature`,
      {featureName: values.feature, featureDescription: values.featureDescription, id: selectedRowData._id},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });
  setUpdated(!updated)
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
    // {
    //   title: <h1>Add Features</h1>,
    //   dataIndex: "newLeadFeatures",
    //   key: "newLeadFeatures",
    //   align: "center",
    //   render: (data, record) => (
    //     <Button type="primary" style={{ backgroundColor: "blueviolet" }} onClick={() => handleButtonClick(record)}>
    //       Add
    //     </Button>
    //   ),
    // },
    // {
    //   title: <h1>Features</h1>,
    //   dataIndex: "newLeadFeatures",
    //   key: "newLeadFeatures",
    //   align: "center",
    //   render: (data) => {
    //     const handleViewFeatures = (features) => {
    //       setSelectedFeatures(features);
    //       setModalOpen(true);
    //     };

    //     const handleCloseModal = () => {
    //       setModalOpen(false);
    //       setSelectedFeatures([]);
    //     };
    //     return (
    //       <div style={{ maxWidth: "300px", overflow: "hidden" }}>
    //         <Button onClick={() => handleViewFeatures(data)}>
    //           View Features
    //         </Button>
    //         <FeatureModal
    //           isOpen={isModalOpen}
    //           onClose={handleCloseModal}
    //           features={selectedFeatures}
    //         />
    //       </div>
    //     );
    //   },
    // },
    {
      title: <h1>Upload Call Record</h1>,
      dataIndex: "audio",
      key: "audio",
      align: "center",
      render: (data, record) => {
        const props = {
          name: "file",
          action: `${url}/uploadcallrecord/${record._id}`,
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
              `${url}/uploadcallrecord/${record._id}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            const newFileUrl = response.data.fileUrl;

            // Update the data state with the new audio file URL
            setData((prevData) => {
              const newData = prevData.map((item) =>
                item._id === record._id
                  ? {
                      ...item,
                      callRecord: [...(item.callRecord || []), newFileUrl],
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
              <Button icon={<UploadOutlined />}>Upload Audio</Button>
            </Upload>
          </div>
        );
      },
    },
    {
      title: <h1>Play Call Records</h1>,
      dataIndex: 'callRecord',
      key: 'callRecord',
      align: 'center',
      render: (data) => {
        if (!data || !Array.isArray(data) || data.length === 0) {
          console.error('Invalid or empty data array:', data);
          return null;
        }

        const handleViewCallRecords = (callRecords) => {
          setSelectedCallRecords(callRecords);
          setCallRecordsModalOpen(true);
        };
        
        const handleCloseCallRecordsModal = () => {
          setCallRecordsModalOpen(false);
          setSelectedCallRecords([]);
        };
    
        return (
          <div style={{ maxWidth: '300px', overflow: 'hidden' }}>
            <Button onClick={() => handleViewCallRecords(data)}>View Call Records</Button>
            <CallRecordModal isOpen={isCallRecordsModalOpen} onClose={handleCloseCallRecordsModal} callRecords={selectedCallRecords} />
          </div>

        );
      },
    },
    {
      title: <h1>Status</h1>,
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (data, record) => (
        <>
          <Select
            placeholder="Select Status"
            value={data}
            onChange={(value) => handleStatusChange(value, record)}
          >
            <Option value="follow-up">Follow-up</Option>
            <Option value="connected">Connected</Option>
            <Option value="not-connected">Not Connected</Option>
          </Select>
        </>
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
      <Button className="text-white bg-black mt-4" onClick={() => navigate(-1)}>Go Back</Button>
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
            style={{  background: 'white' }}
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
          <Button key="newLeadFeatures" type="primary" style={{ backgroundColor: "green" }} onClick={handleAddFeature}>
            Add Feature
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Feature" name="feature" rules={[{ required: true, message: 'Please select a feature' }]}>
            <Select placeholder="Select a feature">
              <Option value="Self Introduction">Self Introduction</Option>
              <Option value="About Restaurant">About Restaurant</Option>
              <Option value="About Bromag">About Bromag</Option>
              <Option value="About Product">About Product</Option>
              <Option value="Feedback">Feedback</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Feature Description" name="featureDescription" rules={[{ required: true, message: 'Please enter a feature description' }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      <FollowUpModal
        visible={followUpModalVisible}
        onClose={handleFollowUpModalClose}
        onDateChange={handleFollowUpDateChange}
        onTimeChange={handleFollowUpTimeChange}
      />
    </div>
    </>
  );
}

export default NewLeads;
