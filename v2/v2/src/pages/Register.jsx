import React, { useState } from "react";
import "antd/dist/antd.css";
import '../MyStyle/Register.css'
import {
    Button,
    Form,
    Input,
    Select
} from "antd";

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 10
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16
        }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
};
const Register = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 80
                }}
            >
                <Option value="373">+373</Option>
                <Option value="40">+40</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div  class="register" >
            <Form style={{marginRight:"10%"}}
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{

                    prefix: "373"
                }}
                scrollToFirstError
                class="formStyle"
            >
                <h1>Register</h1>
                <Form.Item label="Nume">
                   <Input />
               </Form.Item>
               <Form.Item label="Prenume">
                    <Input />
               </Form.Item>
                <Form.Item
                
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!"
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!"
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("The two passwords that you entered do not match!")
                                );
                            }
                        })
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!"
                        }
                    ]}
                >
                    <Input 
                        addonBefore={prefixSelector}
                        style={{
                            width: "100%"
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="userType"
                    label="User Type"
                    rules={[
                        {
                            required: true,
                            message: "Please select user type!"
                        }
                    ]}
                >
                    <Select placeholder="select your user type">
                        <Option value="trasporter">Trasporter</Option>
                        <Option value="custemer">Custemer</Option>
                    </Select>
                </Form.Item>

                <Form.Item {...tailFormItemLayout} style={{marginRight:"10%"}}>
                    <Button type="primary" htmlType="submit" >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Register;
