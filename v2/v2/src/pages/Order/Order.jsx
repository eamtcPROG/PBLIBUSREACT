import { Button, Space, Typography, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import OrderCard from '../../components/OrderCard';
const Order = ({ setOrderId }) => {
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
            AddressFull: `str. ${row.AddressStart.AddressName},${row.AddressStart.AddressNumber},${row.AddressStart.LocationName}`,
            AddressFullSecond: `str. ${row.AddressEnd.AddressName},${row.AddressEnd.AddressNumber},${row.AddressEnd.LocationName}`,
            Title: `${row.AddressEnd.Country.Name} - ${row.AddressStart.Country.Name}`,
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
      <Row style={{ marginTop: "1%", align: "middle" }}><Col span={24} align="center"><Title level={3} style={{ color: "white", fontSize: "40px", fontFamily: "Helvetica", align: "center" }}>New Orders</Title></Col></Row>

      <Row style={{ marginTop: "1%" }}>
        <Col span={4} />
        <Col span={16}  >

          <div class="ContainerOrder">
            <div class="ContentOrder">


              
              {
                state ?
                  state.map((item) => {
                    return <Row style={{ marginTop: "2%" }}><Col span={4} /><Col span={16}><OrderCard state={item} setOrderId={setOrderId} /></Col><Col span={4} /></Row>;
                  }) : <></>
              }

            </div>
          </div>
        </Col>
        <Col span={4} />
      </Row>
    </>
  );
};
export default Order;