
import { Card, Space, Typography,Row,Col, Skeleton } from 'antd';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'
import './../MyStyle/MyProfilePage.css'
import { UserOutlined } from '@ant-design/icons';

const MyProfile = () => {
    const [state, setState] = useState([]);
    const [userid, setUserId] = useState(0);
    const [birthdate, setBirhdate] = useState();
    const [loading, setloading] = useState(true);
    
    const { Title, Text } = Typography;
    useEffect(() => {
      getData();
      console.log(state);
    }, [loading,userid]);
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
          setUserId(data.IdUser);
          setBirhdate(data.Birthdate);
          console.log(data);
          setloading(false);
        }
      })
        .catch(console.error);
      
    };
    return(

      <Col><div className="myprofilecard">
        <Card 
            bordered={false}
            style={{ 
            backgroundColor:"transparent",
             
            }}
            
        >
            <Row><Col align="center" span={24}><Title style={{align:'center', color:"black",fontSize:"21px",fontFamily:"Helvetica"}} level={5} > My Profile</Title></Col></Row>
              <Space><UserOutlined className='User' width='10em' height='10em' style={{fontSize: '17vh'}}/></Space>
                <Row style={{marginTop:"2vh"}}>
                    <Col offset={1} span={6} align="left" >
                        <Text style={{fontSize:"18px"}}>Name:</Text>
                    </Col>
                    <Col push={1} style={{fontSize:"18px", fontWeight:"bold"}}>{state.Name}</Col>
                </Row>
                <Row>
                <Col offset={1} span={6} align="left" >
                <Text style={{fontSize:"18px"}}>Surname:</Text>
                    </Col>
                    <Col push={1} style={{fontSize:"18px", fontWeight:"bold"}}>{state.Surname}</Col>
                </Row>

                <Row>
                <Col offset={1} span={6} align="left" >
                <Text style={{fontSize:"18px"}}>Email:</Text>
                    </Col>
                    <Col push={1} style={{fontSize:"18px", fontWeight:"bold"}}>{state.Email}</Col>
                </Row>
                <Row>
                <Col offset={1} span={6} align="left" >
                <Text style={{fontSize:"18px"}} >Birthdate:</Text>
                    </Col>
                    {birthdate!= undefined?<Col push={1} style={{fontSize:"18px", fontWeight:"bold"}}>{ format(new Date(birthdate), 'dd-MM-yyyy')}</Col>:<Skeleton/>}
                </Row>



          

               
        </Card>
    </div></Col>
    )
        }
export default MyProfile;