import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import '../MyStyle/Login.css'
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import { NavLink } from "react-router-dom";
const Login = (props) => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div class="login">
            <Form class="formStyle" style={{marginLeft:"9%"}}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            ><div class="background">

            </div>
                <h1 style={{marginTop:"20%"}}>Login</h1>
                <Form.Item id="UserForm" 
                
                    label="Username"
                    name="username"
                    style={{color:"white"}}
                    
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input id="Username"/>
                </Form.Item>

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
                    <Input type="password"id="password"/>
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox style={{color:"white"}}>Remember me</Checkbox>
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
    );
};
export default Login;