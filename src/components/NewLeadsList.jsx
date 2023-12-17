import { Table,Input, Select, Button, Form, Modal} from "antd";
import axios from "axios";
import { get} from "lodash";
import { useEffect, useState, useRef } from "react";
const url = import.meta.env.VITE_REACT_APP_URL;
const token = localStorage.getItem("token");
import FollowUpModal from "./FollowUpModal";
const { Option } = Select;




function NewLeadsList() {
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





const fetchData = async () => {
    try {
const response = await axios.get(`${url}/getnewleadsdata`, {
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
      await axios.post(`${url}/updateleadstatus`,{value:value,id:record._id}, {
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


//description function
const handleDescriptionChange = async (value, data) => {
  try {
   await axios.post(
      `${url}/updatedescription`,
      { value, id: data._id }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    data.leadDescription = "";
  } catch (err) { 
    console.log(err);
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



  const columnsData = [
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
        title: <h1>Description</h1>,
        dataIndex: "leadDescription",
        key: "leadDescription",
        align: "center",
        render: (data, record) => {
          return (
            <Input.TextArea
              type="text"
              value={data}
              onPressEnter={(e) => handleDescriptionChange(e.target.value, record)}
              className="border border-gray-300 px-2 py-1 rounded-md"
            />
          );
        },
      },
      
  ];

  return (
    <>

<div className="pl-[18vw]  pt-14 w-screen">
      <div className="w-[80vw] pl-20 pt-4 bg-white-70 shadow-md"></div>
      <div className="pl-6 w-[80vw]">
        <div className="pt-10">
          <Table
            columns={columnsData}
            dataSource={data}
            scroll={{ x: 1500 }}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
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

export default NewLeadsList;
