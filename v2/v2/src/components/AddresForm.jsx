import React from "react";
import { Form, Input, Button, Typography, Space,Row,Col } from "antd";

const AddresForm = () => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  return (
    <div class="OfferBackground">
      <Title // Form's Title
        level={3}
        style={{
          marginBottom: 0,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
         Fill in Address Details
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
          label="Country"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter location!",
            },
          ]}
        >
          <Input placeholder="Address ID" />
        </Form.Item>
        <Form.Item // Form Item (Last Name)
          label="City"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your destination!",
            },
          ]}
        >
          <Input placeholder="Location Name" />
        </Form.Item>

        <Form.Item 
          label="Town"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Price",
              type: "price",
            },
          ]}
        >
          <Input placeholder="If not,type city name" />
        </Form.Item>
        
          
        <Form.Item 
          label="Street"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Price",
              type: "price",
            },
          ]}
        >
          <Input placeholder="Street Name" />
        </Form.Item>

        <Form.Item 
          label="Street Number"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Price",
              type: "price",
            },
          ]}
        >
          <Input placeholder="Street Number" />
        </Form.Item>

        <Form.Item 
          label="Zip Code"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Price",
              type: "price",
            },
          ]}
        >
          <Input placeholder="Zip" />
        </Form.Item>
       
        { <Row>
                        <Col span={4}>
                            <Form.Item>
                        <Button type="primary" >Cancel</Button>
                         </Form.Item>  
                         </Col>
                        <Col span={4} offset={0}>
                            <Form.Item>
                        <Button   type="primary" >OK</Button>
                         </Form.Item> 
                        </Col>
                         </Row>
                    } 
      </Form>
    </div>
  );
};

export default AddresForm;