import React, { useEffect, useState } from "react";
import { Card,Row,Col } from "antd";
import { EditOutlined } from '@ant-design/icons';

import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { format } from 'date-fns'
import { NavLink,useNavigate } from "react-router-dom";
import '././../MyStyle/OrderCard.css'
const { Title, Text } = Typography;
const OrderCard = ({ state,setOrderId }) => {
    const history = useNavigate();
    const handleMakeOffer = ()=>{
        if(state != undefined) setOrderId(state.IdOrder);
        console.log(state)
        history("/addoffer");
    }
    
    return state != undefined ? (
        <>

            <Card className="ordercard"
      title={state.Title}
      bordered={false}
      style={{
        width: 900,
      }}
    >
      <Row>
        <Col span={4} align="center" offset={1}>
        <Text>Start Location: </Text> {state != undefined ? state.AddressFull : ""}
        </Col>
        
        <Col span={4} offset={1} align="center">
        <Text>Destination: </Text> {state != undefined ? state.AddressFullSecond : ""}
        </Col>
        <Col  span={8} align="center">
        <Text>Travel Date: </Text> {state != undefined ? format(new Date(state.Date), 'dd-MM-yyyy'): ""}
        </Col>
        <Col span={2} align="center">
        <Text>Number of people: </Text> {state != undefined ? state.NumberPersons : ""}
        </Col>
      </Row>
      <Row>
        <Col span={12} align="left" offset={1}>
        <Text>Comment:</Text>    {state != undefined ? state.MoreDetails : ""}
        </Col>
        <Col span={8} offset={10}>
        <Button onClick={handleMakeOffer}>Make an offer</Button>
        </Col>
      </Row>
     
    </Card>
        </>
    ):(<></>);
};

export default OrderCard;