import { Table,Input} from "antd";
import axios from "axios";
import { get} from "lodash";
import { useEffect, useState, useRef } from "react";
const url = import.meta.env.VITE_REACT_APP_URL;
const token = localStorage.getItem("token");
import FollowUpModal from "./FollowUpModal";




function FollowUpLeads() {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const [activeRow, setActiveRow] = useState(null);
  const [followUpModalVisible, setFollowUpModalVisible] = useState(false);
  const [selectedFollowUpDate, setSelectedFollowUpDate] = useState(null);
  const [selectedFollowUpTime, setSelectedFollowUpTime] = useState(null);


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
  }, []);

  const handleStatusChange = (value, record) => {
    if (value === "follow-up") {
      setActiveRow(record.key);
      setFollowUpModalVisible(true);
    } else {
      setActiveRow(null);
      setFollowUpModalVisible(false);
    }
  };


  const handleFollowUpDateChange = (date) => {
    setSelectedFollowUpDate(date);
  };

  const handleFollowUpTimeChange = (time) => {
    setSelectedFollowUpTime(time);
  };

  const handleFollowUpModalClose = () => {
    setActiveRow(null);
    setFollowUpModalVisible(false);
    console.log("Selected Date:", selectedFollowUpDate.format("YYYY-MM-DD"));
    console.log("Selected Time:", selectedFollowUpTime.format("HH:mm"));
};


const handleDescriptionChange = async (value, data) => {
  try {
    const response = await axios.post(
      `${url}/updatedescription`,
      { value, id: data._id }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};




  
  const columnsData = [
    {
        title: <h1>FollowUp Date</h1>,
        dataIndex: "designation",
        key: "designation",
        align: "center",
        render: (data) => {
          return <p>12/12/12</p>;
        },
      },
      {
        title: <h1>FollowUp Time</h1>,
        dataIndex: "designation",
        key: "designation",
        align: "center",
        render: (data) => {
          return <p>00:00</p>;
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
      render: (data, record) => (
        <>
          <select
            value={data}
            onChange={(e) => handleStatusChange(e.target.value, record)}
          >
            <option value=""></option>
            <option value="follow-up">Follow-up</option>
            <option value="connected">Connected</option>
            <option value="not-connected">Not Connected</option>
          </select>
        </>
      ),
    },
    {
        title: <h1>Description</h1>,
        dataIndex: "designation",
        key: "designation",
        align: "center",
        render: (data) => {
          return <p>description</p>;
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
            columns={columnsData.map((column) => ({
              ...column,
              onCell: (record) => ({
                record,
                editable: column.editable,
                dataIndex: column.dataIndex,
                title: column.title,
              }),
            }))}
            dataSource={data}
            scroll={{ x: 2000 }}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>

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

export default FollowUpLeads;
