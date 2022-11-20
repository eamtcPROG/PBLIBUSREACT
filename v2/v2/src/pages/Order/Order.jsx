import { Button, Space, Typography,Row,Col } from 'antd';
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
  }, [loading]);
  const getData = async () => {
    await Axios.get(
      "http://localhost:8080/api/order/getallwithaddress"
    ).then(
      res => {
        console.log(res.data)
        setState(
          res.data.map(row => ({
            NumberPersons: row.NumberPersons,
            StartPointAddressId: row.StartPointAddressId,
            AddressFull:`str. ${row.AddressStart.AddressName},${row.AddressStart.AddressNumber},${row.AddressStart.LocationName}`,
            AddressFullSecond:`str. ${row.AddressEnd.AddressName},${row.AddressEnd.AddressNumber},${row.AddressEnd.LocationName}`,
            Title:`${row.AddressEnd.Country.Name} - ${row.AddressStart.Country.Name}`,
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
    <Row style={{marginTop:"2vh", align:"middle"}}><Col span={24} align="center"><Title level={3} style={{  color:"white",fontSize:"40px",fontFamily:"Helvetica", align:"middle"}}>New Orders</Title></Col></Row>

  <Row style={{marginTop:"1vh"}}><Col span={6 }offset={7}><div class="ContainerOrder">
    <div class="ContentOrder">
       
      
      <OrderCard/>
      {
          state ?
            state.map((item) => {
              return <Row style={{marginTop:"4vh"}}><Col offset={3} span={20}><OrderCard state={item} setOrderId={setOrderId}/></Col></Row>;
            }) : <></>
        }

     </div></div></Col></Row>   
    </>
  );
};
export default Order;