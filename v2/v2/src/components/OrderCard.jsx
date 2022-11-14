import React, { useEffect, useState } from "react";
import { Card,Row,Col } from "antd";
import { EditOutlined } from '@ant-design/icons';

import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { format } from 'date-fns'
import { NavLink,useNavigate } from "react-router-dom";
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

            {/* <Card title="Card title" bordered={false}
                style={{
                    width: "90em",
                    marginTop: 16,
                }}
                actions={[
                    <Button onClick={handleMakeOffer}>Make an offer</Button>
                ]}
            >
                
                <Card.Grid  hoverable={false} style={{
                    width: '20%',
                    textAlign: 'center',

                }}>
                    {state != undefined ? state.StartPointAddressId : ""}
                </Card.Grid>
                <Card.Grid hoverable={false} style={{
                    width: '20%',
                    textAlign: 'center',
                }}>
                    {state != undefined ? state.EndPointAddressId : ""}
                </Card.Grid>
                <Card.Grid  hoverable={false} style={{
                    width: '20%',
                    textAlign: 'center',
                }}>
                    {state != undefined ? state.Date: ""}
                </Card.Grid>
                <Card.Grid hoverable={false} style={{
                    width: '5%',
                    textAlign: 'center',
                }}>
                    {state != undefined ? state.NumberPersons : ""}
                </Card.Grid>
                <Card.Grid hoverable={false} style={{
                    width: '35%',
                    textAlign: 'center',
                }}>
                    {state != undefined ? state.MoreDetails : ""}
                </Card.Grid>
            </Card> */}
            <Card 
      title={state.Title}
      bordered={false}
      style={{
        width: 600,
      }}
    >
      <Row>
        <Col span={4} align="center" offset={1}>
        {state != undefined ? state.AddressFull : ""}
        </Col>
        
        <Col span={4} offset={1} align="center">
        {state != undefined ? state.AddressFullSecond : ""}
        </Col>
        <Col  span={8} align="center">
        {state != undefined ? format(new Date(state.Date), 'dd-MM-yyyy'): ""}
        </Col>
        <Col span={2} align="center">
        {state != undefined ? state.NumberPersons : ""}
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