import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const OrderCard = ({ state,setOrderId }) => {
    const history = useNavigate();
    const handleMakeOffer = ()=>{
        if(state != undefined) setOrderId(state.IdOrder);
        history("/AddOffer");
    }
    
    return state != undefined ? (
        <>

            <Card
                style={{
                    width: "90em",
                    marginTop: 16,
                }}
                actions={[
                    <Button onClick={handleMakeOffer}>Make an offer</Button>
                ]}
            >
                <Card.Grid hoverable={false} style={{
                    width: '20%',
                    textAlign: 'center',

                }}>
                    {state != undefined ? state.StartPointAddressId : ""}
                </Card.Grid>
                <Card.Grid hoverable={false} style={{
                    width: '20%',
                    textAlign: 'center',
                }}>
                    {state != undefined ? state.EndPointAddressId : ""}
                </Card.Grid>
                <Card.Grid hoverable={false} style={{
                    width: '20%',
                    textAlign: 'center',
                }}>
                    {state != undefined ? state.Date: ""}
                </Card.Grid>
                <Card.Grid hoverable={false} style={{
                    width: '5%',
                    textAlign: 'center',
                }}>
                    {state != undefined ? state.NumberPersons : ""}
                </Card.Grid>
                <Card.Grid hoverable={false} style={{
                    width: '35%',
                    textAlign: 'center',
                }}>
                    {state != undefined ? state.MoreDetails : ""}
                </Card.Grid>
            </Card>
        </>
    ):(<></>);
};

export default OrderCard;