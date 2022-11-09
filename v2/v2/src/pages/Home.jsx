import '../MyStyle/Home.css';
import React from "react";
import ImageSlider from '../components/ImageSlider';
import { SliderData } from '../components/SliderData';
import { NavLink } from "react-router-dom";
import { Button,Typography, Col, Row  } from 'antd';

const { Title, Text } = Typography;




const Home= ({}) => {

  return (
  <>
    
  <Row align="center" style={{marginTop:"15%"}}>
    
  
    <Col span={15} offset={10}><Title style={{color:"white",fontSize:"55px",fontWeight:"bold",fontFamily:"Helvetica"}}>Order your Trip!</Title></Col>
    
  </Row>
  <Row>

    
    <Col span={14} offset={5}>
    <Title level={2} style={{color:"white",fontWeight:"normal",fontSize:"30px",textAlign:"center",fontFamily:"Helvetica"}}>Easy and free for all</Title></Col>

  
  </Row>


  <Row justify="center">

  
    <Col span={4} offset={2}>
        <NavLink level={2} to="/login" ><Button align="center" className='ant-btn' shape="round" size='large'> Get Started Now</Button></NavLink></Col>
   
  
  </Row>
  <Row style={{marginBottom:"30%"}}></Row>
  </>
  )
}

export default Home;