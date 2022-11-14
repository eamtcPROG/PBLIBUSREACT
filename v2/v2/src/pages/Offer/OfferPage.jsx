import { Button, Space, Table,Card,Collapse, Typography, Descriptions, Row,Col } from 'antd';
import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from "axios";
const { Panel } = Collapse;
const OfferPage = () => {
  const history = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [state, setState] = useState([]);
  const [loading, setloading] = useState(true);
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await Axios.get(
      "http://localhost:8080/api/offer/getall"
    ).then(
      res => {

        setState(
          res.data.map(row => ({
            Price: row.Price,
            OrderId: row.OrderId,
            TrasporterId: row.TrasporterId,
          }))
        );
        setloading(false);
      }
    );


  };



  const handleAddOrder = () => {
    history('/addoffer');
  };
  const columns = [
    {
      title: "Price",
      dataIndex: "Price",
      width: 150
    },
    {
      title: "Order Id",
      dataIndex: "OrderId",
      width: 150
    },
    {
      title: "Transporter Id",
      dataIndex: "TrasporterId",
      width: 150
    }
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
       

      </Space>
      {/* <Table columns={columns} dataSource={state} onChange={handleChange} /> */}
      <Card title="Start Location - Destination"
      bordered={false}
      actions={[
        <Fragment>
        <Button>Edit</Button>
        <Button>Delete</Button>
        </Fragment>
      ]}
      >
      <Row>
    
    <Descriptions title="Order Info">
    <Descriptions.Item label="Location">Chisinau</Descriptions.Item>
    <Descriptions.Item label="Destination">Iasi</Descriptions.Item>
    <Descriptions.Item label="Number of people">10</Descriptions.Item>
    <Descriptions.Item label="Date">10/22/2022</Descriptions.Item>
    <Descriptions.Item label="Price">100 lei</Descriptions.Item>
    
  </Descriptions>
  
  <Col span={16} offset={16}>
  <Collapse defaultActiveKey={['1']}  ghost>
    <Panel header="This is panel header 1" key="1">
    <Col span={15} offset={0} pull={24}><Descriptions title="Transport Info">
    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
    <Descriptions.Item label="Remark">empty</Descriptions.Item>
    <Descriptions.Item label="Address">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
  </Descriptions>
  </Col>
  </Panel>
  </Collapse>
  </Col>
  </Row>

    











      </Card>
    </>
  );
};
export default OfferPage;