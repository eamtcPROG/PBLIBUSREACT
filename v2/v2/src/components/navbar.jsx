import { Form, Menu, Tabs, Button } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import '../MyStyle/MyNavBarStyle.css'
import { NavLink ,useNavigate} from 'react-router-dom';
import { HomeOutlined, TagOutlined, FormOutlined, PoweroffOutlined } from "@ant-design/icons/lib/icons"
const MyNavBar = ({ setIsAuthenticated }) => {
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
                case 403:{
                    setIsAuthenticated(false);
                    return history('/home');
                    break;
                }
                default:
                    setIsAuthenticated(true);
                    break;
            }
        });
    }
    const items = [{

        key: "OfferPage",
        label: (<NavLink to="/OfferPage">Offer</NavLink>),
        icon: <FormOutlined />
    },
    {
        key: "OrderPage",
        label: (<NavLink className="space_to_logout" to="/OrderPage">Order</NavLink>),
        //icon: <TagOutlined />
    },
    {
        key: "Logout",
        label: (<Button type="text" className='button_logout' icon={<PoweroffOutlined />} block={true} onClick={logout} >Logout</Button>),
        
    }
    ]
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