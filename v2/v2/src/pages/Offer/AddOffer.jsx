import React, { useState,useEffect } from "react";
import { Form, Input, Button, Typography, Select } from "antd";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
const AddOffer = ({ orderId, userId }) => {
  const history = useNavigate();
  const [form] = Form.useForm();
  const { Title, Text } = Typography;

  const [price, setPrice] = useState(0.0);
  const [orderid, setOrderId] = useState(0);
  const [trasporterid, settrasporterid] = useState(0);
  const [loading, setloading] = useState(true);
  const [state, setState] = useState([]);
  const handlePriceChange = (e) => {
    setPrice(e.target.value);

  };
  const handleOrderIdChange = (e) => {
    setOrderId(e.target.value);
  };
  const handletrasporteridChange = (value) => {
    console.log(value);
    settrasporterid(value);
    console.log(trasporterid);
  };
  useEffect(() => {
    getData();

  }, [loading]);
  const getData = async () => {
    console.log(userId)
    await Axios.get(
      `http://localhost:8080/api/transporter/getalltransport/${userId}`
    ).then(
      res => {
        console.log()

        setState(
          res.data.map(row => ({
            
              IdTransporter: row.Transporters[0].IdTransporter ,
              ModelName: row.Model.Name ,
              NumberSeats: row.NumberSeats
            
          })

          )

        );

        console.log(state);

        setloading(false);
      }
    );
  };
  const handleSubmit = (e) => {
    //e.preventDefault();

    fetch(`http://localhost:8080/api/offer/add`, {
      method: 'POST',
      body: JSON.stringify({
        price,
        orderid: orderId,
        trasporterid
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        return res.json();

      }

    }).then((data) => {
      console.log(data);
      if (data != null) {
        return history('/offerpage');
      }
    });

  };
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
        Add Offer
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
        onFinish={handleSubmit}
      >
        <Form.Item // Form Item (First Name)
          label="Price"
          name="price"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter price!",
            },
          ]}
        >
          <Input placeholder="Price" onChange={handlePriceChange} value={price} />
        </Form.Item>


        <Form.Item // Form Item (Email)
          label="Transport"
          name="transport"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter number of transport!"
            },
          ]}
        >
          < Select
            defaultValue="Select model"
            style={{
              width: 300,
            }}
            onChange={handletrasporteridChange}
            options={state.map((item) => ({
              value: item.IdTransporter,
              label: `${item.ModelName} - Number of seats ${item.NumberSeats}`
            }))}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddOffer;