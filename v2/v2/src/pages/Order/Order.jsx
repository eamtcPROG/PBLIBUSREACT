import { Button, Space, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import OrderCard from '../../components/OrderCard';
const Order = ({setOrderId}) => {
  const history = useNavigate();
  
  const [state, setState] = useState([]);
  
  const [loading, setloading] = useState(true);
  
  const { Title, Text } = Typography;
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await Axios.get(
      "http://localhost:8080/api/order/getall"
    ).then(
      res => {

        setState(
          res.data.map(row => ({
            NumberPersons: row.NumberPersons,
            StartPointAddressId: row.StartPointAddressId,
            EndPointAddressId: row.EndPointAddressId,
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

  
  return (
    <>
       
      <Title // Form's Title
        level={3}
        style={{
          marginBottom: 0,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        Orders
      </Title>
      <OrderCard/>
      {
          state ?
            state.map((item) => {
              return <OrderCard state={item} setOrderId={setOrderId}/>;
            }) : <></>
        }
    </>
  );
};
export default Order;