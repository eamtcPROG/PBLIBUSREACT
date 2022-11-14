import { Button, Space, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
const OrderPage = () => {
  const history = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [state, setState] = useState([]);
  const [stateIds, setStateIds] = useState([]);
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
  }, [loading]);
  const getData = async () => {
    await Axios.get(
      "http://localhost:8080/api/order/getallwithaddress"
    ).then(
      
      res => {
        console.log(res)
        setState(
          res.data.map(row => ({
            
            NumberPersons: row.NumberPersons,
            StartPointAddressId: row.StartPointAddressId,
            EndPointAddressId: row.EndPointAddressId,
            AddressFull:row.AddressStart.LocationName,
            Date: row.Date,
            MoreDetails: row.MoreDetails,
            IdOrder: row.IdOrder
          })
          
          )
          
        );
        
        console.log(state);
        
        setloading(false);
      }
    );
  };



  const handleAddOrder = () => {
    history('/addorder');
  };
  const columns = [
    {
      title: "Number of Persons",
      dataIndex: "NumberPersons",
      width: 150
    },
    {
      title: "Start Point Address",
      dataIndex: "StartPointAddressId",
      width: 150
    },
    {
      title: "End Point Address",
      dataIndex: "EndPointAddressId",
      width: 150
    },
    {
      title: "Date",
      dataIndex: "Date",
      width: 150
    },
    {
      title: "More Details",
      dataIndex: "MoreDetails",
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
        <Button onClick={handleAddOrder}>Add order</Button>

      </Space>
      <Table columns={columns} dataSource={state} onChange={handleChange} />
    </>
  );
};
export default OrderPage;