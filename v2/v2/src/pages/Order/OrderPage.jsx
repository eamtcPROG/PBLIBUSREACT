import { Button, Space, Card, Collapse, Descriptions, Row, } from 'antd';
import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Axios from "axios";
import '../../MyStyle/OfferCard.css'
import { format } from 'date-fns'
import MyOfferCard from '../../components/MyOfferCard';
const { Panel } = Collapse;
const OrderPage = () => {
  const history = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [state, setState] = useState([]);
  const [stateIds, setStateIds] = useState([]);
  const [loading, setloading] = useState(true);
  const [dataloading, setdataloading] = useState(false);
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  useEffect(() => {
    getData();
    setdataloading(true);
  }, [loading, dataloading]);
  const getData = async () => {
    await Axios.get(
      "http://localhost:8080/api/order/getallwithaddress"
    ).then(

      res => {
        console.log(res)
        setState(
          res.data.map(row => ({

            NumberPersons: row.NumberPersons,
            AddressFullStart: `str. ${row.AddressStart.AddressName} ${row.AddressStart.AddressNumber
              }, ${row.AddressStart.LocationName}, ${row.AddressStart.Country.Name}`,
            AddressFullEnd: `str. ${row.AddressEnd.AddressName} ${row.AddressEnd.AddressNumber
              }, ${row.AddressEnd.LocationName}, ${row.AddressEnd.Country.Name}`,
            Date: row.Date,
            MoreDetails: row.MoreDetails,
            IdOrder: row.IdOrder
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
          return (<Card className='offercard' title={item.TitleOffer}
            bordered={false}
            actions={[
              <Fragment>
                <NavLink ><Button>Edit</Button></NavLink>
                <Button>Delete</Button>
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