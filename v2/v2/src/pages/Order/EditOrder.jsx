import React from "react";
import { Form, Input, Button, Typography,DatePicker, Space,Row,Col } from "antd";

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
         Add Order
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
          label="ID Addres"
          name="firstName"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter location!",
            },
          ]}
        >
          <Input placeholder="From" />
        </Form.Item>
        <Form.Item // Form Item (Last Name)
          label="Destination"
          name="lastName"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your destination!",
            },
          ]}
        >
          <Input placeholder="To" />
        </Form.Item>
        <Form.Item // Form Item (Email)
          label="Email"
          name="email"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Date"
          name="date"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter the date!",
              type: "date",
            },
        ]}
            >
            
        <DatePicker  />
        </Form.Item>
        <Form.Item // Form Item (Email)
          label="Number of people"
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
          label="Preferences"
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
        { <Row>
                        <Col span={4}>
                            <Form.Item>
                        <Button type="primary" >Cancel</Button>
                         </Form.Item>  
                         </Col>
                        <Col span={4} offset={0}>
                            <Form.Item>
                        <Button   type="primary" >Submit</Button>
                         </Form.Item> 
                        </Col>
                         </Row>
                    } 
      </Form>
    </div>
  );
};

export default EditOrder;