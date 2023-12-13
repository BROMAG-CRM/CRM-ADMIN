import { Table } from "antd";
import axios from "axios";
import { get} from "lodash";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
const url = import.meta.env.VITE_REACT_APP_URL;
const token = localStorage.getItem("token");



function AssignedCampaigns() {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const { city } = useParams();



const fetchData = async () => {
    try {
const response = await axios.get(`${url}/getassigneddata/${city}`, {
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
  }, []);



 
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
          return <a href={`tel:${data}`} className="text-blue-500">
            {data}
          </a>
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
        return <a href={`tel:${data}`} className="text-blue-500">
        {data}
      </a>;
      },
    }
  ];

  return (
    <>

    <div className="pl-[18vw]  pt-14 w-screen">
      <div className="w-[80vw] pl-20 pt-4 bg-white-70 shadow-md">
      </div>

      <div className="pl-6 w-[80vw]">
        <div className="pt-10">
          <Table
            columns={columnsData.map(column => ({
              ...column,
              onCell: (record) => ({
                record,
                editable: column.editable,
                dataIndex: column.dataIndex,
                title: column.title,
              }),
            }))}
            dataSource={
               data
            }
            scroll={{ x: 1000 }}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default AssignedCampaigns;
