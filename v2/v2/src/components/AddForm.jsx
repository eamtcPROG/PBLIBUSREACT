import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, DatePicker, Space, Card, Row, Select, Col } from "antd";
import { useNavigate } from "react-router-dom";
import AddresForm from "./AddresForm";
<<<<<<< HEAD
import '../MyStyle/AddForm.css'
=======
import Axios from "axios";
import '.././MyStyle/AddForm.css'
>>>>>>> 2fef2423d9cc92d99dbce6f22f86d521517503bd
import MyNotifications from "../notifications/MyNotifications";
const AddForm = () => {
  const history = useNavigate();
  const mynotification = new MyNotifications();

  const [form] = Form.useForm();
  const { Title, Text } = Typography;

  const [locationname, setLocationName] = useState('');
  const [locationnameD, setLocationNameD] = useState('');
  const [numberpersons, setNumberPersons] = useState(0);
  const [startpointaddressid, setStartPointAddressId] = useState(0);
  const [endpointaddressid, setEndPointAddressId] = useState(0);

  const [userId, setUserId] = useState(0);
  const [loading, setloading] = useState(true);

  const [date, setDate] = useState(null);

  const [addressnumber, setAddressNumber] = useState('');
  const [addressnumberD, setAddressNumberD] = useState('');
  const [addressname, setAddressName] = useState('');
  const [addressnameD, setAddressNameD] = useState('');
  const [state, setState] = useState([])
  const [countryid, setCountryId] = useState(0);
  const [countryidD, setCountryIdD] = useState(0);

  const [damy, setDamy] = useState(0);
  const [moredetails, setMoreDetails] = useState('');

  useEffect(() => {
    getData();
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/api/auth/getuser`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
      },
    }).then((res) => {
      return res.json();

    }).then((data) => {

      if (data) {
        setUserId(data.IdUser);
        setloading(false);
      }
    })
      .catch(console.error);
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

  const handleNumberPersonsChange = (e) => {
    setNumberPersons(e.target.value);
  };

  const handleDateChange = (e, value) => {
    setDate(value);
  };
  const handleMoreDetailsChange = (e) => {
    setMoreDetails(e.target.value);

  };
  const handleCountryIdChange = (value) => {
    setCountryId(value);

  };
  const handleCountryIdDChange = (value) => {
    setCountryIdD(value);

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
  const handleLocationNameDChange = (e) => {
    setLocationNameD(e.target.value);
  };
  const handleAddressNumberDChange = (e) => {
    setAddressNumberD(e.target.value);
  };
  const handleAddressNameDChange = (e) => {
    setAddressNameD(e.target.value);
  };


  const handleSubmit = (event) => {



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

      if (res.status === 200) {
        return res.json();

      }

    }).then((data) => {
      if (data != undefined) {
        setStartPointAddressId(data.IdAddress);
        return data.IdAddress;
      }
    }).then((idS) => {
      fetch(`http://localhost:8080/api/address/add`, {
        method: 'POST',
        body: JSON.stringify({
          locationname: locationnameD,
          addressnumber: addressnumberD,
          addressname: addressnameD,
          countryid: countryidD
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {

        if (res.status === 200) {
          return res.json();

        }

      }).then((data) => {
        if (data != undefined) {
          setEndPointAddressId(data.IdAddress);
          var ids = [idS,data.IdAddress]
          return ids;
        }
      }).then((id) => {
        
        if (id[0] != undefined && id[1] != undefined) {
          fetch(`http://localhost:8080/api/order/add`, {
            method: 'POST',
            body: JSON.stringify({
              numberpersons,
              startpointaddressid:id[0],
              endpointaddressid:id[1],
              date,
              moredetails
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((res) => {
            if (res.status === 200) {
              return res.json();
            }

          }).then((data) => {

            if (data != null) {


              fetch(`http://localhost:8080/api/customer/add`, {
                method: 'POST',
                body: JSON.stringify({
                  orderid: data.IdOrder,
                  userid: userId
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              }).then((res) => {
                if (res.status === 200) {
                  return res.json();

                }

              }).then((data) => {

                if (data != null) {

                  mynotification.succesNotification("Order");
                  return history('/orderpage');
                }
              });
            }
          });
        }
      });

    });

  };


  return (

    <Card
      title="Add Order"
      bordered={false}
      style={{
        width: "50%"
      }}
    >
      <Form
        name="contact-us"
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >

        <Row>
          <Title>Set Starting Location</Title>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item
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
                  width: "100%",
                }}
                onChange={handleCountryIdChange}
                options={state.map((item) => ({
                  value: item.IdCountry,
                  label: `${item.Name}`
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={10} push={2}>
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
              <Input className="InputAddForm" placeholder="Location Name" onChange={handleLocationNameChange} value={locationname} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item
              label="Street"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Street Name",
                  type: "text",
                },
              ]}
            >
              <Input className="InputAddForm" placeholder="Street Name" onChange={handleAddressNameChange} value={addressname} />
            </Form.Item>
          </Col>
          <Col span={10} push={2}>
            <Form.Item
              label="Street Number"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Street Number",
                  type: "text",
                },
              ]}
            >
              <Input className="InputAddForm" placeholder="Street Number" onChange={handleAddressNumberChange} value={addressnumber} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Title>Set Destination</Title>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item
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
                  width: "100%",
                }}
                onChange={handleCountryIdDChange}
                options={state.map((item) => ({
                  value: item.IdCountry,
                  label: `${item.Name}`
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={10} push={2}>
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
              <Input className="InputAddForm" placeholder="Location Name" onChange={handleLocationNameDChange} value={locationnameD} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item
              label="Street"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Street Name",
                  type: "text",
                },
              ]}
            >
              <Input className="InputAddForm" placeholder="Street Name" onChange={handleAddressNameDChange} value={addressnameD} />
            </Form.Item>
          </Col>
          <Col span={10} push={2}>
            <Form.Item
              label="Street Number"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Street Number",
                  type: "text",
                },
              ]}
            >
              <Input className="InputAddForm" placeholder="Street Number" onChange={handleAddressNumberDChange} value={addressnumberD} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
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

              <DatePicker style={{ width: "100%" }} onChange={handleDateChange} value={date} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item // Form Item (Email)
              label="Number of people"
              name="nrPeople"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: "Please enter number of people!"
                },
              ]}
            >
              <Input style={{ width: "100%" }} placeholder="Number of people" onChange={handleNumberPersonsChange} value={numberpersons} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item 
              label="Preferences"
              name="message"
            >
              <Input.TextArea
                placeholder="Type here.."
                autoSize={{ minRows: 8, maxRows: 10 }}
                onChange={handleMoreDetailsChange} value={moredetails}

              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>

  );
};

export default AddForm;