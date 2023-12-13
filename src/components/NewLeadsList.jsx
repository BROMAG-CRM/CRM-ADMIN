import { Table,Input} from "antd";
import axios from "axios";
import { get} from "lodash";
import { useEffect, useState, useRef } from "react";
const url = import.meta.env.VITE_REACT_APP_URL;
const token = localStorage.getItem("token");
import FollowUpModal from "./FollowUpModal";




function NewLeadsList() {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const [activeRow, setActiveRow] = useState(null);
  const [followUpModalVisible, setFollowUpModalVisible] = useState(false);
  const [selectedFollowUpDate, setSelectedFollowUpDate] = useState(null);
  const [selectedFollowUpTime, setSelectedFollowUpTime] = useState(null);
  const [statusId,setStatusId] = useState()
  const [statusValue,setStatusValue] = useState()


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

  const handleStatusChange = async(value, record) => {

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
    }

  }


  const handleFollowUpDateChange = (date) => {
    setSelectedFollowUpDate(date);
  };

  const handleFollowUpTimeChange = (time) => {
    setSelectedFollowUpTime(time);
  };

  const handleFollowUpModalClose = async() => {

    try {
    setActiveRow(null);
    setFollowUpModalVisible(false);

    const date = selectedFollowUpDate.format("YYYY-MM-DD")
    const time = selectedFollowUpTime.format("HH:mm")

      await axios.post(
         `${url}/followupdetails`,
         { time:time,date:date,id:statusId,value:statusValue }, 
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
  } catch (err) { 
    console.log(err);
  }
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
          <select
            value={data}
            onChange={(e) => handleStatusChange(e.target.value, record)}
          >
            <option value="connected">New Lead</option>
            <option value="connected">Connected</option>
            <option value="not-connected">Not Connected</option>
            <option value="follow-up">Follow-up</option>
          </select>
        </>
      ),
    },
    {
        title: <h1>Description</h1>,
        dataIndex: "description",
        key: "description",
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
            scroll={{ x: 1000 }}
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

export default NewLeadsList;
