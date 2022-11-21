import React, { useEffect, useState, Fragment } from "react";
import { Button, Card, Row, Col, Collapse, Descriptions, Skeleton } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import MyNotifications from "../notifications/MyNotifications";
const { Panel } = Collapse;
const MyOfferCard = ({ orderId }) => {
    const history = useNavigate();
    const [state, setState] = useState([]);
    const [loading, setloading] = useState(true);
    const [dataloading, setdataloading] = useState(false);
    const mynotification = new MyNotifications();
    useEffect(() => {
        getData();
        setloading(false);
    }, [loading, dataloading]);
    const getData = async () => {
        await Axios.get(
            `http://localhost:8080/api/offer/getfororder/${orderId}`
        ).then(

            res => {
                setState(res.data);

                setdataloading(true);
                console.log(state);
            }
        );
    };


    return state != undefined ? (

        state.map(row => {
            return row != undefined ? (
                <Card
                    style={{ marginBottom: "1%" }}
                    actions={[
                        <Fragment>
                            {row.Status.Name == 'Pending' && row.Status.Name != 'Decline' && row.Status.Name != 'Accepted' ? <Button onClick={() => {
                                fetch(`http://localhost:8080/api/offer/updateaccepted/${row.IdOffer}`, {
                                    method: 'PUT',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                }).then((res) => {
                                    console.log(res);
                                    if (res.status === 200) {
                                        fetch(`http://localhost:8080/api/offer/updatepending/${row.OrderId}`, {
                                            method: 'PUT',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                            },
                                        }).then((res) => {
                                            console.log(res);
                                            if (res.status === 200) {
                                                mynotification.succesNotification("Offer", "accepted");
                                                setloading(true);

                                            }

                                        });

                                    }

                                });
                            }}>Accept</Button> : null}
                            {(row.Status.Name == 'Pending' && row.Status.Name != 'Decline' && row.Status.Name != 'Accepted') ? (<Button onClick={() => {
                                fetch(`http://localhost:8080/api/offer/updatedicline/${row.IdOffer}`, {
                                    method: 'PUT',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                }).then((res) => {
                                    console.log(res);
                                    if (res.status === 200) {
                                        return res.json();

                                    }

                                }).then((data) => {
                                    console.log(data);
                                    if (data != null) {
                                        mynotification.succesNotification("Offer", "decline");
                                        setloading(true);
                                    }
                                });
                            }}>Decline</Button>) : null

                            }
                            {(row.Status.Name == 'Accepted') ? ((
                                <Button onClick={() => {
                                    fetch(`http://localhost:8080/api/offer/updatecancel/${row.OrderId}`, {
                                        method: 'PUT',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                    }).then((res) => {
                                        console.log(res)
                                        if(res.status==200){
                                            setloading(true);
                                            setdataloading(false);
                                        }

                                    });
                                }}>Cancel</Button>
                            )) : null

                            }
                        </Fragment>
                    ]}
                >
                    <Descriptions title={`Offer - Status ${row.Status.Name}`}>
                        <Descriptions.Item label="Price">{row.Price}</Descriptions.Item>
                        <Descriptions.Item label="Number seats">{row.Transporter.Transport.NumberSeats}</Descriptions.Item>
                        <Descriptions.Item label="Plate">{row.Transporter.Transport.Plate}</Descriptions.Item>
                        <Descriptions.Item label="Transport Type">{row.Transporter.Transport.TypeTrasport.Name}</Descriptions.Item>
                        <Descriptions.Item label="Model">{`${row.Transporter.Transport.Model.Name}, ${row.Transporter.Transport.Model.Brand.Name}`}</Descriptions.Item>
                        <Descriptions.Item label="Transporter">{`${row.Transporter.User.Name} ${row.Transporter.User.Surname}`}</Descriptions.Item>

                    </Descriptions>
                </Card>
            ) : (<Skeleton />)
        })


    ) : (<Skeleton />);
};

export default MyOfferCard;