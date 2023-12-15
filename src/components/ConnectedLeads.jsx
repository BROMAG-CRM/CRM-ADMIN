import { Button, Input, Table, Upload, message} from "antd";
import axios from "axios";
import { get} from "lodash";
import { useEffect, useState, useRef } from "react";
const url = import.meta.env.VITE_REACT_APP_URL;
const token = localStorage.getItem("token");
import { UploadOutlined } from '@ant-design/icons';






function ConnectedLeads() {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

const fetchData = async () => {
    try {
const response = await axios.get(`${url}/connectedleadsdata`, {
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
      title: <h1>Description</h1>,
      dataIndex: "leadDescription",
      key: "leadDescription",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Upload Call Record</h1>,
      dataIndex: "uploadCallRecord",
      key: "uploadCallRecord",
      align: "center",
      render: (_, record) => {
        const props = {
          action: `/your-upload-api-endpoint/${record.key}`, // Replace with your actual API endpoint
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
  
        return (
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        );
      },
    },
  ];

  return (
    <>

<style>
      {`
        .no-hover:hover {
          pointer-events: none;
          cursor: default;
        }
      `}
    </style>

<div className="pl-[18vw]  pt-14 w-screen">
      <div className="w-[80vw] pl-20 pt-4 bg-white-70 shadow-md"></div>
      <div className="pl-6 w-[80vw]">
        <div className="pt-10">
          <Table
            columns={columnsData.map((column) => ({
              ...column,
              key:columnsData.key,
              onCell: (record) => ({
                className: 'no-hover',
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
    </div>
    </>
  );
}

export default ConnectedLeads;
