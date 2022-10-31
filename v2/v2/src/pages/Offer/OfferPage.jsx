import { Button, Space, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
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
    history('/AddOffer');
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
        <Button onClick={handleAddOrder}>Add offer</Button>

      </Space>
      <Table columns={columns} dataSource={state} onChange={handleChange} />
    </>
  );
};
export default OfferPage;