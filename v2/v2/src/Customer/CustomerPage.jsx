import React from 'react';
import MyProfile from '../components/MyProfile';
import { Button, Space, Typography, Row, Col, Card, Collapse,Descriptions } from 'antd';


const CustomerPage = ({ }) => {

  return (
      <Row>
        <Col xs={2} sm={2} md={8}/>
        <Col xs={20} sm={20} md={8} style={{marginTop:"10%" }} align="center" ><MyProfile/></Col>
        <Col xs={2} sm={2} md={8}/>
        </Row>
  );
};
export default CustomerPage;