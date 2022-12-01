import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../MyStyle/Register.css'
import {
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    Row,
    Col,
    Card,
} from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";


const min = moment.now()


const { Option } = Select;


const Register = ({ setIsAuthenticated, setTypeUserId }) => {
    const history = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirhdate] = useState(null);
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
                birthdate,
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
                return;

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
                setTypeUserId(data.TypeUserId);
                if (data.TypeUserId == 1) {
                    return history('/order');
                }
                else {
                    return history('/orderpage');
                }

            });;
        });

    };
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    return (

        <Row style={{ marginTop: "5%",marginBottom:"5%" }}>
            <Col xs={2} sm={2} md={8} />
            <Col xs={20} sm={20} md={8}>
                <Card
                    title="Register"
                    className="register"
                >
                    <Form
                        
                        wrapperCol={{span:24 }}
                        form={form}
                        layout="vertical"
                        name="register"
                        onFinish={handleSubmit}
                        labelAlign="left"
                        labelWrap
                        scrollToFirstError
                        class="formStyle"
                    >

                        <Form.Item label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Surname"
                                }
                            ]}
                        >
                            <Input onChange={handleNameChange} value={name} style={{
                                width: "100%",
                            }} />
                        </Form.Item>

                        <Form.Item
                            name="surname"
                            label="Surname"
                            rules={[

                                {
                                    required: true,
                                    message: "Please input your Surname"
                                }
                            ]}
                        >
                            <Input onChange={handleSurnameChange} value={surname} style={{
                                width: "100%",
                            }} />
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
                            <Input onChange={handleEmailChange} value={email} style={{
                                width: "100%",
                            }} />
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
                            <Input.Password value={password} style={{
                                width: "100%",
                            }} />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={["password"]}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "Confirm your password!"
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("Wrong password")
                                        );
                                    }
                                })
                            ]}
                        >
                            <Input.Password onChange={handlePasswordChange} value={password} style={{
                                width: "100%",
                            }} />
                        </Form.Item>

                        <Form.Item label="Birthdate"
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

                            <DatePicker onChange={handleBirthdateChange} value={birthdate} disabledDate={(current) => current.isAfter(moment().subtract(18, "year"))} style={{
                                width: "100%",
                                textAlign:"center"
                            }} />
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
                            < Select onSelect={handleUserType} value={typeUserId} placeholder="select your user type" style={{
                                width: "100%",
                            }}>
                                <Option value="1">Transporter</Option>
                                <Option value="2">Customer</Option>
                            </Select>

                        </Form.Item>
                        <Row align="middle">
                            <Col xs={2} sm={2} md={6}/>
                            <Col xs={20} sm={20} md={12}>
                                <Button style={{padding: "1px 6px",color:"black"}} type="link" htmlType="submit" >
                                    Register
                                </Button>
                                <NavLink to="/login">or Login</NavLink>
                            </Col>
                            <Col xs={2} sm={2} md={6}/>
                        </Row>
                    </Form>


                </Card>
            </Col>
            <Col xs={2} sm={2} md={8} />
        </Row>
    );
};
export default Register;