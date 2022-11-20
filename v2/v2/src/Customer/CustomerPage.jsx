import React from 'react';
import MyProfile from '../components/MyProfile';
import { Button, Space, Typography, Row, Col, Card, Collapse,Descriptions } from 'antd';


const CustomerPage = ({ }) => {

  return (
      <Row><Col span={20} style={{marginTop:"20vh" }} align="center" offset={2} push={0}><MyProfile/></Col></Row>
  );
};
export default CustomerPage;