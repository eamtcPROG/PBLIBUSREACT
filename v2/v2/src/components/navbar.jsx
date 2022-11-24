import { Form, Menu, Tabs, Button, Col, Row,Popover } from 'antd';
import React, { useEffect, useState } from 'react';
//import 'antd/dist/antd.css';
import '../MyStyle/MyNavBarStyle.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeOutlined, TagOutlined, FormOutlined, PoweroffOutlined, UserOutlined, LogoutOutlined,LoginOutlined,MenuOutlined } from "@ant-design/icons/lib/icons"
import MediaQuery from 'react-responsive'

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
    const [active,setActive] = useState(false);
    const handleMenu = () =>{
        setActive(!active);
    }
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
                        },
                    {
                        key: "Logout",
                        label: (<Button type="link" className='logoutbtn'  style={{padding:0}} onClick={logout}
                        > Logout</Button>),
                        icon:<LogoutOutlined />
                    }])
            }
            else {
                setIsAuthenticated(false);
                setItems([]);
                setItemsSecond([{

                    key: "Login",
                    label: (<NavLink align="middle" to="/login">Sign in</NavLink>),
                    icon: <LoginOutlined />
                }])
            }

        })
            .catch(console.error);
        console.log(isAuthenticated)


    }, [isAuthenticated])
    const content = (
        <Menu mode="inline" theme="light" items={itemsSecond}/>
      );



    return (

        <>

            <MediaQuery minWidth={768}>
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
                    <Col xs={8} sm={9} md={7} lg={5} xl={4} align={"right"}>
                        {isAuthenticated ? <Button type="link" className='logoutbtn' icon={<LoginOutlined />}  onClick={logout}
                        > Logout</Button> : <NavLink align="middle" to="/login">Sign in</NavLink>}
                    </Col>
                </Row>
            </MediaQuery>


            <MediaQuery maxWidth={768}>
                <Row>
                    <Col  span={10}>
                       <Popover placement="bottomLeft" content={content} trigger="click">
                    <Button icon={<MenuOutlined />}></Button>
                    </Popover> 
                    </Col>
                    <Col  span={4}>
                        <div className="logo" />
                    </Col>
                    <Col  span={10}>

                    </Col>
                    
                </Row>
                
            </MediaQuery>
        </>


    );
}

export default MyNavBar;