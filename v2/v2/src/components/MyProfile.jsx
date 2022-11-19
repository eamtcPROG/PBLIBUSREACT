
import { Card, Space, Typography,Row,Col, Skeleton } from 'antd';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'
import './../MyStyle/MyProfilePage.css'

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

      <Row justify="center" style={{marginTop:"11%"}}><Col align span={3} offset={2} push={10}><div className="myprofilecard">
        <Card span={2} offset={4} 
          title="Profile Info" 
            bordered={false}
            style={{ level:"2",
              width: "32vh",
              marginTop:"0", 
             marginLeft:"5%",
            }}
            
        >

            
                <Row>
                    <Col span={4}>
                        <Text>Name</Text>
                    </Col>
                    <Col push={1}>{state.Name}</Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <Text>Surname</Text>
                    </Col>
                    <Col push={1}>{state.Surname}</Col>
                </Row>

                <Row>
                    <Col span={4}>
                        <Text>Email</Text>
                    </Col>
                    <Col push={1}>{state.Email}</Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <Text>Birthdate</Text>
                    </Col>
                    {birthdate!= undefined?<Col push={1}>{ format(new Date(birthdate), 'dd-MM-yyyy')}</Col>:<Skeleton/>}
                </Row>



          

               
        </Card>
    </div></Col></Row>
    )
        }
export default MyProfile;