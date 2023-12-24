import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  message,
  Space,
  Tabs,
  notification,
  Spin
} from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

// import { storage } from "../firebase/firebaseConfig";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

import axios from "axios";
const url = import.meta.env.VITE_REACT_APP_URL;
import { get } from "lodash";
import { EnvironmentOutlined } from '@ant-design/icons';



function UserLeadGeneration() {
  const user = useSelector((state) => state.user.user);
  console.log("detailssss");
  console.log(user);
  const [imageUrl, setImageUrl] = useState(null);
  const [firmDetail, setFirmDetail] = useState("");
  const [onlineAggregater, setOnlineAggregater] = useState("");
  const [imageUrls, setImageUrls] = useState({});
  const [leadForm] = Form.useForm();
  const [contactForm] = Form.useForm();
  const [statusForm] = Form.useForm();
  const [restaurantForm] = Form.useForm();
  const [locationForm] = Form.useForm();
  const [formValues, setFormValues] = useState({
    brandName: "",
    firmName: "",
    firmOption: "",
  });
  const [tableImages, setTableImages] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [twowheelparking, setTwoWheelparking] = useState([]);
  const [fourwheelparking, setFourWheelparking] = useState([]);
  const [showDomainNameInput, setShowDomainNameInput] = useState("");
  const [showTradeMarkInput, setShowTradeMarkInput] = useState("");
  const [showDLDInput, setShowDLDInput] = useState("");
  const [tradeImages, setTradeImages] = useState([]);
  const [loading,setLoading]=useState(false)
  const token = localStorage.getItem("token");
  const [location, setLocation] = useState(null);
  const [fetchLocation,setFetchLocation] = useState(false)




  const normFileTable = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };



  const customRequest = async ({ file, onSuccess, onError, fieldName }) => {


    try {

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${url}/uploadimage/${fieldName}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const downloadURL = response.data.fileUrl;

      onSuccess();
      if (response.status === 200) {
        message.success(`${fieldName} file uploaded successfully`);
      }


      setTableImages((prevUrls) => [...prevUrls, downloadURL]);
    } catch (error) {
      onError(error);
      message.error(`${file.name} file upload failed.`);
      console.error("Error uploading file to Firebase:", error);
    }
  };

  
  console.log(tableImages, "imahes");

  // const handleRemove = async (file) => {
  //   const storageRef = ref(storage, `table-images/${file.name}`);
  //   console.log("clickkk", file);

  //   try {
  //     await deleteObject(storageRef);
  //     message.success(`${file.name} file removed successfully`);
  //   } catch (error) {
  //     message.error(`${file.name} file removal failed.`);
  //     console.error("Error removing file from Firebase:", error);
  //   }
  // };

  const 
  handleChangeLead = ({ fileList, file }) => {
    const urls = fileList.map((file) => file.url).filter(Boolean);
    const fieldName = file.fieldName;
    setImageUrls((prevUrls) => ({
      ...prevUrls,
      [fieldName]: urls[0],
    }));
  };



  const customRequestLead = async ({ file, onSuccess, onError, fieldName }) => {
    try {

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${url}/uploadimage/${fieldName}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const downloadURL = response.data.fileUrl;

      onSuccess();

      if (response.status === 200) {
        message.success(`${fieldName} file uploaded successfully`);
      }

      setImageUrls((prevUrls) => ({
        ...prevUrls,
        [fieldName]: downloadURL,
      }));
    } catch (error) {
      onError(error);
      message.error(`${fieldName} file upload failed.`);
      console.error("Error uploading file:", error);
    }
  };





  // const handleRemoveLead = async ({ file, fieldName }) => {
  //   const storageRef = ref(storage, `lead-images/${fieldName}/${file.name}`);

  //   try {
  //     await deleteObject(storageRef);
  //     setImageUrls((prevImageUrls) => ({
  //       ...prevImageUrls,
  //       [fieldName]: null,
  //     }));

  //     message.success(`${file.name} file removed successfully`);
  //   } catch (error) {
  //     console.error(`${file.name} file removal failed.`, error);
  //     message.error(`${file.name} file removal failed.`);
  //   }
  // };



  const normFile = (e, fieldName) => {
    const fileList = e && e.fileList ? e.fileList : e || [];

    if (Array.isArray(fileList)) {
      return fileList.map((file) => ({ ...file, fieldName }));
    }

    return [];
  };



  const handleButtonClick = async (e) => {
    try {
      setLoading(true);
      const leadFormValues = await leadForm.validateFields();
  
      console.log(firmDetail, "detail");
  

      if (
        firmDetail === "Private limited"
          ? !imageUrls.cinNo ||
            !imageUrls.director ||
            !imageUrls.fss ||
            !imageUrls.panCard ||
            !imageUrls.gstCopy ||
            !imageUrls.cancelCheck
          : !imageUrls.fss ||
            !imageUrls.panCard ||
            !imageUrls.gstCopy ||
            !imageUrls.cancelCheck
      ) {
        message.error("Upload all images");
        setLoading(false);
      } else {
        const formData = {
          brandName: leadFormValues.brandName,
          firmName: leadFormValues.firmName,
          firmOption: leadFormValues.firmOption,
          cinNo: imageUrls.cinNo,
          director: imageUrls.director,
          fss: imageUrls.fss,
          panCard: imageUrls.panCard,
          gstCopy: imageUrls.gstCopy,
          cancelCheck: imageUrls.cancelCheck,
          EmployeeName: get(user, "name", ""),
          city: get(user, "city", ""),
          state: get(user, "state", ""),
          adminId: get(user, "adminId", ""),
          employeeId: get(user, "userId", "")
        };
  
        console.log(formData);
        console.log("loopppppp");
  
        const response = await axios.post(
          `${url}/createform`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        localStorage.setItem("id", response.data.data);
        notification.success({
          message: "Lead data submitted successfully",
        });
  
        leadForm.resetFields();
        setImageUrls({});
        setLoading(false);
      }
    } catch (error) {
      const errorMessages = {};
  
      if (error.errorFields) {
        error.errorFields.forEach(({ name, errors }) => {
          errorMessages[name[0]] = errors[0];
        });
  
        message.error(
          `give all required fields: ${Object.values(errorMessages).join(", ")}`
        );
      }
  
      setLoading(false);
    }
  };
  




  const handleFinishContact = async (value) => {
    const id = localStorage.getItem("id");
  
    try {
      console.log("kooppppp");
      console.log(value);
  
      await axios.put(
        `${url}/updateform/${id}`,
        value,  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      notification.success({
        message: "Contact details submitted successfully",
      });
  
      contactForm.resetFields();
    } catch (err) {
      console.log(err);
    }
  };
  




  const handleFinishStatus = async (val) => {
    const id = localStorage.getItem("id");
    setLoading(true);
    try {
      const formData = {
        dld: val.dld,
        dldEmail: val.dldEmail,
        dldPassword: val.dldPassword,
        domain: val.domain,
        domainName: val.domainName,
        entityNo: val.entityno,
        status: val.status,
        tradeMark: val.tradeMark,
        tradePhotos: tradeImages,
      };
  
      console.log("goooppp");
      console.log(formData);
  
      await axios.put(
        `${url}/updateform/${id}`,
        formData,  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      notification.success({
        message: "Status submitted successfully",
      });
  
      statusForm.resetFields();
      setTradeImages([]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  



  const handleFinishRestaurant = async (values) => {
    const id = localStorage.getItem("id");
    console.log(values, id, tableImages, "erkjwhekjj");
    try {
      const formData = {
        tableCount: values.tableCount,
        tablePhotos: tableImages,
        billingSoftware: values.billingSoftware,
        onlineAggregator: values.onlineAggregater,
        onlineAggregatersList: values.onlineAggregatersList,
        twoWheelerparking: values.twoWheelerparking,
        fourWheelerparking: values.fourWheelerparking,
        twoWheelerSlot: values.twoWheelerSlot,
        fourWheelerSlot: values.fourWheelerSlot,
      };
  
      console.log("soooopp");
      console.log(formData);
  
      await axios.put(
        `${url}/updateform/${id}`,
        formData,  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      notification.success({
        message: "Restaurant data submitted successfully",
      });
  
      restaurantForm.resetFields();
      setTableImages([]);
    } catch (err) {
      console.log(err);
    }
  };
  


  const normFileTrade = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const customRequestTrade = async ({ file, onSuccess, onError, fieldName }) => {
   

    try {

      const formData = new FormData();
      formData.append("file", file);


      const response = await axios.post(`${url}/uploadimage/${fieldName}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const downloadURL = response.data.fileUrl;

      onSuccess();
      if (response.status === 200) {
        message.success(`${fieldName} file uploaded successfully`);
      }
      setTradeImages((prevUrls) => [...prevUrls, downloadURL]);
      setFileList((prevList) => [
        ...prevList,
        { uid: file.uid, name: file.name, url: downloadURL },
      ]);
    } catch (error) {
      onError(error);
      message.error(`${file.name} file upload failed.`);
      console.error("Error uploading file to Firebase:", error);
    }
  };


  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
  
      const data = response.data;
      const locationName = data.display_name;
      return locationName;
    } catch (error) {
      console.error('Error getting location name:', error.message);
      return null;
    }
  };


  
  const handleFinishLocation = async (val) => {
    try {
      console.log("0");

      if (navigator.geolocation) {
        console.log("1");
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            console.log("1.5");
            const { latitude, longitude } = position.coords;
            const locationName = await getLocationName(latitude, longitude);
            console.log("1.7");
            setLocation({ latitude, longitude, locationName });
              if (location) {
              console.log("2");
              const id = localStorage.getItem("id");
              const formData = {
                address: val,
                location:location
              };
              console.log("3");
              console.log(formData);
  
              await axios.put(
                `${url}/updateform/${id}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log("4");
              notification.success({
                message: "Location data submitted successfully",
              });
  
              locationForm.resetFields();
            }
          },
          (error) => {
            console.error('Error getting location:', error.message);
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  

  // const onRemoveTrade = async (file) => {
  //   const storageRef = ref(storage, `trade-images/${file.name}`);

  //   try {
  //     await deleteObject(storageRef);
  //     message.success(`${file.name} file removed successfully`);

  //     setFileList((prevList) =>
  //       prevList.filter((item) => item.uid !== file.uid)
  //     );
  //   } catch (error) {
  //     message.error(`${file.name} file removal failed.`);
  //     console.error("Error removing file from Firebase:", error);
  //   }
  // };

  const items = [
    {
      key: "1",
      label: <div>Lead Generation</div>,
      children: (
        <div className="w-[100vw] flex flex-col items-center min-h-[84vh]  border-b md:border-b-0 md:border-r rounded-md px-5 py-5">
          <h1 className="text-2xl text-center hidden md:block">Lead Generation</h1>
          <Form
            layout="vertical"
            className="pt-5 xsm:!w-[100vw] md:w-[65vw] lg:w-[50vw]"
            form={leadForm}
          >
            <Form.Item
              name="brandName"
              label={<p>Brand Name</p>}
              rules={[{ required: true, message: "Brand name is required" }]}
            >
              <Input
                type="text"
                size="large"
                placeholder="Enter brand name..."
                onChange={(e) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    brandName: e.target.value,
                  }))
                }
              />
            </Form.Item>
            <Form.Item
              name="firmName"
              label={<p>Firm Name</p>}
              rules={[{ required: true, message: "Firm name is required" }]}
            >
              <Input
                type="text"
                size="large"
                placeholder="Enter field name..."
                onChange={(e) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    firmName: e.target.value,
                  }))
                }
              />
            </Form.Item>
            <Form.Item
              name="firmOption"
              label={<p>Select Firm Option</p>}
              rules={[{ required: true, message: "Firm option is required" }]}
              onChange={(e) => setFirmDetail(e)}
            >
              <Select
                onChange={(e) => {
                  setFirmDetail(e);
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    firmOption: e,
                  }));
                }}
                placeholder={"Select firm option..."}
                size="large"
                allowClear={true}
              >
                <Select.Option value={"Partnership"}>Partnership</Select.Option>
                <Select.Option value={"Proprietorship"}>Proprietorship</Select.Option>
                <Select.Option value={"Private limited"}>Private limited </Select.Option>
              </Select>
            </Form.Item>
            <div
              className={`${
                firmDetail === "" ? "hidden" : "block"
              } flex flex-wrap w-[70vw] gap-3 md:gap-12 md:w-[60vw] lg:gap-10 lg:w-[50vw]`}
            >
              <Form.Item
                name="cinNo"
                label={<p>Cin No</p>}
                valuePropName="fileList"
                getValueFromEvent={(e) => normFile(e, "cinNo")}
                rules={[
                  {
                    required: firmDetail === "Private limited",
                    message: "cin no is required",
                  },
                ]}
                className={`${
                  firmDetail === "Partnership" ||
                  firmDetail === "Proprietorship"
                    ? "hidden"
                    : "block"
                }`}
              >
                <Upload
                  name="cinNo"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={{
                    showRemoveIcon: true,
                  }}
                  customRequest={({ file, onSuccess, onError }) =>
                    customRequestLead({
                      file,
                      onSuccess,
                      onError,
                      fieldName: "cinNo",
                    })
                  }
                  accept="image/*"
                  onChange={handleChangeLead}
                  // onRemove={(file) =>
                  //   handleRemoveLead({ file, fieldName: "cinNo" })
                  // }
                >
                  {imageUrls.cinNo ? (
                    <img
                      src={imageUrls.cinNo}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                name="director"
                label={<p>Director</p>}
                valuePropName="fileList"
                getValueFromEvent={(e) => normFile(e, "director")}
                rules={[
                  {
                    required: firmDetail === "Private limited" ? true : false,
                    message: "director is required",
                  },
                ]}
                className={`${
                  firmDetail === "Partnership" ||
                  firmDetail === "Proprietorship"
                    ? "hidden"
                    : "block"
                }`}
              >
                <Upload
                  name="director"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={{
                    showRemoveIcon: true,
                  }}
                  customRequest={({ file, onSuccess, onError }) =>
                    customRequestLead({
                      file,
                      onSuccess,
                      onError,
                      fieldName: "director",
                    })
                  }
                  accept="image/*"
                  onChange={handleChangeLead}
                  // onRemove={(file) =>
                  //   handleRemoveLead({ file, fieldName: "director" })
                  // }
                >
                  {imageUrls.director ? (
                    <img
                      src={imageUrls.director}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                name={"panCard"}
                label={<p>Pan Card</p>}
                valuePropName="fileList"
                getValueFromEvent={(e) => normFile(e, "panCard")}
                rules={[
                  {
                    required: true,
                    message: "panCard is required",
                  },
                ]}
              >
                <Upload
                  name="panCard"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={{
                    showRemoveIcon: true,
                  }}
                  customRequest={({ file, onSuccess, onError }) =>
                    customRequestLead({
                      file,
                      onSuccess,
                      onError,
                      fieldName: "panCard",
                    })
                  }
                  accept="image/*"
                  onChange={handleChangeLead}
                  // onRemove={(file) =>
                  //   handleRemoveLead({ file, fieldName: "panCard" })
                  // }
                >
                  {imageUrls.panCard ? (
                    <img
                      src={imageUrls.panCard}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                name={"gstCopy"}
                label={<p>Gst Copy</p>}
                valuePropName="fileList"
                getValueFromEvent={(e) => normFile(e, "gstCopy")}
                rules={[
                  {
                    required: true,
                    message: "gstCopy is required",
                  },
                ]}
              >
                <Upload
                  name="gstCopy"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={{
                    showRemoveIcon: true,
                  }}
                  customRequest={({ file, onSuccess, onError }) =>
                    customRequestLead({
                      file,
                      onSuccess,
                      onError,
                      fieldName: "gstCopy",
                    })
                  }
                  accept="image/*"
                  onChange={handleChangeLead}
                  // onRemove={(file) =>
                  //   handleRemoveLead({ file, fieldName: "gstCopy" })
                  // }
                >
                  {imageUrls.gstCopy ? (
                    <img
                      src={imageUrls.gstCopy}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                name={"fss"}
                label={<p>FSSAI</p>}
                valuePropName="fileList"
                getValueFromEvent={(e) => normFile(e, "fss")}
                rules={[
                  {
                    required: true,
                    message: "fss is required",
                  },
                ]}
              >
                <Upload
                  name="fss"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={{
                    showRemoveIcon: true,
                  }}
                  customRequest={({ file, onSuccess, onError }) =>
                    customRequestLead({
                      file,
                      onSuccess,
                      onError,
                      fieldName: "fss",
                    })
                  }
                  accept="image/*"
                  onChange={handleChangeLead}
                  // onRemove={(file) =>
                  //   handleRemoveLead({ file, fieldName: "fss" })
                  // }
                >
                  {imageUrls.fss ? (
                    <img
                      src={imageUrls.fss}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                name={"cancelCheck"}
                label={<p>Cancel Cheque</p>}
                valuePropName="fileList"
                getValueFromEvent={(e) => normFile(e, "cancelCheck")}
                rules={[
                  {
                    required: true,
                    message: "cancelCheck is required",
                  },
                ]}
              >
                <Upload
                  name="cancelCheck"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={{
                    showRemoveIcon: true,
                  }}
                  customRequest={({ file, onSuccess, onError }) =>
                    customRequestLead({
                      file,
                      onSuccess,
                      onError,
                      fieldName: "cancelCheck",
                    })
                  }
                  accept="image/*"
                  onChange={handleChangeLead}
                  // onRemove={(file) =>
                  //   handleRemoveLead({ file, fieldName: "cancelCheck" })
                  // }
                >
                  {imageUrls.cancelCheck ? (
                    <img
                      src={imageUrls.cancelCheck}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </div>
            <Form.Item className="flex items-end justify-end">
              <Button
                type="primary"
                onClick={handleButtonClick}
                className="bg-green-500 w-[100px] !text-white font-semibol"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: "2",
      label: `Restaurant Details`,
      children: (
        <div className="w-[100vw] flex flex-col items-center min-h-[84vh]  border-b md:border-b-0 md:border-r rounded-md px-5 py-5">
          <h1 className="text-2xl text-center hidden md:block">Restaurant Details</h1>
          <Form
            layout="vertical"
            name="dynamic_form_nest_item"
            className="pt-5 xsm:w-[90vw] md:w-[65vw] lg:w-[50vw]"
            onFinish={handleFinishRestaurant}
            form={restaurantForm}
          >
            <p className="pb-2 md:pl-16">Add Table Counts</p>
            <Form.List
              name="tableCount"
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      className="!mb-8 flex flex-col md:flex-row items-center justify-center"
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "tableCount"]}
                        rules={[
                          {
                            required: true,
                            message: "Table count is required",
                          },
                        ]}
                        label={<p>Table Count</p>}
                        className="w-[100%] lg:w-[20vw]"
                      >
                        <Input
                          placeholder={`Table count ${name + 1}...`}
                          size="large"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "seaters"]}
                        rules={[
                          {
                            required: true,
                            message: "Seaters is required",
                          },
                        ]}
                        label={<p>Seaters</p>}
                        className="lg:w-[20vw]"
                      >
                        <Select
                          placeholder={`Select seaters for table ${
                            name + 1
                          }...`}
                          size="large"
                          getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode
                          }
                        >
                          <Select.Option value="2 Seaters">
                            2 Seaters
                          </Select.Option>
                          <Select.Option value="4 Seaters">
                            4 Seaters
                          </Select.Option>
                          <Select.Option value="6 Seaters">
                            6 Seaters
                          </Select.Option>
                          <Select.Option value="8 Seaters">
                            8 Seaters
                          </Select.Option>
                        </Select>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Tables Count
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item
              name={"tablePhotos"}
              label={<p>Table Photos</p>}
              valuePropName="fileList"
              getValueFromEvent={normFileTable}
              rules={[
                {
                  required: true,
                  message: "Table photos is required",
                },
              ]}
            >
              <Upload
                name="logo"
                listType="picture-card"
                className="avatar-uploader"
                fileList={fileList}
                showUploadList={{
                  showRemoveIcon: true,
                }}
                multiple={true}
                customRequest={({ file, onSuccess, onError }) =>
                customRequest({
                  file,
                  onSuccess,
                  onError,
                  fieldName: "tablePhotos",
                })
              }                
              // onRemove={(file) => handleRemove(file)}
              >
                {fileList.length >= 5 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              name="billingSoftware"
              label={<p>Billing Software</p>}
              rules={[{ required: true, message: "Firm option is required" }]}
            >
              <Select placeholder={"Select billing software..."} size="large">
                <Select.Option value={"yes"}>Yes</Select.Option>
                <Select.Option value={"no"}>No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="onlineAggregater"
              label={<p>Online Aggregator</p>}
              rules={[
                { required: true, message: "aggregator option is required" },
              ]}
            >
              <Select
                onChange={(e) => {
                  setOnlineAggregater(e);
                }}
                placeholder={"Select online aggregator..."}
                size="large"
              >
                <Select.Option value={"yes"}>Yes</Select.Option>
                <Select.Option value={"no"}>No</Select.Option>
              </Select>
            </Form.Item>

            <Form.List name="onlineAggregatersList">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Form.Item {...restField} name={[name, "aggregateName"]}>
                        <Input
                          placeholder="Aggregate name..."
                          size="large"
                          className="md:!w-[16vw] lg:!w-[40vw]"
                        />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      className={`${
                        onlineAggregater === "yes" ? "!block" : "!hidden"
                      }`}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item
              name="twoWheelerparking"
              label={<p>Select Two Wheeler Parking</p>}
              rules={[
                { required: true, message: "Two wheeler option is required" },
              ]}
            >
              <Select
                onChange={(e) => {
                  setTwoWheelparking(e);
                }}
                placeholder={"Select two wheeler parking..."}
                size="large"
              >
                <Select.Option value={"yes"}>Yes</Select.Option>
                <Select.Option value={"no"}>No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"twoWheelerSlot"}
              label={<p>Two Wheeler Slot</p>}
              className={`${
                twowheelparking === "yes" && twowheelparking !== ""
                  ? "block"
                  : "hidden"
              }`}
              rules={[
                {
                  required: twowheelparking === "yes" ? true : false,
                  message: "Two wheeler slot is required",
                },
              ]}
            >
              <Select placeholder="Select two wheeler slot..." size="large">
                <Select.Option value="2 Slots">2 Slots</Select.Option>
                <Select.Option value="4 Slots">4 Slots</Select.Option>
                <Select.Option value="6 Slots">6 Slots</Select.Option>
                <Select.Option value="8 Slots">8 Slots</Select.Option>
                <Select.Option value="10 Slots">10 Slots</Select.Option>
                <Select.Option value="12 Slots">12 Slots</Select.Option>
                <Select.Option value="14 Slots">14 Slots</Select.Option>
                <Select.Option value="16 Slots">16 Slots</Select.Option>
                <Select.Option value="18 Slots">18 Slots</Select.Option>
                <Select.Option value="20 Slots">20 Slots</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="fourWheelerparking"
              label={<p>Select Four Wheeler Parking</p>}
              rules={[
                {
                  required: true,
                  message: "TwoWheeler parking is required",
                },
              ]}
            >
              <Select
                onChange={(e) => {
                  setFourWheelparking(e);
                }}
                placeholder={"Select four wheeler parking..."}
                size="large"
              >
                <Select.Option value={"yes"}>Yes</Select.Option>
                <Select.Option value={"no"}>No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"fourWheelerSlot"}
              label={<p>Four Wheeler Slot</p>}
              className={`${
                fourwheelparking === "yes" && fourwheelparking !== ""
                  ? "block"
                  : "hidden"
              }`}
              rules={[
                {
                  required: fourwheelparking === "yes" ? true : false,
                  message: "Four wheeler slot is required",
                },
              ]}
            >
              <Select placeholder="Select four wheeler slot..." size="large">
                <Select.Option value="2 Slots">2 Slots</Select.Option>
                <Select.Option value="4 Slots">4 Slots</Select.Option>
                <Select.Option value="6 Slots">6 Slots</Select.Option>
                <Select.Option value="8 Slots">8 Slots</Select.Option>
                <Select.Option value="10 Slots">10 Slots</Select.Option>
                <Select.Option value="12 Slots">12 Slots</Select.Option>
                <Select.Option value="14 Slots">14 Slots</Select.Option>
                <Select.Option value="16 Slots">16 Slots</Select.Option>
                <Select.Option value="18 Slots">18 Slots</Select.Option>
                <Select.Option value="20 Slots">20 Slots</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item className="flex items-end justify-end">
              <Button
                htmlType="submit"
                className="bg-green-500 w-[100px] !text-white font-semibol"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: "3",
      label: `Contact Details`,
      children: (
        <div className="w-[100vw] flex flex-col items-center min-h-[84vh]  border-b md:border-b-0 md:border-r rounded-md px-5 py-5">
          <h1 className="text-2xl text-center hidden md:block">Contact Details</h1>
          <Form
            layout="vertical"
            className="pt-5 xsm:w-[90vw] md:w-[65vw] lg:w-[50vw]"
            onFinish={handleFinishContact}
            form={contactForm}
          >
            <Form.Item>
              <Form.Item
                name="restaurantMobileNumber"
                rules={[
                  {
                    required: true,
                    message: "Restaurant number is required",
                  },
                  () => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject();
                      }
                      if (isNaN(value)) {
                        return Promise.reject(
                          "Mobile number has to be a number."
                        );
                      }
                      if (value.length < 10) {
                        return Promise.reject(
                          "Mobile number can't be less than 5 digits"
                        );
                      }
                      if (value.length > 10) {
                        return Promise.reject(
                          "Mobile number more than 5 digits"
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                label={<p>Restaurant Mobile Number</p>}
              >
                <Input
                  type="text"
                  size="large"
                  placeholder="Enter mobile no..."
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Email is required" }]}
                label={<p>Email</p>}
              >
                <Input type="email" size="large" placeholder="Enter email..." />
              </Form.Item>
            </Form.Item>
            <Form.Item
              name="contactPersonNumber"
              rules={[
                {
                  required: true,
                  message: "Contact person number is required",
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (isNaN(value)) {
                      return Promise.reject(
                        "Mobile number has to be a number."
                      );
                    }
                    if (value.length < 10) {
                      return Promise.reject(
                        "Mobile number can't be less than 5 digits"
                      );
                    }
                    if (value.length > 10) {
                      return Promise.reject("Mobile number more than 5 digits");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              label={<p>Contact Person Number</p>}
            >
              <Input
                type="text"
                size="large"
                placeholder="Enter mobile no..."
              />
            </Form.Item>
            <Form.Item
              name="contactPersonname"
              label={<p>Contact Person Name</p>}
              rules={[
                { required: true, message: "Contact person name is required" },
              ]}
            >
              <Input type="text" size="large" placeholder="Enter name..." />
            </Form.Item>
            <Form.Item
              name="designation"
              label={<p>Designation</p>}
              rules={[
                { required: true, message: "Designation is required" },
              ]}
            >
              <Input
                type="text"
                size="large"
                placeholder="Enter designation..."
              />
            </Form.Item>
            <Form.Item className="flex items-end justify-end">
              <Button
                htmlType="submit"
                className="bg-green-500 w-[100px] !text-white font-semibol"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: "4",
      label: "Status",
      children: (
        <div className="w-[100vw] flex flex-col items-center min-h-[84vh]  border-b md:border-b-0 md:border-r rounded-md px-5 py-5">
          <h1 className="text-center text-2xl hidden md:block">Status</h1>
          <Form
            layout="vertical"
            className="pt-5 xsm:w-[90vw] md:w-[65vw] lg:w-[50vw]"
            onFinish={handleFinishStatus}
            form={statusForm}
          >
            <Form.Item
              name={"domain"}
              label={<p>Domain</p>}
              rules={[{ required: true, message: "Domain is required" }]}
            >
              <Select
                onChange={(e) => {
                  setShowDomainNameInput(e);
                }}
                placeholder="Select domain"
                size="large"
              >
                <Select.Option value="yes">Yes</Select.Option>
                <Select.Option value="no">No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"domainName"}
              label={<p>Domain Name</p>}
              className={`${
                showDomainNameInput === "yes" && showDomainNameInput !== ""
                  ? "block"
                  : "hidden"
              }`}
              rules={[
                {
                  required: showDomainNameInput === "yes" ? true : false,
                  message: "Domain name is required",
                },
              ]}
            >
              <Input type="text" placeholder="Domain name" size="large" />
            </Form.Item>
            <Form.Item
              name={"tradeMark"}
              label={<p>Trade Mark</p>}
              rules={[{ required: true, message: "Trade mark is required" }]}
            >
              <Select
                onChange={(e) => {
                  setShowTradeMarkInput(e);
                }}
                placeholder="Select trade mark"
                size="large"
              >
                <Select.Option value="yes">Yes</Select.Option>
                <Select.Option value="no">No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"tradeMarkPhotos"}
              label={<p>Trade Mark Photos</p>}
              valuePropName="fileList"
              getValueFromEvent={normFileTrade}
              className={`${
                showTradeMarkInput === "yes" && showTradeMarkInput !== ""
                  ? "block"
                  : "hidden"
              }`}
              rules={[
                {
                  required: showTradeMarkInput === "yes" ? true : false,
                  message: "Trade Photoos is required",
                },
              ]}
            >
              <Upload
                name="logo"
                listType="picture-card"
                className="avatar-uploader"
                fileList={fileList}
                showUploadList={{
                  showRemoveIcon: true,
                }}
                multiple={true}
                customRequest={({ file, onSuccess, onError }) =>
                customRequestTrade({
                  file,
                  onSuccess,
                  onError,
                  fieldName: "tradeMarkPhotos",
                })
              }
                // onRemove={(file) => onRemoveTrade(file)}
              >
                {fileList.length >= 5 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              name={"dld"}
              label={<p>DLT</p>}
              rules={[{ required: true, message: "DLD is required" }]}
            >
              <Select
                onChange={(e) => {
                  setShowDLDInput(e);
                }}
                placeholder="Select DLD"
                size="large"
              >
                <Select.Option value="yes">Yes</Select.Option>
                <Select.Option value="no">No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"entityno"}
              label={<p>Entity No</p>}
              className={`${
                showDLDInput === "yes" && showDLDInput !== ""
                  ? "block"
                  : "hidden"
              }`}
              rules={[
                {
                  required: showDLDInput === "yes" ? true : false,
                  message: "Entity is required",
                },
              ]}
            >
              <Input type="text" placeholder="Entity no" size="large" />
            </Form.Item>
            <Form.Item
              name={"dldEmail"}
              label={<p>DLT Email</p>}
              className={`${
                showDLDInput === "yes" && showDLDInput !== ""
                  ? "block"
                  : "hidden"
              }`}
              rules={[
                {
                  required: showDLDInput === "yes" ? true : false,
                  message: "DLD email is required",
                },
              ]}
            >
              <Input type="text" placeholder="Dld email" size="large" />
            </Form.Item>
            <Form.Item
              name={"dldPassword"}
              label={<p>DLT Password</p>}
              className={`${
                showDLDInput === "yes" && showDLDInput !== ""
                  ? "block"
                  : "hidden"
              }`}
              rules={[
                {
                  required: showDLDInput === "yes" ? true : false,
                  message: "DLD password is required",
                },
              ]}
            >
              <Input type="text" placeholder="Dld password" size="large" />
            </Form.Item>
            <Form.Item
              name="status"
              label={<p>Status</p>}
              rules={[{ required: true, message: "Status is required" }]}
            >
              <Select placeholder="Choose status..." size="large">
                <Select.Option value="Hot">Hot</Select.Option>
                <Select.Option value="Cold">Cold</Select.Option>
                <Select.Option value="Warm">Warm</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item className="flex items-end justify-end">
              <Button
                htmlType="submit"
                className="bg-green-500 w-[100px] !text-white font-semibol"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: "5",
      label: "Location",
      children: (
        <div className="w-[100vw] flex flex-col items-center min-h-[84vh]  border-b md:border-b-0 md:border-r rounded-md px-5 py-5">
          <h1 className="text-center text-2xl hidden md:block">Location</h1>
          <Form
            layout="vertical"
            className="pt-5 xsm:w-[90vw] md:w-[65vw] lg:w-[50vw]"
            form={locationForm}
            onFinish={handleFinishLocation}
          >
            <Form.Item
              label={<p>Door No</p>}
              name="doorNo"
              rules={[{ required: true, message: "Door no is required" }]}
            >
              <Input type="text" placeholder="Door no..." size="large" />
            </Form.Item>

            <Form.Item
              label={<p>Area Name</p>}
              name="areaName"
              rules={[{ required: true, message: "Area name is required" }]}
            >
              <Input type="text" placeholder="Area name..." size="large" />
            </Form.Item>
            <Form.Item
              label={<p>Land Mark</p>}
              name="landMark"
              rules={[{ required: true, message: "Landmark is required" }]}
            >
              <Input type="text" placeholder="Landmark..." size="large" />
            </Form.Item>
            <Form.Item
              label={<p>City</p>}
              name="locationCity"
              rules={[{ required: true, message: "City is required" }]}
            >
              <Input type="text" placeholder="city..." size="large" />
            </Form.Item>
            <Form.Item
              label={<p>Pincode</p>}
              name="pinCode"
              rules={[{ required: true, message: "Pincode is required" }]}
            >
              <Input type="text" placeholder="Pincode..." size="large" />
            </Form.Item>
            <Form.Item
              label={<p>State</p>}
              name="state"
              rules={[{ required: true, message: "State is required" }]}
            >
              <Input type="text" placeholder="State..." size="large" />
            </Form.Item>
            <Form.Item className="flex items-start justify-start">
           </Form.Item>
            <Form.Item className="flex items-end justify-end">
            <Button
                htmlType="submit"
                className="bg-green-500 w-[170px] !text-white font-semibol"
              >Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div className="lg:w-[100vw]">
      <div className="lg:flex lg:items-center lg:justify-center bg-white pl-2 shadow-2xl rounded-lg lg:!w-[100vw]">
        <Spin spinning={loading}>
        <Tabs
          defaultActiveKey="1"
          items={items}
          className="mt-[30vh] md:mt-[45vh]"
        />
        </Spin>
      </div>
    </div>
  );
}

export default UserLeadGeneration;
