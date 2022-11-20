import React,{useState,useEffect}from "react";
import { Form, Input, Button, Typography,Select, Spin,Row,Col ,Card} from "antd";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import '../../MyStyle/AddTransport.css'



const AddTransport = ({}) => {
  const history = useNavigate();
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const [loading, setloading] = useState(true);
  const [numberseats, setNumberSeats] = useState(0);
  const [plate, setPlate] = useState("");
  const [typetransportid, setTypeTransportId] = useState(0);
  const [transportid, setTransportId] = useState(0);
  const [modelid, setModelId] = useState(0);
  const [state, setState] = useState([]);
  const [stateType, setStateType] = useState([]);
  const [userId,setUserId] = useState(0);
  const [test, setTest] = useState(0);
  const handleNumberSeatsChange = (e) => {
    setNumberSeats(e.target.value);
    
  };
  const handlePlateChange = (e) => {
    setPlate(e.target.value);
  };
  const handleTypeTransportIdChange = (value) => {
    setTypeTransportId(value);
    
  };
  const handleModelChange = (value) => {
    setModelId(value);
    
  };
  useEffect(() => {
    getData();
    getDataType();
  }, [loading]);
  const getData = async () => {
    await Axios.get(
      "http://localhost:8080/api/model/getall"
    ).then(
      res => {

        setState(
          res.data.map(row => ({
            IdModel: row.IdModel,
            Name: row.Name,
            BrandId: row.BrandId,
            
          })
          
          )
          
        );
        
        console.log(state);
        
        setloading(false);
      }
    );
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
    
  };
  const getDataType = async () => {
    
    await Axios.get(
      "http://localhost:8080/api/typeTrasport/getall"
    ).then(
      res => {

        setStateType(
          res.data.map(row => ({
            IdTypeTrasport: row.IdTypeTrasport,
            Name: row.Name,
            
          })
          
          )
          
        );
        
        console.log(stateType);
        
        setloading(false);
      }
    );
  };
const addTransporter = ()=>{
    fetch(`http://localhost:8080/api/transporter/add`, {
        method: 'POST',
        body: JSON.stringify({
            transportid:transportid,
            userid:userId,
          
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);
        
          return res.json();
  
      }).then((data) => {
          console.log(data);
        if (data != null) {
          
          return history('/transporter');
        }
      });
} 
  const handleSubmit = (e) => {
    //e.preventDefault();

    fetch(`http://localhost:8080/api/transport/add`, {
      method: 'POST',
      body: JSON.stringify({
        numberseats:numberseats,
        plate:plate,
        modelid:modelid,
        typetransportid:typetransportid
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res);
      
        return res.json();

      

    }).then((data) => {
        console.log(data);
      if (data != null) {
       
        fetch(`http://localhost:8080/api/transporter/add`, {
        method: 'POST',
        body: JSON.stringify({
            transportid:data.IdTransport,
            userid:userId,
          
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res);
        
          return res.json();
  
      }).then((data) => {
          console.log(data);
        if (data != null) {
          
          return history('/transporter');
        }
      });
      }
    });
    console.log(transportid);
    console.log(userId);
    
  };
  return (
    <div>
      <Row align='middle' >
      <Col align="center" span={10} offset={6}  push={1} >
      
      </Col>
      </Row>
      <Row style={{marginTop:'20vh'}}><Col span={24} align="center" ><Card className="AddTransport"
      title="Add Transport"
      bordered={false}
      style={{
        width: 600,
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
        <Form.Item // Form Item (First Name)
          label="Number seats"
          name="numberseats"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter number seats!",
            },
          ]}
        >
          <Input placeholder="Number seats" onChange={handleNumberSeatsChange} value={numberseats} />
        </Form.Item>
       
        
        <Form.Item // Form Item (Email)
          label="Plate"
          name="plate"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter number of plate!"
            },
          ]}
        >
          <Input style={{ width: "150px" }} placeholder="Plate" onChange={handlePlateChange} value={plate} />
        </Form.Item>
        <Form.Item // Form Item (Email)
          label="Type Transport"
          name="typetransport"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter type transport!"
            },
          ]}
        >
        < Select
      defaultValue="Select type transport"
      style={{
        width: 120,
      }}
      onChange={handleTypeTransportIdChange}
      options={stateType.map((item)=>({
        value:item.IdTypeTrasport,
        label:`${item.Name}`
      }))}
    />
      
    
        </Form.Item>
        <Form.Item // Form Item (Email)
          label="Model"
          name="model"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter number of plate!"
            },
          ]}
        >
        < Select
      defaultValue="Select model"
      style={{
        width: 120,
      }}
      onChange={handleModelChange}
      options={state.map((item)=>({
        value:item.IdModel,
        label:`${item.Name},${item.BrandId}`
      }))}
    />
      
    
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      </Card></Col></Row>
    </div>
  );
};

export default AddTransport;