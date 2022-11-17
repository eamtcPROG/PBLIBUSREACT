import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Select, Skeleton,Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
const EditOffer = ({ }) => {
    const history = useNavigate();
    const [form] = Form.useForm();
    const { Title, Text } = Typography;

    const [price, setPrice] = useState();
    const [orderid, setOrderId] = useState();
    const [idoffer, setIdOffer] = useState();
    const [trasporterid, settrasporterid] = useState();
    const [loading, setloading] = useState(true);
    const [loadingData, setloadingData] = useState(true);
    const [state, setState] = useState([]);
    const handlePriceChange = (e) => {
        setPrice(e.target.value);

    };
    const idOffer = useParams();

    const handleOrderIdChange = (e) => {
        setOrderId(e.target.value);
    };
    const handletrasporteridChange = (value) => {
        console.log(value);
        settrasporterid(value);
        console.log(trasporterid);
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/api/auth/getuser`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: token,
            },
        }).then((res) => {
            return res.json();

        }).then((data) => {

            if (data) {

                getData(data.IdUser);

            }
        })
            .catch(console.error);
        setloading(false);

    }, [loading]);
    useEffect(() => {

        getDataOffer();
        
    }, [loadingData,orderid]);
    const getData = async (userId) => {
        console.log(userId)
        await Axios.get(
            `http://localhost:8080/api/transporter/getalltransport/${userId}`
        ).then(
            res => {

                setState(
                    res.data.map(row => ({

                        IdTransporter: row.Transporters[0].IdTransporter,
                        ModelName: row.Model.Name,
                        NumberSeats: row.NumberSeats

                    })

                    )

                );

                console.log(state);


            }
        );
    };
    const getDataOffer = async () => {
        console.log(idOffer);
        await Axios.get(
            `http://localhost:8080/api/offer/${idOffer.id}`
        ).then(
            res => {
                console.log(res.data);
                if (res.data != undefined) {
                    setOrderId(res.data.OrderId);
                    setPrice(res.data.Price);
                    settrasporterid(res.data.TrasporterId);
                    setIdOffer(res.data.IdOffer);
                }
            }
        );
        console.log("Data:", orderid, price, trasporterid)
        if (orderid != undefined && price != undefined && trasporterid != undefined) {
            setloadingData(false);
        }
    };
    const handleSubmit = (e) => {


        fetch(`http://localhost:8080/api/offer/update/${idoffer}`, {
            method: 'PUT',
            body: JSON.stringify({
                price,
                orderid: orderid,
                trasporterid
            }),
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
                return history('/offerpage');
            }
        });

    };
    return loading != false || loadingData != false ? (<Skeleton />) : (
        <div>
            {/* <Title // Form's Title
                level={3}
                style={{
                    marginBottom: 0,
                    paddingTop: 20,
                    paddingLeft: 30,
                    paddingRight: 30,
                }}
            >
                Add Offer
            </Title>
            <Text // Form's Description
                type="secondary"
                style={{
                    paddingLeft: 30,
                    paddingRight: 30,
                }}
            >

            </Text> */}
        <Card
        title="Edit Offer"
        bordered={false}
        style={{
        width: 600,
        }}
        >
            <Form // Ant Design's Form Component
                name="contact-us"
                layout="vertical"
                form={form}
                wrapperCol={{
                    span: 6,
                }}
                style={{
                    marginTop: 20,
                    paddingBottom: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item // Form Item (First Name)
                    label="Price"
                    name="price"
                    initialValue={price}
                    
                >
                    <Input placeholder="Price" onChange={handlePriceChange} value={price} />
                </Form.Item>


                <Form.Item // Form Item (Email)
                    label="Transport"
                    name="transport"
                    
                >
                    < Select
                        defaultValue={trasporterid}
                        style={{
                            width: 300,
                        }}
                        onChange={handletrasporteridChange}
                        options={state.map((item) => ({
                            value: item.IdTransporter,
                            label: `${item.ModelName} - Number of seats ${item.NumberSeats}`
                        }))}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
            </Card>
        </div>
    );
};

export default EditOffer;