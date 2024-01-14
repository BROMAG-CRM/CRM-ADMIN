import { Button, Image, Table, Input, Select } from "antd";
import axios from "axios";
import { debounce, get } from "lodash";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImageModal from "../Modals/ImageModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const url = import.meta.env.VITE_REACT_APP_URL;
const { Option } = Select;

function LeadFormNew() {
  const token = localStorage.getItem("token");
  const { Search } = Input;
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [searchPartner, setsearchPartner] = useState("");
  const [updated, setUpdated] = useState(false);



  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/getformforemployee`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sortedData = get(response, "data.data", []).sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );

      setData(sortedData);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, [updated]);




  //status function
  const handleStatusChange = async (value, record) => {
    console.log(value);
    console.log(record);

    await axios.post(
      `${url}/updatestatus`,
      { value: value, id: record._id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUpdated(!updated);
  };




  //search function
  const handleSearchPartnership = (value) => {
    const filteredData = data.filter((item) => {
      console.log(value, item.city, "wehgjhv");
      return (
        item.brandName.toLowerCase().includes(value.toLowerCase()) ||
        item.EmployeeName.toLowerCase().includes(value.toLowerCase())
      );
    });
    setsearchPartner(filteredData);
  };
  const debouncedSearch = debounce(handleSearchPartnership, 300);




  //edit function
  const handleEdit = (id) => {
    // const userData = data.filter((data)=>data._id === id)
    const url = `/editleadform?param1=editwholeform&id=${encodeURIComponent(id)}`;

    // Navigating to the new URL
    navigate(url)
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
      title: <h1>Created At</h1>,
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
      render: (data) => {
        const formattedDate = new Date(data).toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });
        return formattedDate;
      },
    },
    {
      title: <h1>Employee Name</h1>,
      dataIndex: "EmployeeName",
      key: "EmployeeName",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
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
          console.error("Invalid or empty data:", data);
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
          <div style={{ maxWidth: "300px", overflow: "hidden" }}>
            <Button onClick={() => handleViewImage(data)}>View Image</Button>
            <ImageModal
              isOpen={isImageModalOpen}
              onClose={handleCloseImageModal}
              imageUrl={selectedImage}
            />
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
          console.error("Invalid or empty data:", data);
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
          <div style={{ maxWidth: "300px", overflow: "hidden" }}>
            <Button onClick={() => handleViewImage(data)}>View Image</Button>
            <ImageModal
              isOpen={isImageModalOpen}
              onClose={handleCloseImageModal}
              imageUrl={selectedImage}
            />
          </div>
        );
      },
    },
    {
      title: <h1>FSS</h1>,
      dataIndex: "fss",
      key: "fss",
      align: "center",
      render: (data) => {
        if (!data) {
          console.error("Invalid or empty data:", data);
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
          <div style={{ maxWidth: "300px", overflow: "hidden" }}>
            <Button onClick={() => handleViewImage(data)}>View Image</Button>
            <ImageModal
              isOpen={isImageModalOpen}
              onClose={handleCloseImageModal}
              imageUrl={selectedImage}
            />
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
          console.error("Invalid or empty data:", data);
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
          <div style={{ maxWidth: "300px", overflow: "hidden" }}>
            <Button onClick={() => handleViewImage(data)}>View Image</Button>
            <ImageModal
              isOpen={isImageModalOpen}
              onClose={handleCloseImageModal}
              imageUrl={selectedImage}
            />
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
          console.error("Invalid or empty data:", data);
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
          <div style={{ maxWidth: "300px", overflow: "hidden" }}>
            <Button onClick={() => handleViewImage(data)}>View Images</Button>
            <ImageModal
              isOpen={isImageModalOpen}
              onClose={handleCloseImageModal}
              imageUrl={selectedImage}
            />
          </div>
        );
      },
    },
    {
      title: <h1>Menu</h1>,
      dataIndex: "menuPhotos",
      key: "menuPhotos",
      align: "center",
      render: (data) => {
        if (!data || !Array.isArray(data) || data.length === 0) {
          console.error("Invalid or empty data:", data);
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
          <div style={{ maxWidth: "300px", overflow: "hidden" }}>
            <Button onClick={() => handleViewImage(data)}>View Images</Button>
            <ImageModal
              isOpen={isImageModalOpen}
              onClose={handleCloseImageModal}
              imageUrl={selectedImage}
            />
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
          console.error("Invalid or empty data:", data);
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
          <div style={{ maxWidth: "300px", overflow: "hidden" }}>
            <Button onClick={() => handleViewImage(data)}>View Images</Button>
            <ImageModal
              isOpen={isImageModalOpen}
              onClose={handleCloseImageModal}
              imageUrl={selectedImage}
            />
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
      title: <h1>Update Status</h1>,
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (data, record) => (
        <>
          <Select
            placeholder="Select Status"
            value={data}
            onChange={(value) => handleStatusChange(value, record)}
            style={{ width: 100 }}
          >
            <Option value="Hot">Hot</Option>
            <Option value="Warm">Warm</Option>
            <Option value="Cold">Cold</Option>
          </Select>
        </>
      ),
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
                <div key={i}>
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
      title: <h1>Actions</h1>,
      align: "center",
      render: (data) => {
        return (
          <>
            <EditOutlined
              key={`edit-${data._id}`}
              style={{ fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => handleEdit(data._id)}
            />
            {/* <DeleteOutlined
              key={`delete-${data._id}`}
              style={{ fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => handleDelete(data._id)}
            /> */}
          </>
        );
      },
    },
  ];

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <>
      <div className="pt-14 w-screen">
        <div className="p-5 w-[100vw]  pt-4 bg-white-70 shadow-md flex justify-end">
          <Button
            onClick={() => navigate("/createnewlead")}
            className="bg-amber-600 text-white rounded-2xl h-[6vh] text-lg"
          >
            Add New Lead
          </Button>
        </div>
        <div className="p-5 w-[100vw]">
          <Search
            placeholder="Search by Brand Name or Employee Name..."
            onChange={(e) => debouncedSearch(e.target.value)}
            enterButton
            className="mt-4 w-[60%] mb-5 ml-5"
            size="large"
          />
          <div className="pt-7">
            <Table
              columns={Partnershipcolumns}
              dataSource={searchPartner.length > 0 ? searchPartner : data}
              scroll={{ x: 8000 }}
              ref={tableRef}
              pagination={{ pageSize: 5 }}
              onChange={handleTableChange}
              className="w-full"
              bordered
              style={{ background: "white" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadFormNew;
