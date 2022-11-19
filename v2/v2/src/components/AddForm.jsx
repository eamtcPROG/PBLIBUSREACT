import React,{useState,useEffect}from "react";
import { Form, Input, Button, Typography, DatePicker, Space,Card,Row,Select,Col } from "antd";
import { useNavigate } from "react-router-dom";
import AddresForm from "./AddresForm";
import '.././MyStyle/AddForm.css'
import MyNotifications from "../notifications/MyNotifications";
const AddForm = () => {
  const history = useNavigate();
  const mynotification = new MyNotifications();
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const [locationname, setLocationName] = useState('');
  const [numberpersons, setNumberPersons] = useState(0);
  const [startpointaddressid, setStartPointAddressId] = useState(0);
  const [endpointaddressid, setEndPointAddressId] = useState(0);
  const [idaddress, setIdAddress] = useState(0);
  const [userId,setUserId] = useState(0);
  const [loading, setloading] = useState(true);
  const [date, setDate] = useState(null);
  const [addressnumber, setAddressNumber] = useState('');
  const [addressname, setAddressName] = useState('');
  const [state, setState] = useState([])
  const [countryid, setCountryId] = useState(0);
  const [moredetails, setMoreDetails] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isActiveSecond, setIsActiveSecond] = useState(true);
  useEffect(() => {
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
  const handleNumberPersonsChange = (e) => {
    setNumberPersons(e.target.value);
    console.log(e.target.value);
  };
  const handleStartPointAddressIdChange = (e) => {
    setStartPointAddressId(e.target.value);
  };
  const handleEndPointAddressIdChange = (e) => {
    setEndPointAddressId(e.target.value);
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
  const handleLocationNameChange = (e) => {
    setLocationName(e.target.value);
  };
  const handleAddressNumberChange = (e) => {
    setAddressNumber(e.target.value);
  };
  const handleAddressNameChange = (e) => {
    setAddressName(e.target.value);
  };
  const handleAddress  =()=> {
   setIsActive(!isActive);

}
const handleAddressSecond  =()=> {
  setIsActiveSecond(!isActiveSecond);
  setStartPointAddressId(idaddress);
  
} 
  
  const handleSubmit = (event) => {
    //event.preventDefault();
    setEndPointAddressId(idaddress);
    console.log(idaddress);
    console.log(endpointaddressid);
    fetch(`http://localhost:8080/api/order/add`, {
      method: 'POST',
      body: JSON.stringify({
        numberpersons,
        startpointaddressid,
        endpointaddressid:idaddress,
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
        orderid:data.IdOrder,
        userid:userId
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

  };
  return (
    <div>
      {/* <Title // Form's Title
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

      </Text> */}
      <Card
      title="Add Order"
      bordered={false}
      style={{
        width: 1000
      }}
    >
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
        {/* <Form.Item // Form Item (First Name)
          label="Start Location"
          name="firstName" */}
          
        {/* > */}
          {/* <Input placeholder="From" onChange={handleStartPointAddressIdChange} value={startpointaddressid} /> */}
          {/* <Button onClick={handleAddress} >Add address</Button> */}
          {/* {isActive ? <AddresForm setIdAddress={setIdAddress} setIsActive={setIsActive} formNumber={1}/> : <></>} */}
        {/* </Form.Item> */}
        {/* <Form.Item // Form Item (Last Name)
          label="Destination"
          name="destination"
          
        > */}
          {/* <Input placeholder="To" onChange={handleEndPointAddressIdChange} value={endpointaddressid} /> */}
          {/* <Button onClick={handleAddressSecond} >Add address</Button> */}
          {/* {isActiveSecond ? <AddresForm setIdAddress={setIdAddress} setIsActiveSecond={setIsActiveSecond} formNumber={2}/> : <></>} */}
        {/* </Form.Item> */}
        <Row>
        <Title>Set Starting Location</Title>
        </Row>
        <Row>
        <Col span={4}>
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
    </Col>
    
    <Col span={6} push={1}>
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
    <Col span={4}>
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
          <Input className="InputAddForm" placeholder="Street Name" onChange={handleAddressNameChange} value={addressname} />
        </Form.Item>
        </Col>
        <Col span={6} push={1}>
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
          <Input className="InputAddForm" placeholder="If not,type city name" onChange={handleAddressNumberChange} value={addressnumber} />
        </Form.Item>
        </Col>
    </Row>
        
        <Row>
        <Title>Set Destination</Title>
        </Row>
        <Row>
        <Col span={4}>
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
    </Col>
    <Col span={6} push={1}>
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
    <Col span={4}>
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
          <Input className="InputAddForm" placeholder="Street Name" onChange={handleAddressNameChange} value={addressname} />
        </Form.Item>
        </Col>
    <Col span={6} push={1}>
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
          <Input className="InputAddForm" placeholder="If not,type city name" onChange={handleAddressNumberChange} value={addressnumber} />
        </Form.Item>
        </Col>
    </Row>
        
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

        <DatePicker onChange={handleDateChange} value={date}/>
        </Form.Item>
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
          <Input style={{ width: "150px" }} placeholder="Number of people" onChange={handleNumberPersonsChange} value={numberpersons} />
        </Form.Item>
        <Form.Item // Form Item (Message)
          label="Preferences"
          name="message"
        >
          <Input.TextArea
            placeholder="Type here.."
            autoSize={{ minRows: 8, maxRows: 10 }}
            onChange={handleMoreDetailsChange} value={moredetails}
            
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      </Card>
    </div>
  );
};

export default AddForm;