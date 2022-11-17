import { Button, Space, Typography,Row,Col } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import OrderCard from '../../components/OrderCard';
import MyProfile from '../../components/MyProfile';
const TransporterPage = ({}) => {
  const history = useNavigate();
  
  const [state, setState] = useState([]);
  
  const [loading, setloading] = useState(true);
  
  const { Title, Text } = Typography;
  useEffect(() => {
    getData();
    console.log(state);
  }, [loading]);
  const getData = async () => {
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
        setState(data);
        setloading(false);
      }
    })
      .catch(console.error);
    
  };

  
  return (
    <>
    <MyProfile/>
    {/* <div>
      
       <Row>
        <Col>
      <Title // Form's Title
        level={3}
        style={{
          marginBottom: 0,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        Transporter
      </Title>
      </Col>
      </Row>
    
        <Row>
            <Col span={6}><Text>Nume</Text></Col>
            <Col>{state.Name}</Col>
        </Row>
        <Row>
            <Col span={6}><Text>Prenume</Text></Col>
            <Col>{state.Surname}</Col>
        </Row>
        <Row>
            <Col span={6}><Text>Data nasteri</Text></Col>
            <Col>{state.Birthdate}</Col>
        </Row>
        <Row>
            <Col span={6}><Text>Email</Text></Col>
            <Col>{state.Email}</Col>
        </Row>
        <Row>
            <Col span={6}><Button onClick={()=>{history("/addtransporter")}}>Register Transport</Button></Col>
            <Col></Col>
        </Row>
        </div> */}
    </>
  );
};
export default TransporterPage;