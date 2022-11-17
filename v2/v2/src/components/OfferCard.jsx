import React, { useEffect, useState } from "react";
import { Button, Card,Row,Col } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
const OfferCard = ({ state, setOfferId }) => {
    const history = useNavigate();
    const handleMakeOffer = () => {
        //if(state != undefined) setOfferId(state.IdOffer);
        console.log(state.IdOffer);
        Axios.delete(`http://localhost:8080/api/offer/delete/${state.IdOffer}`).then(res => {
            console.log(res);
            if (res.status == 200) {
                window.location.reload();
            }
        });
    }

    return state != undefined ? (
        <>

            <Row>
                <Col offset={1}>
                            <Card
                            style={{
                                width: "15em",
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
                </Col>
            </Row>
        </>
    ) : (<></>);
};

export default OfferCard;