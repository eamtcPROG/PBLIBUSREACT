import { Menu } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import '../MyStyle/MyNavBarStyle.css'

const MyNavBar = () => {
const  items=[{
    key:"1",
    label: "Offer",
},
{
    key:"2",
    label: "Order",
},
]   
    return (
        <>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items}
            />
        </>
    );
}

export default MyNavBar;