import { Button, Form,Input, notification} from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
const url = import.meta.env.VITE_REACT_APP_URL;

function Admin() {
  const [form] = Form.useForm();
  const userState = useSelector((state) => state?.user?.user?.state);
  const userId = useSelector((state) => state?.user?.user?.userId)

  


  const handleFinish = async (values) => {
    try {
      values.adminId = userId
      values.state = userState
      await axios.post(`${url}/createuser`, values);
      notification.success({ message: "User created successfully" });
      form.resetFields();
    } catch (e) {
      console.log(e);
      notification.error({ message: e.response.data.message });
    }
  };

 


  return (
    <div className="pl-[18vw]  pt-14 w-screen">
      <div className="w-[80vw] pl-20 pt-6 bg-white-70 shadow-md"></div>
      <div className="w-[80vw] pl-20 pt-4 bg-white-70 shadow-md">
        <h1 className="font-semibold">Add Employee Details</h1>
        <Form
          className="grid grid-cols-2 gap-x-20 pt-5 w-[80%]"
          layout="vertical"
          onFinish={handleFinish}
          form={form}
        >
          <Form.Item
            name="name"
            label={<p>Employee Name</p>}
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input type="text" size="large" placeholder="Enter name..." />
          </Form.Item>
          <Form.Item
            name="mobileNumber"
            rules={[
              {
                required: true,
                message: "number is required",
              },
              () => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject();
                  }
                  if (isNaN(value)) {
                    return Promise.reject("Mobile number has to be a number.");
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
            label={<p>Contact Number</p>}
          >
            <Input type="text" size="large" placeholder="Enter mobile no..." />
          </Form.Item>
          <Form.Item
            name="email"
            label={
              <div className="flex items-center gap-1">
                <p>Email</p>
                <span className="text-slate-500 text-[10px]">(Optional)</span>
              </div>
            }
          >
            <Input type="email" size="large" placeholder="Enter email..." />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
            label={<p>Password</p>}
          >
            <Input.Password
              type="text"
              size="large"
              placeholder="Enter password..."
            />
          </Form.Item>
          <Form.Item label={<p>State</p>}>
            <Input value={userState} readOnly />
          </Form.Item>
          <Form.Item
            name="city"
            rules={[{ required: true, message: "City is required" }]}
            label={<p>City</p>}
          >
            <Input
              type="city"
              size="large"
              placeholder="Enter city..."
            />
          </Form.Item>
          <Form.Item className="flex items-end justify-end">
            <Button
              htmlType="submit"
              className="w-[120px] bg-green-500 text-white font-bold h-[38px]"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Admin;
