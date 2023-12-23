import { Button, Table} from "antd";
import axios from "axios";
import { get} from "lodash";
import { useEffect, useState, useRef } from "react";
import FeatureModal from "./FeatureModal";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_REACT_APP_URL;
const token = localStorage.getItem("token");




function ProgressConnected() {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const navigate = useNavigate()



const fetchData = async () => {
    try {
const response = await axios.get(`${url}/progressleadsdata`, {
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
            scroll={{ x: 2000 }}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
            onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default ProgressConnected;
