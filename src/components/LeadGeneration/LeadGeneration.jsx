import { Button, Image, Input,Table } from "antd";
import axios from "axios";
import { get, debounce } from "lodash";
import { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
const url = import.meta.env.VITE_REACT_APP_URL;

function LeadGeneration() {

  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const [partnerShipDetails, setPartnerShipDetails] = useState([]);
  const [proprietorDetails, setProprietorDetails] = useState([]);
  const [pvtLmtdDetails, setPvtLmtdDetails] = useState([]);
  const { Search } = Input;
  const [searchPvt, setsearchPvt] = useState([]);
  const [searchPartner, setsearchPartner] = useState("");
  const [searchPropritor, setsearchProprietor] = useState([]);
  const [exportingPartnership, setExportingPartnership] = useState(false);
  const [exportingPvtLmtd, setExportingPvtLmtd] = useState(false);
  const [exportingProprietorship, setExportingProprietorship] = useState(false);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);


  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/getform`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(get(response, "data.data", []));
      console.log(response.data);
      console.log("datassss");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPartnerShipDetails(
      data.filter((res) => {
        return res.firmOption === "Partnership";
      })
    );

    setPvtLmtdDetails(
      data.filter((res) => {
        return res.firmOption === "Private limited";
      })
    );

    setProprietorDetails(
      data.filter((res) => {
        return res.firmOption === "Proprietorship";
      })
    );
  }, [data]);

  const handleSearchPvtLmt = (value) => {
    const filteredData = pvtLmtdDetails.filter((item) => {
      console.log(value, item.city, "wehgjhv");
      return item.city.toLowerCase().includes(value.toLowerCase());
    });
    setsearchPvt(filteredData);
  };

  const handleSearchPartnership = (value) => {
    const filteredData = partnerShipDetails.filter((item) => {
      console.log(value, item.city, "wehgjhv");
      return item.city.toLowerCase().includes(value.toLowerCase());
    });
    setsearchPartner(filteredData);
  };

  const handleSearchProprietorship = (value) => {
    const filteredData = proprietorDetails.filter((item) => {
      console.log(value, item.city, "wehgjhv");
      return item.city.toLowerCase().includes(value.toLowerCase());
    });
    setsearchProprietor(filteredData);
  };

  const debouncedSearchPartnership = debounce(handleSearchPartnership, 300);
  const debouncedSearchPvtLmt = debounce(handleSearchPvtLmt, 300);
  const debouncedSearchProprietorship = debounce(handleSearchProprietorship,300);


  const exportPvtLmtdToExcel = () => {
    if (!exportingPvtLmtd) {
      const dataForExport = pvtLmtdDetails.map((res) => ({
        EmployeeName: res.EmployeeName,
        BrandName: res.brandName,
        FirmName: res.firmName,
        FirmOption: res.firmOption,
        CIN_NO: res.cinNo === undefined ? "No Cin no" : res.cinNo,
        Director: res.director === undefined ? "No Director" : res.director,
        PanCard: res.panCard,
        GstCopy: res.gstCopy,
        FSS: res.fss,
        CancelCheck: res.cancelCheck,
        TableCounts: res.tableCount
          .map(
            (table) =>
              `Table Count-${table.tableCount}, Seaters-${table.seaters}`
          )
          .join("; "),
        TableImages: res.tablePhotos.map((photo) => photo).join("; "),
        BillingSoftware: res.billingSoftware,
        OnlineAggregator: res.onlineAggregator,
        AggregatorList:
          res.AggregatorList === undefined
            ? "no list"
            : res.onlineAggregatersList
                .map((aggregator) => aggregator.aggregateName)
                .join("; "),
        TwoWheelerParking: res.twoWheelerparking,
        TwoWheelerSlots:
          res.twoWheelerSlot === undefined ? "no slots" : res.twoWheelerSlot,
        FourWheelerParking: res.fourWheelerparking,
        FourWheelerSlots:
          res.fourWheelerSlot === undefined ? "no slots" : res.fourWheelerSlot,
        RestaurantMobileNumber: res.restaurantMobileNumber,
        Email: res.email,
        ContactPersonName: res.contactPersonname,
        ContactPersonNumber: res.contactPersonNumber,
        Designation: res.designation,
        Status: res.status,
      }));

      const ws = XLSX.utils.json_to_sheet(dataForExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "PvtLmtdSheet");
      XLSX.writeFile(wb, "exported_pvtLmtd_data.xlsx");
      setExportingPvtLmtd(false);
    }
  };

  const exportProprietorshipToExcel = () => {
    if (!exportingProprietorship) {
      const dataForExport = proprietorDetails.map((res) => ({
        EmployeeName: res.EmployeeName,
        BrandName: res.brandName,
        FirmName: res.firmName,
        FirmOption: res.firmOption,
        PanCard: res.panCard,
        GstCopy: res.gstCopy,
        FSS: res.fss,
        CancelCheck: res.cancelCheck,
        TableCounts: res.tableCount
          .map(
            (table) =>
              `Table Count-${table.tableCount}, Seaters-${table.seaters}`
          )
          .join("; "),
        TableImages: res.tablePhotos.map((photo) => photo).join("; "),
        BillingSoftware: res.billingSoftware,
        OnlineAggregator: res.onlineAggregator,
        AggregatorList:
          res.AggregatorList === undefined
            ? "no list"
            : res.onlineAggregatersList
                .map((aggregator) => aggregator.aggregateName)
                .join("; "),
        TwoWheelerParking: res.twoWheelerparking,
        TwoWheelerSlots:
          res.twoWheelerSlot === undefined ? "no slots" : res.twoWheelerSlot,
        FourWheelerParking: res.fourWheelerparking,
        FourWheelerSlots:
          res.fourWheelerSlot === undefined ? "no slots" : res.fourWheelerSlot,
        RestaurantMobileNumber: res.restaurantMobileNumber,
        Email: res.email,
        ContactPersonName: res.contactPersonname,
        ContactPersonNumber: res.contactPersonNumber,
        Designation: res.designation,
        Status: res.status,
      }));

      const ws = XLSX.utils.json_to_sheet(dataForExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "ProprietorshipSheet");
      XLSX.writeFile(wb, "exported_proprietorship_data.xlsx");
      setExportingProprietorship(false);
    }
  };

  const exportPartnershipToExcel = () => {
    if (!exportingPartnership) {
      const dataForExport = partnerShipDetails.map((res) => ({
        EmployeeName: res.EmployeeName,
        BrandName: res.brandName,
        FirmName: res.firmName,
        FirmOption: res.firmOption,
        PanCard: res.panCard,
        GstCopy: res.gstCopy,
        FSS: res.fss,
        CancelCheck: res.cancelCheck,
        TableCounts: res.tableCount
          .map(
            (table) =>
              `Table Count-${table.tableCount}, Seaters-${table.seaters}`
          )
          .join("; "),
        TableImages: res.tablePhotos.map((photo) => photo).join("; "),
        BillingSoftware: res.billingSoftware,
        OnlineAggregator: res.onlineAggregator,
        AggregatorList:
          res.AggregatorList === undefined
            ? "no list"
            : res.onlineAggregatersList
                .map((aggregator) => aggregator.aggregateName)
                .join("; "),
        TwoWheelerParking: res.twoWheelerparking,
        TwoWheelerSlots:
          res.twoWheelerSlot === undefined ? "no slots" : res.twoWheelerSlot,
        FourWheelerParking: res.fourWheelerparking,
        FourWheelerSlots:
          res.fourWheelerSlot === undefined ? "no slots" : res.fourWheelerSlot,
        RestaurantMobileNumber: res.restaurantMobileNumber,
        Email: res.email,
        ContactPersonName: res.contactPersonname,
        ContactPersonNumber: res.contactPersonNumber,
        Designation: res.designation,
        Status: res.status,
      }));

      const ws = XLSX.utils.json_to_sheet(dataForExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "PartnershipSheet");
      XLSX.writeFile(wb, "exported_partnership_data.xlsx");
      setExportingPartnership(false);
    }
  };


  const pvtLmtdcolumns = [
    {
      title: <h1>Serial Number</h1>,
      dataIndex: "serialNumber",
      key: "serialNumber",
      align: "center",
      render: (text, record, index) => {
        const pageSize = tableRef.current?.props?.pagination?.pageSize || 5;
        return (currentPage1 - 1) * pageSize + index + 1;
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
      title: <h1>Employee City</h1>,
      dataIndex: "city",
      key: "city",
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
      title: <h1>CIN NO</h1>,
      dataIndex: "cinNo",
      key: "cinNo",
      align: "center",
      render: (data) => {
        return (
          <>
            {data === undefined ? (
              <p>No Cin no</p>
            ) : (
              <Image src={data} width={70} preview={false} />
            )}
          </>
        );
      },
    },
    {
      title: <h1>Director</h1>,
      dataIndex: "director",
      key: "director",
      align: "center",
      render: (data) => {
        return (
          <>
            {data === undefined ? (
              <p>No Director</p>
            ) : (
              <Image src={data} width={70} preview={false} />
            )}
          </>
        );
      },
    },
    {
      title: <h1>Pan Card</h1>,
      dataIndex: "panCard",
      key: "panCard",
      align: "center",
      render: (data) => {
        return <Image src={data} width={70} preview={false} />;
      },
    },
    {
      title: <h1>Gst Copy</h1>,
      dataIndex: "gstCopy",
      key: "gstCopy",
      align: "center",
      render: (data) => {
        return <Image src={data} width={70} preview={false} />;
      },
    },
    {
      title: <h1>FSS</h1>,
      dataIndex: "fss",
      key: "fss",
      align: "center",
      render: (data) => {
        return <Image src={data} width={70} preview={false} />;
      },
    },
    {
      title: <h1>Cancel Cheque</h1>,
      dataIndex: "cancelCheck",
      key: "cancelCheck",
      align: "center",
      render: (data) => {
        return <Image src={data} width={70} preview={false} />;
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
                <div className="flex gap-2 w-[25vw]" key={i}>
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
        return (
          <div className="wrap gaflex flex-p-2 w-[15vw]">
            {data.map((res, i) => {
              return (
                <div className="flex gap-2" key={i}>
                  <Image src={res} width={50} preview={false} />
                </div>
              );
            })}
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
                <div className="flex items-center justify-center gap-2" key={i}>
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
        return (
          <>
            {data.length === 0 ? (
              <p>no</p>
            ) : data.length === 1 ? (
              <div className="wrap gaflex flex-p-2 w-[10vw]">
              <Image src={data[0]} />
              </div>
            ) : (
              <div className="wrap gaflex flex-p-2 w-[10vw]">
              {data.map((res, i) => {
                  return (
                    <div className="flex gap-2" key={i}>
                  <Image src={data} key={i} width={50} />
                  </div>
                  )
                })}
              </div>
            )}
          </>
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
  ];

  const Partnershipcolumns = [
    {
      title: <h1>Serial Number</h1>,
      dataIndex: "serialNumber",
      key: "serialNumber",
      align: "center",
      render: (text, record, index) => {
        const pageSize = tableRef.current?.props?.pagination?.pageSize || 5;
        return (currentPage2 - 1) * pageSize + index + 1;
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
      title: <h1>Employee City</h1>,
      dataIndex: "city",
      key: "city",
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
        return <Image src={data} width={70} preview={false} />;
      },
    },
    {
      title: <h1>Gst Copy</h1>,
      dataIndex: "gstCopy",
      key: "gstCopy",
      align: "center",
      render: (data) => {
        return <Image src={data} width={70} preview={false} />;
      },
    },
    {
      title: <h1>FSS</h1>,
      dataIndex: "fss",
      key: "fss",
      align: "center",
      render: (data) => {
        return <Image src={data} width={70} preview={false} />;
      },
    },
    {
      title: <h1>Cancel Cheque</h1>,
      dataIndex: "cancelCheck",
      key: "cancelCheck",
      align: "center",
      render: (data) => {
        return <Image src={data} width={70} preview={false} />;
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
        return (
          <div className="flex flex-wrap gap-2 w-[15vw]">
            {data.map((res, i) => {
              return (
                <div className="flex gap-2" key={i}>
                  <Image src={res} width={50} preview={false} />
                </div>
              );
            })}
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
        return (
          <>
            {data.length === 0 ? (
              <p>no</p>
            ) : data.length === 1 ? (
              <div className="wrap gaflex flex-p-2 w-[10vw]">
              <Image src={data[0]} />
              </div>
            ) : (
              <div className="wrap gaflex flex-p-2 w-[10vw]">
              {data.map((res, i) => {
                  return (
                    <div className="flex gap-2" key={i}>
                  <Image src={data} key={i} width={50} />
                  </div>
                  )
                })}
              </div>
            )}
          </>
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
      title: <h1 className="w-[10vw]">Auto Location</h1>,
      dataIndex: "location",
      key: "location",
      align: "center",
      render: (data) => {
        return (
          <div className="w-[14vw]">
            {data.map((res, i) => {
              return (
                <div key={i}>
                  <p> Longitude:{res.latitude}</p>
                  <p> Latitude:{res.longitude}</p>
                  <p> Location Name:{res.locationName}</p>
                </div>
              );
            })}
          </div>
        );
      },
    },
  ];

  const handleTableChange1 = (pagination) => {
    setCurrentPage1(pagination.current);
  };
  const handleTableChange2 = (pagination) => {
    setCurrentPage2(pagination.current);
  };
  const handleTableChange3 = (pagination) => {
    setCurrentPage3(pagination.current);
  };

  return (
    <div className="pl-[19vw]  pt-14 w-screen">
    <div className="w-[80vw] pl-20 pt-4 bg-white-70 shadow-md"></div>
    <div>


    <div className="pl-6 w-[80vw]">
        <div className="pt-10">
          <div className="flex items-center justify-between px-4">
            <h1 className="text-center text-2xl pb-2">PartnerShip Details</h1>
            <Search
              placeholder="Search by city..."
              onChange={(e) => debouncedSearchPartnership(e.target.value)}
              enterButton
              className="mt-4 w-[60%] mb-5"
              size="large"
            />
            <Button
              onClick={() => {
                exportPartnershipToExcel();
              }}
              className="w-[150px] h-[35px] px-3 float-right mr-10  rounded-md cursor-pointer text-white !bg-black text-[12px] !font-bold  flex items-center justify-center bg-[--secondary-color] hover:!text-white"
            >
              Export Partnership Excel
            </Button>
          </div>
          <Table
            columns={Partnershipcolumns}
            dataSource={
              searchPartner.length > 0 ? searchPartner : partnerShipDetails
            }
            scroll={{ x: 5000 }}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
            onChange={handleTableChange1}
          />
        </div>
        <div className="pt-10">
          <div className="flex items-center justify-between px-4">
            <h1 className="text-center text-2xl pb-2">
              Private Limited Details
            </h1>
            <Search
              placeholder="Search by city..."
              onChange={(e) => debouncedSearchPvtLmt(e.target.value)}
              enterButton
              className="mt-4 w-[60%] mb-5"
              size="large"
            />

            <Button
              onClick={() => {
                exportPvtLmtdToExcel();
              }}
              className="w-[150px] h-[35px] px-3 float-right mr-10  rounded-md cursor-pointer text-white !bg-black text-[12px] !font-bold  flex items-center justify-center bg-[--secondary-color] hover:!text-white"
            >
              Export Pvt Limited Excel
            </Button>
          </div>
          <Table
            columns={pvtLmtdcolumns}
            dataSource={searchPvt.length > 0 ? searchPvt : pvtLmtdDetails}
            scroll={{ x: 4000 }}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
            onChange={handleTableChange2}
          />
        </div>
        <div className="pt-10">
          <div className="flex items-center justify-between px-4">
            <h1 className="text-center text-2xl pb-2">Proprietor Details</h1>
            <Search
              placeholder="Search by city..."
              onChange={(e) => debouncedSearchProprietorship(e.target.value)}
              enterButton
              className="mt-4 w-[60%] mb-5"
              size="large"
              allowClear={true}
            />
            <Button
              onClick={() => {
                exportProprietorshipToExcel();
              }}
              className="w-[150px] px-3 h-[35px] float-right mr-10  rounded-md cursor-pointer text-white !bg-black text-[10px] !font-bold  flex items-center justify-center bg-[--secondary-color] hover:!text-white"
            >
              Export Proprietorship Excel
            </Button>
          </div>
          <Table
            columns={Partnershipcolumns}
            dataSource={
              searchPropritor.length > 0 ? searchPropritor : proprietorDetails
            }
            scroll={{ x: 4000 }}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
            onChange={handleTableChange3}
          />
        </div>
      </div>


    </div>
    </div>
  )
}

export default LeadGeneration