import React, { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import "antd/dist/antd.css";
import '../MyStyle/Register.css'
import {
    Button,
    Form,
    Input,
    Select,
    DatePicker
} from "antd";
import { NavLink } from "react-router-dom";




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
const Register = ({ setIsAuthenticated }) => {
    const history = useNavigate ();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birhdate, setBirhdate] = useState(null);
    const [typeUserId, setUserType] = useState(0);

    const handleNameChange = (e) => {
        setName(e.target.value);
        console.log(e.target.value);
    };
    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePhoneChange = (e) => {
        setPhone(prefixSelector+e.target.value);
    };
    const handleBirthdateChange = (e, value) => {
        setBirhdate(value);
      };
    const handleUserType = (e) => {
        setUserType(e);
    };

    const handleSubmit = (e) => {
        //e.preventDefault();
    
        fetch(`http://localhost:8080/api/auth/signup`, {
          method: 'POST',
          
          body: JSON.stringify({
            name,
            password,
            surname,
            email,
            birhdate,
            typeUserId
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((res) => {
            console.log(surname);
            if (res.status === 200) {
           console.log(name);
            return res.json();
          
          }
          if (res.status === 400) {
            alert("This email is already in use. Please use another email!");
            return   ;
           
           }
        }).then((res) => {
          fetch(`http://localhost:8080/api/auth/signin`, {
          method: 'POST',
         
          body: JSON.stringify({
            email,
            password
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 200) {
         
            return res.json();
          
          }
         
        }).then((data) => {
            localStorage.setItem("token", data.accessToken);
            setIsAuthenticated(true);
            return history('/OrderPage');
          });;
      });
        
      };
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
        <div class="register" style={{ marginLeft: "40%" }} >
            <Form style={{ marginRight: "10%" }}
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={handleSubmit}
                initialValues={{

                    prefix: "373"
                }}
                scrollToFirstError
                class="formStyle"
            >
                <h1 style={{ marginTop: "50px", marginBottom: "40px" }}>Register</h1>
                <Form.Item label="Nume">
                    <Input onChange={handleNameChange} value={name}/>
                </Form.Item>
                <Form.Item label="Prenume">
                    <Input onChange={handleSurnameChange} value={surname}/>
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
                    <Input onChange={handleEmailChange} value={email}/>
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
                    <Input.Password value={password}/>
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
                    <Input.Password onChange={handlePasswordChange} value={password}/>
                </Form.Item>

                <Form.Item label="Date"
          name="date"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please enter the date!",
              type: "date",
            },
          ]}
        >

          <DatePicker onChange={handleBirthdateChange} value={birhdate} />
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
                    < Select onSelect={handleUserType} value={typeUserId} placeholder="select your user type">
                        <Option value="1">Trasporter</Option>
                        <Option value="2">Custemer</Option>
                    </Select>
                </Form.Item>

                <Form.Item {...tailFormItemLayout} style={{ marginRight: "23%" }}>
                    <Button style={{ marginLeft: "35%" }} type="submit" htmlType="submit" >
                        Register
                    </Button>
                    <div><NavLink style={{ marginLeft: "35%" }} to="/login">or Login</NavLink></div>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Register;