import { Button, Space, Card, Collapse, Descriptions, Row,Modal } from 'antd';
import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Axios from "axios";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import '../../MyStyle/OfferCard.css'
import { format } from 'date-fns'
import MyOfferCard from '../../components/MyOfferCard';
const { Panel } = Collapse;
const OrderPage = () => {
  const history = useNavigate();

  const [state, setState] = useState([]);
  const [stateIds, setStateIds] = useState([]);
  const [loading, setloading] = useState(true);
  const [dataloading, setdataloading] = useState(false);

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
    setdataloading(true);
  }, [loading, dataloading]);
  const getData = async (userId) => {
    await Axios.get(
      `http://localhost:8080/api/customer/getorders/${userId}`
    ).then(

      res => {
        console.log(res.data)
        setState(
          res.data.map(row => ({

            NumberPersons: row.Order.NumberPersons,
            AddressFullStart: `str. ${row.Order.AddressStart.AddressName} ${row.Order.AddressStart.AddressNumber
              }, ${row.Order.AddressStart.LocationName}, ${row.Order.AddressStart.Country.Name}`,
            AddressFullEnd: `str. ${row.Order.AddressEnd.AddressName} ${row.Order.AddressEnd.AddressNumber
              }, ${row.Order.AddressEnd.LocationName}, ${row.Order.AddressEnd.Country.Name}`,
            Date: row.Order.Date,
            MoreDetails: row.Order.MoreDetails,
            IdOrder: row.Order.IdOrder
          })

          )

        );

        console.log(state);


        setloading(false);
      }
    );
  };



  const handleAddOrder = () => {
    history('/addorder');
  };


  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >


      </Space>
      {/* <Table columns={columns} dataSource={state} onChange={handleChange} /> */}
      <Row align="center" style={{ marginTop: "2%", marginBottom: "14.5%" }}>
        {/* <Table columns={columns} dataSource={state} onChange={handleChange} /> */}
        {/* <div className="site-card-border-less-wrapper"> */}

        {state ? state.map((item) => {
          return (<Card style={{ marginBottom: "2%" }} className='offercard' title={item.TitleOffer}
            bordered={false}
            actions={[
              <Fragment>
                <NavLink ><Button>Edit</Button></NavLink>
                <Button
                  onClick={() => {
                    Modal.confirm({
                      title: 'Confirm',
                      icon: <ExclamationCircleOutlined />,
                      content: 'Do you want to delete this offer ?',
                      okText: 'Confirm',
                      cancelText: 'Cancel',
                      onOk() {
                        Axios.delete(`http://localhost:8080/api/order/delete/${item.IdOrder}`).then(res => {
                          console.log(res);
                          if (res.status == 200) {
                            setloading(true);
                          }
                        });
                      },
                    });
                  }}
                >Delete</Button>
              </Fragment>
            ]}
          >

            <Row>

              <Descriptions title="My Order "  >
                <Descriptions.Item label="Location">{item.AddressFullStart}</Descriptions.Item>
                <Descriptions.Item label="Destination">{item.AddressFullEnd}</Descriptions.Item>
                <Descriptions.Item label="Number of people">{item.NumberPersons}</Descriptions.Item>
                <Descriptions.Item label="Date">{format(new Date(item.Date), 'dd-MM-yyyy')} </Descriptions.Item>
                <Descriptions.Item label="Details">{item.MoreDetails} </Descriptions.Item>

              </Descriptions>


            </Row>
            <Row>
              <Collapse id="CollapsePadding" style={{ padding: "0", align: "top" }} ghost className='ant-collapse-header' >
                <Panel id="CollapsePadding" style={{ padding: '0' }} header="Offers"  >
                  <MyOfferCard orderId={item.IdOrder} />
                </Panel>
              </Collapse>
            </Row>

          </Card>)
        }) : <></>}

      </Row>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={handleAddOrder}>Add order</Button>

      </Space>
    </>

  );
};
export default OrderPage;