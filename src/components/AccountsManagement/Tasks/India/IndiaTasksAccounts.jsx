import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    Table,
    Upload,
    message,
  } from "antd";
  import axios from "axios";
  import { get } from "lodash";
  import { useEffect, useState, useRef } from "react";
  import { useNavigate } from "react-router-dom";
  const url = import.meta.env.VITE_REACT_APP_URL;
  import {
    DownloadOutlined,
    EnvironmentOutlined,
    UploadOutlined,
  } from "@ant-design/icons";
  import PdfViewerModal from "../../../Modals/PDFModal";
  import { useSelector } from "react-redux";
  
  function Connected() {
    const [form] = Form.useForm();
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const tableRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);
    const [selectedPDF, setSelectedPDF] = useState("");
    const [isPDFModalOpen, setPDFModalOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [selectedField, setSelectedField] = useState(null);
    let role = useSelector((state) => state?.user?.user?.role);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
  
    console.log(role);
    console.log("role");
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/accountstaskindia`, {
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
    }, [update]);
  
    console.log(data);
  
    //location function
  
    const getLocationName = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
  
        const data = response.data;
        const locationName = data.display_name;
        return locationName;
      } catch (error) {
        console.error("Error getting location name:", error.message);
        return null;
      }
    };
  
    const locationAutoFetch = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error)
          );
        });
  
        const { latitude, longitude } = position.coords;
        const locationName = await getLocationName(latitude, longitude);
        setLocation({ latitude, longitude, locationName });

      } catch (error) {
        console.error("Error:", error.message);
      }
    };
  

  
  
    //pdf view
    const downloadPDF = (fileUrl, fileName) => {
      console.log(fileUrl);
      console.log(fileName);
      console.log("fileName");
      const anchor = document.createElement("a");
      anchor.href = fileUrl;
      anchor.download = `${fileName}cv_file.pdf`;
      anchor.target = "_blank";
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    };
  
    //add introduction function
    const handleButtonClick = (record, field) => {
      setSelectedRowData(record);
      setModalVisible(true);
      setSelectedField(field);
    };
  
    const handleModalClose = () => {
      setModalVisible(false);
      form.resetFields();
    };
  
    //upload function
    const handleAddFeature = async () => {
      form.validateFields().then(async (values) => {
        form.resetFields(["pdfDocument", "featureDescription", "selectedDate"]);
        handleModalClose();
  
        console.log(selectedField);
        console.log("selectedField");
        console.log(values);
        console.log("values");
  
        const followUpDate = values?.selectedDate?.format("YYYY-MM-DD")
          ? values?.selectedDate?.format("YYYY-MM-DD")
          : "";
        const description = values?.featureDescription
          ? values?.featureDescription
          : "";
        const file =
          values && values.file && values.file.length > 0
            ? values.file[0].originFileObj
            : null;
        const id = selectedRowData?._id;
  
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fieldName", selectedField);
        formData.append("followUpDate", followUpDate);
        formData.append("description", description);
        formData.append("location", JSON.stringify(location));
  
        try {
          await axios.post(`${url}/uploadaccountsagreement/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
  
          setLocation(null);
          setUpdate(!update);
  
          message.success(`${file.name} file uploaded successfully`);
        } catch (error) {
          message.error(`${file.name} file upload failed.`);
        }
      });
    };
  
    const handlePreview = async (file) => {
      setPreviewUrl(URL.createObjectURL(file.originFileObj));
      setPreviewVisible(true);
    };
  
    const handleCancelPreview = () => {
      setPreviewVisible(false);
    };
  
    const customRequest = ({ onSuccess }) => {
      onSuccess("ok");
    };
  
    const onChange = ({ fileList }) => {
      form.setFieldsValue({ pdfDocument: fileList });
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
        title: <h1>Upload Trademark</h1>,
        dataIndex: "trademark",
        key: "uploadTrademark",
        align: "center",
        render: (data, record) => (
          <Button
            type="primary"
            style={{
              backgroundColor: data?.document ? "white" : "green",
              pointerEvents: data?.document ? "none" : "auto",
            }}
            disabled={data?.document ? true : false}
            onClick={() => handleButtonClick(record, "trademark")}
          >
            {data?.document ? "Uploaded" : "Upload"}
          </Button>
        ),
      },
      {
        title: <h1>Trademark</h1>,
        dataIndex: "trademark",
        key: "trademark",
        align: "center",
        render: (data, record) => {
          if (!data) {
            console.error("Invalid or empty data:", data);
            return null;
          }
  
          const handleViewPDF = (pdfUrl) => {
            console.log(pdfUrl);
            console.log("View URL");
  
            setSelectedPDF(pdfUrl);
            setPDFModalOpen(true);
          };
  
          const handleClosePDFModal = () => {
            setPDFModalOpen(false);
            setSelectedPDF(null);
          };
  
          return (
            <div className="flex items-center justify-center gap-5">
              {data.document ? (
                <div>
                  <DownloadOutlined
                    key={`download-${data._id}`}
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => downloadPDF(data.document, record?.brandName)}
                  />
                </div>
              ) : null}
              <div>
                <Button
                  key={`preview-${data._id}`}
                  onClick={() => handleViewPDF(data)}
                >
                  view Details
                </Button>
                <PdfViewerModal
                  isOpen={isPDFModalOpen}
                  onClose={handleClosePDFModal}
                  pdfUrl={selectedPDF}
                />
              </div>
            </div>
          );
        },
      },
      {
        title: <h1>Upload Payment Gateway</h1>,
        dataIndex: "paymentGateway",
        key: "uploadPaymentGateway",
        align: "center",
        render: (data, record) => (
          <Button
            type="primary"
            style={{
              backgroundColor: data?.document ? "white" : "green",
              pointerEvents: data?.document ? "none" : "auto",
            }}
            disabled={data?.document ? true : false}
            onClick={() => handleButtonClick(record, "paymentGateway")}
          >
            {data?.document ? "Uploaded" : "Upload"}
          </Button>
        ),
      },
      {
        title: <h1>Payment Gateway</h1>,
        dataIndex: "paymentGateway",
        key: "paymentGateway",
        align: "center",
        render: (data, record) => {
          if (!data) {
            console.error("Invalid or empty data:", data);
            return null;
          }
  
          const handleViewPDF = (pdfUrl) => {
            console.log(pdfUrl);
            console.log("View URL");
  
            setSelectedPDF(pdfUrl);
            setPDFModalOpen(true);
          };
  
          const handleClosePDFModal = () => {
            setPDFModalOpen(false);
            setSelectedPDF(null);
          };
  
          return (
            <div className="flex items-center justify-center gap-5">
              {data.document ? (
                <div>
                  <DownloadOutlined
                    key={`download-${data._id}`}
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => downloadPDF(data.document, record?.brandName)}
                  />
                </div>
              ) : null}
              <div>
                <Button
                  key={`preview-${data._id}`}
                  onClick={() => handleViewPDF(data)}
                >
                  view Details
                </Button>
                <PdfViewerModal
                  isOpen={isPDFModalOpen}
                  onClose={handleClosePDFModal}
                  pdfUrl={selectedPDF}
                />
              </div>
            </div>
          );
        },
      },
      {
        title: <h1>Upload DLT</h1>,
        dataIndex: "dlt",
        key: "uploaddlt",
        align: "center",
        render: (data, record) => (
          <Button
            type="primary"
            style={{
              backgroundColor: data?.document ? "white" : "green",
              pointerEvents: data?.document ? "none" : "auto",
            }}
            disabled={data?.document ? true : false}
            onClick={() => handleButtonClick(record, "dlt")}
          >
            {data?.document ? "Uploaded" : "Upload"}
          </Button>
        ),
      },
      {
        title: <h1>DLT</h1>,
        dataIndex: "dlt",
        key: "dlt",
        align: "center",
        render: (data, record) => {
          if (!data) {
            console.error("Invalid or empty data:", data);
            return null;
          }
  
          const handleViewPDF = (pdfUrl) => {
            console.log(pdfUrl);
            console.log("View URL");
  
            setSelectedPDF(pdfUrl);
            setPDFModalOpen(true);
          };
  
          const handleClosePDFModal = () => {
            setPDFModalOpen(false);
            setSelectedPDF(null);
          };
  
          return (
            <div className="flex items-center justify-center gap-5">
              {data.document ? (
                <div>
                  <DownloadOutlined
                    key={`download-${data._id}`}
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => downloadPDF(data.document, record?.brandName)}
                  />
                </div>
              ) : null}
              <div>
                <Button
                  key={`preview-${data._id}`}
                  onClick={() => handleViewPDF(data)}
                >
                  view Details
                </Button>
                <PdfViewerModal
                  isOpen={isPDFModalOpen}
                  onClose={handleClosePDFModal}
                  pdfUrl={selectedPDF}
                />
              </div>
            </div>
          );
        },
      },
      {
        title: <h1>Upload Other Charges</h1>,
        dataIndex: "otherCharges",
        key: "uploadotherCharges",
        align: "center",
        render: (data, record) => (
          <Button
            type="primary"
            style={{
              backgroundColor: data?.document ? "white" : "green",
              pointerEvents: data?.document ? "none" : "auto",
            }}
            disabled={data?.document ? true : false}
            onClick={() => handleButtonClick(record, "otherCharges")}
          >
            {data?.document ? "Uploaded" : "Upload"}
          </Button>
        ),
      },
      {
        title: <h1>Other Charges</h1>,
        dataIndex: "otherCharges",
        key: "otherCharges",
        align: "center",
        render: (data, record) => {
          if (!data) {
            console.error("Invalid or empty data:", data);
            return null;
          }
  
          const handleViewPDF = (pdfUrl) => {
            console.log(pdfUrl);
            console.log("View URL");
  
            setSelectedPDF(pdfUrl);
            setPDFModalOpen(true);
          };
  
          const handleClosePDFModal = () => {
            setPDFModalOpen(false);
            setSelectedPDF(null);
          };
  
          return (
            <div className="flex items-center justify-center gap-5">
              {data.document ? (
                <div>
                  <DownloadOutlined
                    key={`download-${data._id}`}
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => downloadPDF(data.document, record?.brandName)}
                  />
                </div>
              ) : null}
              <div>
                <Button
                  key={`preview-${data._id}`}
                  onClick={() => handleViewPDF(data)}
                >
                  view Details
                </Button>
                <PdfViewerModal
                  isOpen={isPDFModalOpen}
                  onClose={handleClosePDFModal}
                  pdfUrl={selectedPDF}
                />
              </div>
            </div>
          );
        },
      },
      {
        title: <h1>Upload Payment Acknowledgement</h1>,
        dataIndex: "paymentAcknowledgement",
        key: "uploadpaymentAcknowledgement",
        align: "center",
        render: (data, record) => (
          <Button
            type="primary"
            style={{
              backgroundColor: data?.document ? "white" : "green",
              pointerEvents: data?.document ? "none" : "auto",
            }}
            disabled={data?.document ? true : false}
            onClick={() => handleButtonClick(record, "paymentAcknowledgement")}
          >
            {data?.document ? "Uploaded" : "Upload"}
          </Button>
        ),
      },
      {
        title: <h1>Payment Acknowledgement</h1>,
        dataIndex: "paymentAcknowledgement",
        key: "paymentAcknowledgement",
        align: "center",
        render: (data, record) => {
          if (!data) {
            console.error("Invalid or empty data:", data);
            return null;
          }
  
          const handleViewPDF = (pdfUrl) => {
            console.log(pdfUrl);
            console.log("View URL");
  
            setSelectedPDF(pdfUrl);
            setPDFModalOpen(true);
          };
  
          const handleClosePDFModal = () => {
            setPDFModalOpen(false);
            setSelectedPDF(null);
          };
  
          return (
            <div className="flex items-center justify-center gap-5">
              {data.document ? (
                <div>
                  <DownloadOutlined
                    key={`download-${data._id}`}
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => downloadPDF(data.document, record?.brandName)}
                  />
                </div>
              ) : null}
              <div>
                <Button
                  key={`preview-${data._id}`}
                  onClick={() => handleViewPDF(data)}
                >
                  view Details
                </Button>
                <PdfViewerModal
                  isOpen={isPDFModalOpen}
                  onClose={handleClosePDFModal}
                  pdfUrl={selectedPDF}
                />
              </div>
            </div>
          );
        },
      },
    ];
  
    const columnss = columnsData.filter((column) => {
      if (role === "admin") {
        return (
          column.key === "serialNumber" ||
          column.key === "brandName" ||
          column.key === "trademark" ||
          column.key === "paymentGateway" ||
          column.key === "dlt" ||
          column.key === "otherCharges" ||
          column.key === "paymentAcknowledgement"
        );
      }
      if (role === "accounts management executive") {
        return (
          column.key === "serialNumber" ||
          column.key === "brandName" ||
          column.key === "uploadTrademark" ||
          column.key === "uploadPaymentGateway" ||
          column.key === "uploaddlt" ||
          column.key === "uploadotherCharges" ||
          column.key === "uploadpaymentAcknowledgement" 
        );
      }
    });
  
    const handleTableChange = (pagination) => {
      setCurrentPage(pagination.current);
    };
  
    const acceptFileType = ".pdf";
  
    return (
      <>
        <div className="pl-[18vw]  pt-14 w-screen">
          <div className="w-[80vw] pl-20 pt-4 bg-white-70 shadow-md"></div>
          <div className="pl-6 w-[80vw]">
            <Button
              className="text-white bg-black mt-4"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <div className="pt-7">
              <Table
                columns={columnss}
                dataSource={data}
                scroll={{ x: role === "admin" ? 2500 : 2500 }}
                ref={tableRef}
                pagination={{ pageSize: 5 }}
                onChange={handleTableChange}
                className="w-full"
                bordered
                style={{ background: "white" }}
              />
            </div>
          </div>
  
          <Modal
            title={`Add ${
              selectedField?.charAt(0).toUpperCase() + selectedField?.slice(1)
            }`}
            visible={modalVisible}
            onCancel={handleModalClose}
            footer={[
              <Button key="cancel" onClick={handleModalClose}>
                Cancel
              </Button>,
              <Button
                key="newLeadFeatures"
                type="primary"
                style={{ backgroundColor: "green" }}
                onClick={handleAddFeature}
              >
                Submit
              </Button>,
            ]}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                label={"Upload PDF Document"}
                name="file"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList} // Directly return the fileList
                rules={[
                  {
                    required: true,
                    validator: (_, value) => {
                      if (!value || value.length === 0) {
                        return Promise.reject(new Error("Please upload a document."));
                      }
  
                      if (value.length > 1) {
                        return Promise.reject(
                          new Error(
                            "Please upload only one PDF document"
                          )
                        );
                      }
  
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Upload
                  customRequest={customRequest}
                  showUploadList={{
                    showPreviewIcon: true,
                    showDownloadIcon: false,
                    showRemoveIcon: true,
                  }}
                  onPreview={handlePreview}
                  fileList={form.getFieldValue("file")}
                  onChange={onChange}
                  maxCount={1}
                  accept={acceptFileType}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
  
              <Form.Item label="Agreement Description" name="featureDescription">
                <Input.TextArea />
              </Form.Item>
              <Form.Item label="Select FollowUp Date" name="selectedDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Fetch Current Location">
                <Button
                  type="primary"
                  icon={<EnvironmentOutlined />}
                  onClick={locationAutoFetch}
                  className="bg-sky-500"
                >
                  Fetch Location
                </Button>
              </Form.Item>
              <Form.Item>
                <h1>{location?.locationName}</h1>
              </Form.Item>
              <Modal
                visible={previewVisible}
                title="PDF Preview"
                onCancel={handleCancelPreview}
                footer={null}
              >
                <iframe
                  title="PDF Preview"
                  src={previewUrl}
                  style={{ width: "100%", height: "500px", border: "none" }}
                  frameBorder="0"
                />
              </Modal>
            </Form>
          </Modal>
        </div>
      </>
    );
  }
  
  export default Connected;
  