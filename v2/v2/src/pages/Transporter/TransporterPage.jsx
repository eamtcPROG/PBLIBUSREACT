import { Button, Space, Typography, Row, Col, Card, Collapse,Descriptions } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import OrderCard from '../../components/OrderCard';
import MyProfile from '../../components/MyProfile';
const TransporterPage = ({ }) => {
  const history = useNavigate();
  const { Panel } = Collapse;
  const [state, setState] = useState([]);

  const [stateTransport, setStateTransport] = useState([]);

  const [loading, setloading] = useState(true);

  const { Title, Text } = Typography;
  useEffect(() => {
    getData();
    console.log(stateTransport);
  }, [loading]);

  const getDataTransport = async (userId) => {

    fetch(`http://localhost:8080/api/transporter/gettransport/${userId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',

      },
    }).then((res) => {
      return res.json();

    }).then((data) => {

      if (data) {
        setStateTransport(data);
        setloading(false);
      }
    })
      .catch(console.error);

  };

  const getData = async () => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/api/auth/getuser`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
      },
    }).then((res) => {
      return res.json();

    }).then((data) => {

      if (data) {
        setState(data);
        getDataTransport(data.IdUser);

      }
    })
      .catch(console.error);

  };


  return (
    <>
      <MyProfile />


    </>
  );
};
export default TransporterPage;