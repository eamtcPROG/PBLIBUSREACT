import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { EditOutlined } from '@ant-design/icons';

import { Button, Checkbox, Form, Input, Typography, Descriptions } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { format } from 'date-fns'
import { NavLink, useNavigate } from "react-router-dom";
import '././../MyStyle/OrderCard.css'
import '././../MyStyle/Buttons.css'
const { Title, Text } = Typography;
const OrderCard = ({ state, setOrderId }) => {
  const history = useNavigate();
  const handleMakeOffer = () => {
    if (state != undefined) setOrderId(state.IdOrder);
    console.log(state)
    history("/addoffer");
  }

  return state != undefined ? (
    <>

      <Card className="ordercard"
        actions={[<Button type="primary" shape="round" className="makeofferbutton" onClick={handleMakeOffer}>Make an offer</Button>]}
        title={state.Title}
        bordered={false}
        style={{
          width: "100%",
          marginBottom:"2%"
        }}
      >
        <Row>
          <Col span={24}>
            <Descriptions>
              <Descriptions.Item label="Start Location">{state != undefined ? state.AddressFull : ""}</Descriptions.Item>
              <Descriptions.Item label="Destination">{state != undefined ? state.AddressFullSecond : ""}</Descriptions.Item>
              <Descriptions.Item label="Travel Date">{state != undefined ? format(new Date(state.Date), 'dd-MM-yyyy') : ""}</Descriptions.Item>
              <Descriptions.Item label="Number of people">{state != undefined ? state.NumberPersons : ""}</Descriptions.Item>
              <Descriptions.Item label="Comments">{state != undefined ? state.MoreDetails : ""}</Descriptions.Item>

            </Descriptions>
          </Col>
        </Row>

      </Card>
    </>
  ) : (<></>);
};

export default OrderCard;