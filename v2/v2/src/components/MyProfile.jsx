
import { Card, Space, Typography,Row,Col } from 'antd';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'
const MyProfile = () => {
    const [state, setState] = useState([]);
  
    const [loading, setloading] = useState(true);
    
    const { Title, Text } = Typography;
    useEffect(() => {
      getData();
      console.log(state);
    }, [loading]);
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
          setloading(false);
        }
      })
        .catch(console.error);
      
    };
    return(
    <div className="site-card-border-less-wrapper">
        <Card
            title="Profile Info"
            bordered={false}
            style={{
                width: 600,
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
                        Email
                    </Col>
                    <Col push={1}>{state.Email}</Col>
                </Row>
                <Row>
                    <Col span={4}>
                        Birthdate
                    </Col>
                    <Col push={1}>{ format(new Date(state.Birthdate), 'dd-MM-yyyy')}</Col>
                </Row>



          


        </Card>
    </div>
    )
        }
export default MyProfile;