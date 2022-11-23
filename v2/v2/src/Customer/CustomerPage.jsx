import React from 'react';
import MyProfile from '../components/MyProfile';
import { Button, Space, Typography, Row, Col, Card, Collapse,Descriptions } from 'antd';


const CustomerPage = ({ }) => {

  return (
      <Row>
        <Col span={9}/>
        <Col span={6} style={{marginTop:"10%" }} align="center" ><MyProfile/></Col>
        <Col span={9}/>
        </Row>
  );
};
export default CustomerPage;