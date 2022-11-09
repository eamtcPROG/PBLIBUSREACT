import { Button, Checkbox, Form, Input, Typography, Col, Row } from 'antd';
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
            <Col span={13} offset={9}>
                <div class="login">
                    <Form class="formStyle" style={{}}
                        name="basic"
                        labelCol={{span: 13}}
                        wrapperCol={{span:11}}
                        initialValues={{
                        remember: true,
                        }}
                        onFinish={handleSubmit}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        ><div class="background"></div>
                        <Row align='middle' style={{}} >
                            <Col span={7} offset={1}>
                                <Title style={{color:"black",fontSize:"20px",fontWeight:"bold",fontFamily:"Helvetica"}}>Login</Title>
                            </Col>
                        </Row>    
                        
                        <Row justify="start">
                            <Col span={22} offset={0}>
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
                                            <Input onChange={handleEmailChange} value={email}id="email"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        

                        <Row>
                            <Col span={22} offset={0}>
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

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button id="Submit"type="primary" htmlType="submit" >
                                Submit
                            </Button>
                            <div><NavLink to="/register">or Register</NavLink></div>
                    
                        </Form.Item>
                
                    </Form>
                </div>
            </Col>
        </Row>


       
    );
};
export default Login;