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
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ImageModal from "../../../Modals/ImageModal";
import PdfViewerModal from "../../../Modals/PDFModal";
import { useSelector } from "react-redux";

function Connected() {
  const [form] = Form.useForm();
  const token = localStorage.getItem("token");
  // const role = useSelector((state) => state.user.user.role);
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isImageModalOpen, setImageModalOpen] = useState(false);
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
      const response = await axios.get(`${url}/legalmanagementtaskindia`, {
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

  //business status
  const handleBusinessStatus = async (record) => {
    const id = record._id;

    const res = await axios.post(
      `${url}/businessstatus`,
      {
        userId: id,
        newBusinessStatus: "accountsmanagement",
        leadStatus: "new-lead",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    setUpdate(!update);
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
        await axios.post(`${url}/uploadagreement/${id}`, formData, {
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
      title: <h1>Upload Bromag Agreement</h1>,
      dataIndex: "agreement",
      key: "uploadagreement",
      align: "center",
      render: (data, record) => (
        <Button
          type="primary"
          style={{
            backgroundColor: data?.document ? "white" : "green",
            pointerEvents: data?.document ? "none" : "auto",
          }}
          disabled={data?.document ? true : false}
          onClick={() => handleButtonClick(record, "agreement")}
        >
          {data?.document ? "Uploaded" : "Upload"}
        </Button>
      ),
    },
    {
      title: <h1>Bromag Agreement</h1>,
      dataIndex: "agreement",
      key: "agreement",
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
      title: <h1>Upload ECS</h1>,
      dataIndex: "ecs",
      key: "uploadecs",
      align: "center",
      render: (data, record) => (
        <Button
          type="primary"
          style={{
            backgroundColor: data?.document ? "white" : "green",
            pointerEvents: data?.document ? "none" : "auto",
          }}
          disabled={data?.document ? true : false}
          onClick={() => handleButtonClick(record, "ecs")}
        >
          {data?.document ? "Uploaded" : "Upload"}
        </Button>
      ),
    },
    {
      title: <h1>ECS</h1>,
      dataIndex: "ecs",
      key: "ecs",
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
      title: <h1>Upload Dining Agreement</h1>,
      dataIndex: "diningAgreement",
      key: "uploaddiningAgreement",
      align: "center",
      render: (data, record) => (
        <Button
          type="primary"
          style={{
            backgroundColor: data?.document ? "white" : "green",
            pointerEvents: data?.document ? "none" : "auto",
          }}
          disabled={data?.document ? true : false}
          onClick={() => handleButtonClick(record, "diningAgreement")}
        >
          {data?.document ? "Uploaded" : "Upload"}
        </Button>
      ),
    },
    {
      title: <h1>Dining Agreement</h1>,
      dataIndex: "diningAgreement",
      key: "diningAgreement",
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
      title: <h1>Upload Additional Agreement</h1>,
      dataIndex: "additionalAgreement",
      key: "uploadadditionalAgreement",
      align: "center",
      render: (data, record) => (
        <Button
          type="primary"
          style={{
            backgroundColor: data?.document ? "white" : "green",
            pointerEvents: data?.document ? "none" : "auto",
          }}
          disabled={data?.document ? true : false}
          onClick={() => handleButtonClick(record, "additionalAgreement")}
        >
          {data?.document ? "Uploaded" : "Upload"}
        </Button>
      ),
    },
    {
      title: <h1>Additional Agreement</h1>,
      dataIndex: "additionalAgreement",
      key: "additionalAgreement",
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
      title: <h1>Upload Who We Are</h1>,
      dataIndex: "whoWeAre",
      key: "uploadwhoWeAre",
      align: "center",
      render: (data, record) => (
        <Button
          type="primary"
          style={{
            backgroundColor: data?.document ? "white" : "green",
            pointerEvents: data?.document ? "none" : "auto",
          }}
          disabled={data?.document ? true : false}
          onClick={() => handleButtonClick(record, "whoWeAre")}
        >
          {data?.document ? "Uploaded" : "Upload"}
        </Button>
      ),
    },
    {
      title: <h1>Who We Are</h1>,
      dataIndex: "whoWeAre",
      key: "whoWeAre",
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
      title: <h1>Upload Bromag Terms & Conditions</h1>,
      dataIndex: "termsAndConditions",
      key: "uploadtermsAndConditions",
      align: "center",
      render: (data, record) => (
        <Button
          type="primary"
          style={{
            backgroundColor: data?.document ? "white" : "green",
            pointerEvents: data?.document ? "none" : "auto",
          }}
          disabled={data?.document ? true : false}
          onClick={() => handleButtonClick(record, "termsAndConditions")}
        >
          {data?.document ? "Uploaded" : "Upload"}
        </Button>
      ),
    },
    {
      title: <h1>Bromag Terms & Conditions</h1>,
      dataIndex: "termsAndConditions",
      key: "termsAndConditions",
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
      title: <h1>Upload Selfie Image</h1>,
      dataIndex: "legalSelfie",
      key: "uploadlegalSelfie",
      align: "center",
      render: (data, record) => (
        <Button
          type="primary"
          style={{
            backgroundColor: data?.document ? "white" : "green",
            pointerEvents: data?.document ? "none" : "auto",
          }}
          disabled={data?.document ? true : false}
          onClick={() => handleButtonClick(record, "legalSelfie")}
        >
          {data?.document ? "Uploaded" : "Upload"}
        </Button>
      ),
    },
    {
      title: <h1>Selfie Image</h1>,
      dataIndex: "legalSelfie",
      key: "legalSelfie",
      align: "center",
      render: (data) => {
        if (!data) {
          console.error("Invalid or empty data:", data);
          return null;
        }
        const handleViewImage = (imageUrl) => {
          console.log(imageUrl);
          console.log("imageUrl");
          setSelectedImage(imageUrl);
          setImageModalOpen(true);
        };

        const handleCloseImageModal = () => {
          setImageModalOpen(false);
          setSelectedImage(null);
        };

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
              <div style={{ maxWidth: "300px", overflow: "hidden" }}>
                <EyeOutlined
                  onClick={() => handleViewImage(data.document)}
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                />
                <ImageModal
                  isOpen={isImageModalOpen}
                  onClose={handleCloseImageModal}
                  imageUrl={selectedImage}
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
      title: <h1>Follow Up Date</h1>,
      dataIndex: "legalFollowUpDate",
      key: "legalFollowUpDate",
      align: "center",
      render: (data) => {
        return <p>{data}</p>;
      },
    },
    {
      title: <h1>Move to Accounts Management</h1>,
      dataIndex: "businessStatus",
      key: "businessStatus",
      align: "center",
      render: (data, record) =>
        data &&
        record &&
        record.termsAndConditions?.document &&
        record.whoWeAre?.document &&
        record.additionalAgreement?.document &&
        record.diningAgreement?.document &&
        record.legalSelfie?.document &&
        record.ecs?.document &&
        record.agreement?.document ? (
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => handleBusinessStatus(record)}
          >
            Okay
          </Button>
        ) : null,
    },
  ];

  const columnss = columnsData.filter((column) => {
    if (role === "admin") {
      return (
        column.key === "serialNumber" ||
        column.key === "brandName" ||
        column.key === "agreement" ||
        column.key === "ecs" ||
        column.key === "legalSelfie" ||
        column.key === "diningAgreement" ||
        column.key === "additionalAgreement" ||
        column.key === "whoWeAre" ||
        column.key === "termsAndConditions" ||
        column.key === "businessStatus"
      );
    }
    if (role === "legal management executive") {
      return (
        column.key === "serialNumber" ||
        column.key === "brandName" ||
        column.key === "uploadagreement" ||
        column.key === "uploadecs" ||
        column.key === "uploadlegalSelfie" ||
        column.key === "uploaddiningAgreement" ||
        column.key === "uploadadditionalAgreement" ||
        column.key === "uploadwhoWeAre" ||
        column.key === "uploadtermsAndConditions"
      );
    }
  });

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const acceptFileType = selectedField === "legalSelfie" ? "image/*" : ".pdf";

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
              label={`Upload ${
                selectedField === "legalSelfie" ? "Image" : "PDF Document"
              }`}
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
                          `Please upload only one ${
                            selectedField === "legalSelfie"
                              ? "image"
                              : "PDF document"
                          }.`
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
