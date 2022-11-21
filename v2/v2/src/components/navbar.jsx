import { Form, Menu, Tabs, Button, Col,Row } from 'antd';
import React, { useEffect, useState } from 'react';
//import 'antd/dist/antd.css';
import '../MyStyle/MyNavBarStyle.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeOutlined, TagOutlined, FormOutlined, PoweroffOutlined, UserOutlined } from "@ant-design/icons/lib/icons"
const MyNavBar = ({ setIsAuthenticated, typeUserId, isAuthenticated }) => {
    const history = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        fetch(`http://localhost:8080/api/auth/check-auth`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            switch (res.status) {
                case 403: {
                    setIsAuthenticated(false);
                    return history('/');

                }
                default:
                    setIsAuthenticated(true);

                    break;
            }
        });
    }

    const [items, setItems] = useState([])
    const [itemsSecond, setItemsSecond] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/api/auth/check-auth`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: token,
            },
        }).then((res) => {
            if (res.status == 200) {
                setIsAuthenticated(true);
                setItems([
                    typeUserId == 1 ? {
    
                        key: "offerpage",
                        label: (<NavLink to="/offerpage">My Offer</NavLink>),
                        icon: <FormOutlined />
                    } : {
    
    
                        key: "orderpage",
                        label: (<NavLink to="/orderpage">My Order</NavLink>),
                        icon: <TagOutlined />
                    },
    
                    typeUserId == 1 ? {
                        key: "Order",
                        label: (<NavLink to="/order">Order</NavLink>),
                        icon: <TagOutlined />
                    }
                        : null,
                    typeUserId == 1 ? {
                        key: "PersonalCabinetT",
                        label: (<NavLink to="/transporter">My Profile</NavLink>),
                        icon: <UserOutlined />
                    }
                        : {
                            key: "PersonalCabinetC",
                            label: (<NavLink to="/customer">My Profile</NavLink>),
                            icon: <UserOutlined />
                        }
                ])
                
                setItemsSecond([
                    {
                        key: "Logout",
                        label: (<Button type="text" className='logoutbtn' icon={<PoweroffOutlined />} block={true} onClick={logout}
                        > Logout</Button>),
                    }])
            }
            else {
                setIsAuthenticated(false);
                setItems([]);
                setItemsSecond([{

                    key: "Login",
                    label: (<NavLink align="middle" to="/login">Sign in</NavLink>),
                    icon: <FormOutlined />
                }])
            }

        })
            .catch(console.error);
        console.log(isAuthenticated)
        

    }, [isAuthenticated])




    return (

        <Row wrap={false}>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                <div className="logo" />
            </Col>
            <Col xs={14} sm={13} md={15} lg={17} xl={18}>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={"OfferPage"}
                    items={items}
                />
            </Col>
            <Col  xs={8} sm={9} md={7} lg={5} xl={4}>
                <Menu
                    style={{marginLeft:"20%"}}
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={"OfferPage"}
                    items={itemsSecond}
                />
            </Col>
        </Row>


    );
}

export default MyNavBar;