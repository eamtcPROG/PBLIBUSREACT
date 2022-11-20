import { Button, Space, Typography, Row, Col, Card, Collapse,Descriptions } from 'antd';
import React, { useState, useEffect } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import Axios from "axios";
import OrderCard from '../../components/OrderCard';
import MyProfile from '../../components/MyProfile';
import '../.././MyStyle/MyProfilePage.css'
import {CarOutlined,PlusOutlined} from '@ant-design/icons';
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
      
      <Row >
        <Col align="center" alspan={4} offset={7}><MyProfile /></Col>
        <Col offset={1} span={4} style={{marginTop:"20vh"}}>
          <Card  className='TransportCard' bordered={false} style={{}}>
            <Row>
              <Col align="center" span={24}><Title style={{align:'center', color:"black",fontSize:"21px",fontFamily:"Helvetica"}} level={5} > Transport Info</Title></Col>
            </Row>


            <Row >
              <Col span={22} offset={1} style={{marginTop:"1vh", marginBottom:"0vh" }}><div class="Container">
                  <div class="Content1">
                      <Collapse style={{Size: '3vh'}} ghost> 
                        {stateTransport.map((item, i) => {
                          return (
                            <Panel style={{align:"center", color:"black",fontSize:"18px",fontFamily:"Helvetica"}} header={`${item.Transport.Model.Brand.Name}, ${item.Transport.Model.Name}`} key={i}>

                                  
                                  <Title style={{align:"center", color:"black",fontSize:"16px",fontFamily:"Helvetica"}} level={1} > Transport Info</Title>
                                    <Row><Col span={24}>Vehicle Type : {item.Transport.TypeTrasport.Name}</Col></Row>
                                    <Row><Col span={24}>Number plates : {item.Transport.Plate}</Col></Row>
                                    <Row><Col span={24}>Nr. of steats :{item.Transport.NumberSeats}</Col></Row>
                            </Panel>
                          )
                        })}
                      </Collapse>
                  </div></div>
              </Col>    


            </Row>

          </Card>
          
        <NavLink to="/addtransporter" ><Button className='AddCrasButton' style={{marginTop:"2.1vh"}} type="primary"><PlusOutlined className='plus' style={{fontSize: '2.8vh', opacity:'90%'}} /><Text style={{color:"white",fontSize:"2.8vh"}}>Add Vehicle</Text></Button></NavLink>
         
        </Col>
      </Row>
    </>
  );
};
export default TransporterPage;