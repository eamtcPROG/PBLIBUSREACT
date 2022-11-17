import { Button, Space, Card, Collapse, Descriptions, Row, } from 'antd';
import React, { useState, useEffect,Fragment } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import Axios from "axios";
import '../../MyStyle/OfferCard.css'
const { Panel } = Collapse;
const OrderPage = () => {
  const history = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [state, setState] = useState([]);
  const [stateIds, setStateIds] = useState([]);
  const [loading, setloading] = useState(true);
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
  }, [loading]);
  const getData = async () => {
    await Axios.get(
      "http://localhost:8080/api/order/getallwithaddress"
    ).then(
      
      res => {
        console.log(res)
        setState(
          res.data.map(row => ({
            
            NumberPersons: row.NumberPersons,
            StartPointAddressId: row.StartPointAddressId,
            EndPointAddressId: row.EndPointAddressId,
            AddressFull:row.AddressStart.LocationName,
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

  
  // const columns = [
  //   {
  //     title: "Number of Persons",
  //     dataIndex: "NumberPersons",
  //     width: 150
  //   },
  //   {
  //     title: "Start Point Address",
  //     dataIndex: "StartPointAddressId",
  //     width: 150
  //   },
  //   {
  //     title: "End Point Address",
  //     dataIndex: "EndPointAddressId",
  //     width: 150
  //   },
  //   {
  //     title: "Date",
  //     dataIndex: "Date",
  //     width: 150
  //   },
  //   {
  //     title: "More Details",
  //     dataIndex: "MoreDetails",
  //     width: 150
  //   }
  // ];
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
      
     { state ?state.map((item)=>{
      return ( <Card className='offercard' title={item.TitleOffer}
      bordered={false}
      actions={[
        <Fragment>
          <NavLink to={`/editoffer/${item.IdOffer}`} ><Button>Edit</Button></NavLink>
          <Button>Delete</Button>
        </Fragment>
      ]}
    >
      
      <Row>

        <Descriptions title="My Order "  >
          <Descriptions.Item label="Location">{item.FullLocationStart}</Descriptions.Item>
          <Descriptions.Item label="Destination">{item.FullLocationEnd}</Descriptions.Item>
          <Descriptions.Item label="Number of people">{item.NumberPersons}</Descriptions.Item>
          <Descriptions.Item label="Date">{item.Date} </Descriptions.Item>

          

        </Descriptions>


      </Row>
      <Row>
      <Collapse id="CollapsePadding"style={{ padding: "0", align:"top" }} ghost className='ant-collapse-header' >
            <Panel id="CollapsePadding" style={{ padding:'0' }} header="Offers"  >
              <Card>
                <Descriptions  title="Offer">
                <Descriptions.Item label="Price">{item.Price}</Descriptions.Item>
                <Descriptions.Item label="Number seats">{item.numberseats}</Descriptions.Item>
                <Descriptions.Item label="Plate">{item.plate}</Descriptions.Item>
                <Descriptions.Item label="Transport Type"></Descriptions.Item>
                <Descriptions.Item label="Model"></Descriptions.Item>

                </Descriptions>
                </Card>
            </Panel>
          </Collapse></Row>
    </Card>)
     }):<></>}
     
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