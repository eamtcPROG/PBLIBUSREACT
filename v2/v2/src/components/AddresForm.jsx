import React,{useState} from "react";
import { Form, Input, Button, Typography, Space,Row,Col } from "antd";

const AddresForm = ({setIdAddress}) => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const [locationname, setLocationName] = useState('');
    const [addressnumber, setAddressNumber] = useState('');
    const [addressname, setAddressName] = useState('');
    const [countryid, setCountryId] = useState(0);
    const [error, setError] = useState('');
  
    const handleLocationNameChange = (e) => {
        setLocationName(e.target.value);
    };
    const handleAddressNumberChange = (e) => {
        setAddressNumber(e.target.value);
    };
    const handleAddressNameChange = (e) => {
        setAddressName(e.target.value);
    };
    const handleCountryIdChange = (e) => {
        setCountryId(e.target.value);
    };
    // Controlled form
    const handleSubmit = (e) => {
      //e.preventDefault();
  
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
        
        }else{
          setError('Invalid ');
          
        }
  
        
      }).then((data) => {
        try {
          if(error != null ){  
            
            setIdAddress(data.IdAddress);
           
           }
        } catch(error){console.log(error)} 
        
        
        
        });
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
        onFinish={handleSubmit}
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
          <Input placeholder="Country" onChange={handleCountryIdChange} value={countryid}/>
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
          <Input placeholder="Location Name" onChange={handleLocationNameChange} value={locationname}/>
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
          <Input placeholder="If not,type city name" onChange={handleAddressNumberChange} value={addressnumber}/>
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
          <Input placeholder="Street Name" onChange={handleAddressNameChange} value={addressname}/>
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

       
        { <Row>
                        <Col span={4}>
                            <Form.Item>
                        <Button type="danger" >Cancel</Button>
                         </Form.Item>  
                         </Col>
                        <Col span={4} offset={0}>
                            <Form.Item>
                        <Button   type="submit" >OK</Button>
                         </Form.Item> 
                        </Col>
                         </Row>
                    } 
      </Form>
    </div>
  );
};

export default AddresForm;