import '../MyStyle/Home.css';
import React from "react";
import ImageSlider from '../components/ImageSlider';
import { SliderData } from '../components/SliderData';
import { NavLink } from "react-router-dom";
import { Button,Typography } from 'antd';
const { Title, Text } = Typography;




const Home= ({}) => {

  return (
  <React.Fragment>
  <Title style={{color:"white",marginTop:"400px",fontSize:"50px",fontWeight:"bold",fontFamily:"Helvetica"}}>Order your Trip!</Title>
  <Title level={2} style={{color:"white",fontWeight:"normal",fontSize:"30px",fontFamily:"Helvetica"}}>Easy and free for all</Title>
  <NavLink to="/login"><Button className='btn' shape="round" size='large'>Get Started</Button></NavLink>
  </React.Fragment>
  )
}

export default Home;