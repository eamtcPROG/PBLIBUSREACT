import React, { useEffect, useState, Fragment } from "react";
import { Button, Card, Row, Col, Collapse, Descriptions, Skeleton, Empty, Popover, Rate } from "antd";
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import MyNotifications from "../notifications/MyNotifications";
import "../MyStyle/Buttons.css"
import "../MyStyle/Cards.css"
const { Panel } = Collapse;
const MyOfferCard = ({ orderId }) => {
    const history = useNavigate();
    const [state, setState] = useState([]);
    const [loading, setloading] = useState(true);
    const [dataloading, setdataloading] = useState(false);
    const [rate, setRate] = useState();
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
    const handleChangeRate = (e, myId,orderId) => {
        setRate(e);
        console.log(e)
        console.log(myId)
        fetch(`http://localhost:8080/api/transporter/updaterating/${myId}`, {
            method: 'PUT',
            body: JSON.stringify({
                rating: e,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                mynotification.succesNotification("Rating", "placed");
                setloading(true);
                fetch(`http://localhost:8080/api/offer/updaterated/${orderId}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        rating: e,
                    }),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        mynotification.succesNotification("Offer", "rated");
                        setloading(true);

                    }

                });
            }

        });
    }
    const content = (id,orderId) => (
        <Rate
            allowHalf
            defaultValue={2.5}
            value={rate}
            onChange={(value) => {
                handleChangeRate(value, id,orderId)
            }}
        />
    );


    return state.length != 0 ? (

        state.map(row => {
            console.log(row)
            return row != undefined ? (
                <Card
                    style={{ marginBottom: "1%" }}
                    className={row.Status.Name == 'Accepted' || row.Status.Name == 'Done' ? "acceptedcard" : (row.Status.Name == 'Decline') ? "declinecard" : null}
                    actions={[
                        <Row style={{ marginTop: "1%" }} >
                            <Fragment>
                                {row.Status.Name == 'Pending' && row.Status.Name != 'Decline' && row.Status.Name != 'Accepted' ?
                                    <Col style={{ marginBottom: "1%" }} xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 8, offset: 3 }} lg={{ span: 6, offset: 5 }} xl={{ span: 4, offset: 8 }}>
                                        <Button className="acceptbutton" onClick={() => {
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
                                        }}>Accept</Button>
                                    </Col>
                                    : null
                                }
                                {(row.Status.Name == 'Pending' && row.Status.Name != 'Decline' && row.Status.Name != 'Accepted') ? (
                                    <Col xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 2 }} xl={{ span: 4, offset: 1 }}>
                                        <Button
                                            type="danger"
                                            className="deletebutton"
                                            onClick={() => {
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
                                            }}>Decline</Button>
                                    </Col>
                                ) : null

                                }
                                {row.Status.Name == 'Accepted' ? (

                                    <Col xs={{ span: 6, offset: 9 }} sm={{ span: 4, offset: 10 }} md={{ span: 2, offset: 11 }} >
                                        <Button type="danger" className="cancelbutton" shape="circle" icon={<CloseOutlined />} onClick={() => {
                                            fetch(`http://localhost:8080/api/offer/updatecancel/${row.OrderId}`, {
                                                method: 'PUT',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                            }).then((res) => {
                                                console.log(res)
                                                if (res.status == 200) {
                                                    setloading(true);
                                                    setdataloading(false);
                                                }

                                            });
                                        }}></Button>
                                    </Col>

                                ) : null

                                }
                                {row.Status.Name == 'Done' ? (

                                    <Col xs={{ span: 6, offset: 9 }} sm={{ span: 4, offset: 10 }} md={{ span: 2, offset: 11 }} >

                                        <Popover
                                            placement="bottomLeft"
                                            content={content(row.TrasporterId,row.OrderId)}
                                        >
                                            <Button type="primary"
                                                shape="round"
                                                className='donebutton'

                                            >
                                                Rate
                                            </Button>
                                        </Popover>
                                    </Col>

                                ) : null

                                }
                            </Fragment>
                        </Row>
                    ]}
                >
                    <Descriptions title={`Offer - Status ${row.Status.Name}`}>
                        <Descriptions.Item label="Price">{row.Price}</Descriptions.Item>
                        <Descriptions.Item label="Number seats">{row.Transporter.Transport.NumberSeats}</Descriptions.Item>
                        <Descriptions.Item label="Plate">{row.Transporter.Transport.Plate}</Descriptions.Item>
                        <Descriptions.Item label="Transport Type">{row.Transporter.Transport.TypeTrasport.Name}</Descriptions.Item>
                        <Descriptions.Item label="Model">{`${row.Transporter.Transport.Model.Name}, ${row.Transporter.Transport.Model.Brand.Name}`}</Descriptions.Item>
                        <Descriptions.Item label="Transporter">{`${row.Transporter.User.Name} ${row.Transporter.User.Surname}`}</Descriptions.Item>
                        <Descriptions.Item label="Rating">{row.Transporter.Rating} </Descriptions.Item>
                    </Descriptions>
                </Card>
            ) : (<Skeleton />)
        })


    ) : (<Empty
        description={
            <span>
                No offers yet
            </span>
        }
    />);
};

export default MyOfferCard;