import { Form, Menu, Tabs, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
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
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token == null) {
            setIsAuthenticated(false);
        }
        fetch(`http://localhost:8080/api/auth/check-auth`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: token,
            },
        }).then((res) => {
            if (res.status == 200) {
                setIsAuthenticated(true);
            }
            else {
                setIsAuthenticated(false);
            }

        })
            .catch(console.error);
        console.log(isAuthenticated)
        if (isAuthenticated == true) {
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
                    },
                {
                    key: "Logout",
                    label: (<Button type="text" className='logoutbtn' icon={<PoweroffOutlined />} block={true} onClick={logout}
                    > Logout</Button>),
                }
            ])
        } else {
            setItems([{

                key: "OfferPage",
                label: (<NavLink align="middle" to="/login">Sign in</NavLink>),
                icon: <FormOutlined />
            }])
        }
    }, [isAuthenticated])

    return (
        <>
            <div className="logo" />
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={"OfferPage"}
                items={items}
            >

            </Menu>

        </>
    );
}

export default MyNavBar;