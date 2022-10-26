import React from "react";
import { Form, Input, Button, Typography,DatePicker, Space } from "antd";
import type { DatePickerProps } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
const EditOrder = () => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  return (
    <div>
      <Title // Form's Title
        level={3}
        style={{
          marginBottom: 0,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
         Edit Order
      </Title>
      <Text // Form's Description
        type="secondary"
        style={{
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        
      </Text>
      <Form // Ant Design's Form Component
        name="contact-us"
        layout="vertical"
        form={form}
        wrapperCol={{
          span: 6,
        }}
        style={{
          marginTop: 20,
          paddingBottom: 10,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <Form.Item // Form Item (First Name)
          label="Edit Location"
          name="firstName"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter new location!",
            },
          ]}
        >
          <Input placeholder="From" />
        </Form.Item>
        <Form.Item // Form Item (Last Name)
          label="Edit Destination"
          name="lastName"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your new destination!",
            },
          ]}
        >
          <Input placeholder="To" />
        </Form.Item>
        <Form.Item // Form Item (Email)
          label="Edit Email"
          name="email"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your new email!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Edit Date"
          name="date"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter the new date!",
              type: "date",
            },
        ]}
            >
            
        <DatePicker onChange={onChange} />
        </Form.Item>
        <Form.Item // Form Item (Email)
          label="Edit Number of people"
          name="nr. people"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter number of people!",
              type: "people",
            },
          ]}
        >
          <Input style={{width:"150px"}} placeholder="Number of people" />
        </Form.Item>
        <Form.Item // Form Item (Message)
          label="Edit Preferences"
          name="message"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Message is a required field!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Type here.."
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item // Form Item (Submit Button)
        >
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditOrder;