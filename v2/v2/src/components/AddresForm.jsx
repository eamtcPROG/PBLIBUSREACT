import React, { useState,useEffect } from "react";
import { Form, Input, Button, Typography, Space, Row, Col,Select } from "antd";
import Axios from "axios";
const AddresForm = ({ setIdAddress, setIsActive, setIsActiveSecond, formNumber }) => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const [locationname, setLocationName] = useState('');
  const [addressnumber, setAddressNumber] = useState('');
  const [addressname, setAddressName] = useState('');
  const [countryid, setCountryId] = useState(0);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const [state, setState] = useState([]);
  useEffect(() => {
    getData();
   
  }, [loading]);
  const getData = async () => {
    await Axios.get(
      "http://localhost:8080/api/country/getall"
    ).then(
      res => {

        setState(
          res.data.map(row => ({
            IdCountry: row.IdCountry,
            Name: row.Name,
          })
          
          )
          
        );
        
        console.log(state);
        
        setloading(false);
      }
    );
  };
  const handleLocationNameChange = (e) => {
    setLocationName(e.target.value);
  };
  const handleAddressNumberChange = (e) => {
    setAddressNumber(e.target.value);
  };
  const handleAddressNameChange = (e) => {
    setAddressName(e.target.value);
  };
  const handleCountryIdChange = (value) => {
    setCountryId(value);

  };
  const goBack = () => {
    if (formNumber == 1) setIsActive(false);
    else if(formNumber == 2) setIsActiveSecond(false);
  }
  // Controlled form
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/api/address/add`, {
      method: 'POST',
      body: JSON.stringify({
        locationname,
        addressnumber,
        addressname,
        countryid

      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res)
      if (res.status === 200) {
        return res.json();

      } else {
        setError('Invalid ');

      }


    }).then((data) => {
      try {
        setIdAddress(data.IdAddress);
      } catch (error) { console.log(error) }
      console.log(data.IdAddress);
      console.log(data);


    });
    if (formNumber == 1) setIsActive(false);
    else if(formNumber == 2) setIsActiveSecond(false);
  };
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
          < Select
      defaultValue="Select Country"
      style={{
        width: 120,
      }}
      onChange={handleCountryIdChange}
      options={state.map((item)=>({
        value:item.IdCountry,
        label:`${item.Name}`
      }))}
    />
    </Form.Item>
        <Form.Item
          label="Town"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter your destination!",
            },
          ]}
        >
          <Input placeholder="Location Name" onChange={handleLocationNameChange} value={locationname} />
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
          <Input placeholder="Street Name" onChange={handleAddressNameChange} value={addressname} />
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
          <Input placeholder="If not,type city name" onChange={handleAddressNumberChange} value={addressnumber} />
        </Form.Item>



        {<Row>
          <Col span={4} offset={0}>
            <Form.Item>
              <Button type="submit" onClick={handleSubmit}>OK</Button>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button type="danger" onClick={goBack}>Cancel</Button>
            </Form.Item>
          </Col>

        </Row>
        }
      </Form>
    </div>
  );
};

export default AddresForm;