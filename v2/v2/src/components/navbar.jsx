import { Form, Menu,Tabs } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import '../MyStyle/MyNavBarStyle.css'
import { NavLink } from 'react-router-dom';

const MyNavBar = () => {
const  items=[{
    
    key:"/OfferPage",
    label:"Offer",
    path: './Offer/AddOffer.jsx',
    
},
{
    key:"/OrderPage",
    label: "Order",
},

]   
    return (
        <>
            <div className="logo" />
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={"/OfferPage"}
                items={items}
            >
               
            </Menu>

        </>
    );
}

export default MyNavBar;