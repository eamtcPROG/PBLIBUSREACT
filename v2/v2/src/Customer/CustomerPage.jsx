import React from 'react';
import MyProfile from '../components/MyProfile';
import { Button, Space, Typography, Row, Col, Card, Collapse,Descriptions } from 'antd';


const CustomerPage = ({ }) => {

  return (
      <Row>
        <Col xs={2} sm={2} md={9}/>
        <Col xs={20} md={20} style={{marginTop:"10%" }} align="center" ><MyProfile/></Col>
        <Col xs={2} sm={2} md={9}/>
        </Row>
  );
};
export default CustomerPage;