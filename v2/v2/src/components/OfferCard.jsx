import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const OfferCard = ({ state,setOfferId }) => {
    const history = useNavigate();
    const handleMakeOffer = ()=>{
        //if(state != undefined) setOfferId(state.IdOffer);
        
    }
    
    return state != undefined ? (
        <>

            <Card
                style={{
                    width: "45em",
                    marginTop: 16,
                }}
                actions={[
                    <Button onClick={handleMakeOffer}>Accept offer</Button>
                ]}
            >
                <Card.Grid hoverable={false} style={{
                    width: '33%',
                    textAlign: 'center',

                }}>
                    {state != undefined ? state.Price : ""}
                </Card.Grid>
                <Card.Grid hoverable={false} style={{
                    width: '33%',
                    textAlign: 'center',
                }}>
                    {state != undefined ? state.OrderId : ""}
                </Card.Grid>
                <Card.Grid hoverable={false} style={{
                    width: '34%',
                    textAlign: 'center',
                }}>
                    {state != undefined ? state.TrasporterId : ""}
                </Card.Grid> 
            </Card>
        </>
    ):(<></>);
};

export default OfferCard;