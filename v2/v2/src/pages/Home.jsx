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
    
  <Row justify="center" style={{marginTop:"15%"}}>
    
  
    <Col align="center" span={20} offset={2} pull={1}><Title level={1}style={{color:"white",fontSize:"60px",fontWeight:"bold",fontFamily:"Helvetica"}}>Order your Trip!</Title></Col>
    <Col align="center" span={20} offset={2} pull={1}><Title level={2} style={{align:"middle", color:"white",fontWeight:"normal",fontSize:"30px",textAlign:"center",fontFamily:"Helvetica"}}>Easy and free for all</Title></Col>
    
  </Row>

 
  <Row justify="center">
  
    <Col align="center" span={24} offset={0}><NavLink level={2} to="/login" ><Button align="center" className='ant-btn' shape="round" size='large'> Get Started Now</Button></NavLink></Col>
   
  
  </Row>
  <Row style={{marginBottom:"17.62%"}}></Row>
  </>
  )
}

export default Home;