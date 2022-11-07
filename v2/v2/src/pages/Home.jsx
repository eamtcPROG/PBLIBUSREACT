import '../MyStyle/Home.css';
import React from "react";
import ImageSlider from '../components/ImageSlider';
import { SliderData } from '../components/SliderData';
import { NavLink } from "react-router-dom";
import { Button,Typography, Col, Row  } from 'antd';

const { Title, Text } = Typography;




const Home= ({}) => {

  return (
  <React.Fragment>
    
  <Row align="middle" style={{marginTop:"15%"}}>
    
    <Col span={5}></Col>
    <Col span={14}><Title style={{color:"white",fontSize:"50px",fontWeight:"bold",fontFamily:"Helvetica"}}>Order your Trip!</Title></Col>
    <Col span={5}></Col>
   
  </Row>
  <Row>

    <Col span={5}></Col>
    <Col span={14}>
    <Title level={2} style={{color:"white",fontWeight:"normal",fontSize:"30px",textAlign:"center",fontFamily:"Helvetica"}}>Easy and free for all</Title>
    </Col>
    <Col span={5}></Col>
  
  </Row>
  <Row align="middle" justify="center">

    <Col span={12}></Col>
    <Col span={4} >
    <NavLink style={{flex: 1, display: "flex", alignItems: "center"}} to="/login" ><Button className='btn' shape="round" size='large'>Get Started</Button></NavLink>
    </Col>
    <Col span={8}></Col>
  </Row>
  
  </React.Fragment>
  )
}

export default Home;