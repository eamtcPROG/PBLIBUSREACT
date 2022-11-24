import { Button, Checkbox, Form, Input, Typography, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React,{useState} from 'react';
import '../MyStyle/Login.css'
import { NavLink,useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const Login = ({setIsAuthenticated,setTypeUserId}) => {
    const history = useNavigate ();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
    // Controlled form
    const handleSubmit = (e) => {
      //e.preventDefault();
  
      fetch(`http://localhost:8080/api/auth/signin`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        
        }else{
          setError('Invalid credentials');
          setIsAuthenticated(false);
        }
  
        
      }).then((data) => {
        try {
          if(error != null ){  
            localStorage.setItem("token", data.accessToken);
            setIsAuthenticated(true);
            setTypeUserId(data.TypeUserId);
            console.log(data.TypeUserId);
            if(data.TypeUserId == 1){
                return history('/order');
            }
            else{
                return history('/orderpage');
            }
           }
        } catch(error){console.log(error)} 
        
        
        
        });
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
            
       
        <Row justify="start" style={{marginTop:"11%", marginBottom:"14.5%"}}>
            <Col align="center" span={20} offset={2}>
                <div class="login">
                    <Form class="formStyle" style={{}}
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span:14}}
                        initialValues={{
                        remember: true,
                        }}
                        onFinish={handleSubmit}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        ><div class="background"></div>
                        <Row align='middle' >
                            <Col align="center" span={10} offset={6}  push={1} >
                                <Title style={{marginTop:"17%", align:'middle', color:"black",fontSize:"30px",fontFamily:"Helvetica"}} level={4} > Login</Title>
                            </Col>
                        </Row>    
                        
                        <Row justify="start">
                            <Col align="center" span={24} offset={0} pull={2} >
                                <Form.Item id="UserForm" 
                
                                            label="Email"
                                             name="email"
                                            style={{color:"white"}}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your email!',
                                                },
                                            ]}
                                    >
                                            <Input onChange={handleEmailChange} value={email}id="email" />
                                </Form.Item>
                            </Col>
                        </Row>
                        

                        <Row>
                            <Col align="center" span={24} pull={2}>
                             <Form.Item
                                 label="Password"
                                 name="password"
                                   rules={[
                                     {
                                       required: true,
                                       message: 'Please input your password!',
                                     },
                                      ]}
                                    >
                                    <Input  onChange={handlePasswordChange} value={password} type="password"id="password"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col align="center" span={15} offset={2}>
                            <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox style={{color:"black"}}>Remember me</Checkbox>
                        </Form.Item>
                            </Col>
                        </Row>
                        
                         <Row>
                             <Col align="center" span={5} offset={8} >
                                <Form.Item>
                                    <Button id="Submit"type="primary" htmlType="submit" >Submit</Button>
                                </Form.Item>
                            </Col>
                       
                             <Col align="center" span={10} offset={0} pull={1}>
                                <Form.Item>
                                <div><NavLink style={{marginTopMarginBottom:"22%"}} to="/register">or Register</NavLink></div>
                                </Form.Item>
                            </Col>
                        </Row>   
                            
                
                    </Form>
                </div>
            </Col>
        </Row>


       
    );
};
export default Login;