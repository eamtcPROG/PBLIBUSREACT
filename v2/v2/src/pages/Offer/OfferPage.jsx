import { Button, Space, Table, Card, Collapse, Typography, Descriptions, Row, Col,Skeleton,Modal } from 'antd';
import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import { format } from 'date-fns'
import Axios from "axios";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const OfferPage = () => {
  const history = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [state, setState] = useState([]);
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
        setloading(false);
      }
    })
      .catch(console.error);
      console.log("My state:",state)
  }, [loading]);
  const getData = async (userId) => {
    await Axios.get(
      `http://localhost:8080/api/offer/getallwithorder/${userId}`
    ).then(
      res => {
        setState(
        res.data.map(row => ({
          
            IdOffer: row.IdOffer,
            Price: row.Price,
            OrderId: row.OrderId,
            TrasporterId: row.TrasporterId,
            NumberPersons: row.Order.NumberPersons,
            Date: row.Order.Date,
            FullLocationStart: `str. ${row.Order.AddressStart.AddressName},${row.Order.AddressStart.AddressNumber},${row.Order.AddressStart.LocationName}`,
            FullLocationEnd: `str. ${row.Order.AddressEnd.AddressName},${row.Order.AddressEnd.AddressNumber},${row.Order.AddressEnd.LocationName}`,
            TitleOffer: `${row.Order.AddressStart.Country.Name} - ${row.Order.AddressEnd.Country.Name}`,
            TransporterCar: `${row.Transporter.Transport.Model.Name} - ${row.Transporter.Transport.Model.Brand.Name}`,
            TransporterCarType: row.Transporter.Transport.TypeTrasport.Name,
            TransporterCarNumberSeats: row.Transporter.Transport.NumberSeats,

          
        }))
        )
      }

    );



  };
  
  
  return loading ? (<Skeleton />) :  (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >


      </Space>
      {/* <Table columns={columns} dataSource={state} onChange={handleChange} /> */}
      <Row align="center" style={{marginTop:"5vh", marginBottom: "10.5vh"  }}>
        {/* <Table columns={columns} dataSource={state} onChange={handleChange} /> */}
        {/* <div className="site-card-border-less-wrapper"> */}
        
       { state ?state.map((item)=>{
        return ( <Card style={{marginBottom:"2%"}} className='offercard' title={item.TitleOffer}
        bordered={false}
        actions={[
          <Row>
            <Fragment>

              <Col xs={{ span: 9, offset: 12 }} sm={{ span: 5, offset: 10 }} md={{ span: 4, offset: 14 }} lg={{ span: 4, offset: 14 }} xl={{ span: 3, offset: 16 }} xxl={{ span: 2, offset: 18 }}><NavLink to={`/editoffer/${item.IdOffer}`} ><Button type="primary" className='editbutton' >Edit</Button></NavLink></Col>
              <Col  xs={{ span: 9, offset: 12 }} sm={{ span: 5, offset: 2 }} md={{ span: 4, offset: 1 }} lg={{ span: 4, offset: 1 }} xl={{ span: 3, offset: 1 }} xxl={{ span: 2, offset: 1 }}><Button type="danger" className='deletebutton'onClick={()=>{
                 Modal.confirm({
                  title: 'Confirm',
                  icon: <ExclamationCircleOutlined />,
                  content: 'Do you want to delete this offer ?',
                  okText: 'Confirm',
                  cancelText: 'Cancel',
                  onOk() {
                    Axios.delete(`http://localhost:8080/api/offer/delete/${item.IdOffer}`).then(res => {
                      console.log(res);
                      if (res.status == 200) {
                        setloading(true);
                      }
                  });
                  },
                });
              }} >Delete</Button></Col>
              

            </Fragment></Row>
        ]}
      >
        
        <Row >

          <Descriptions title="Order Info"  >
            <Descriptions.Item label="Location">{item.FullLocationStart}</Descriptions.Item>
            <Descriptions.Item label="Destination">{item.FullLocationEnd}</Descriptions.Item>
            <Descriptions.Item label="Number of people">{item.NumberPersons}</Descriptions.Item>
            <Descriptions.Item label="Date"> {format(new Date(item.Date), 'dd-MM-yyyy')}</Descriptions.Item>
            <Descriptions.Item label="Price">{item.Price}</Descriptions.Item>
          </Descriptions>
          <Col> <Descriptions.Item >
              <Collapse id="CollapsePadding"style={{ padding: "0"}} ghost className='ant-collapse-header' >
                <Panel id="CollapsePadding" style={{ padding:'0' }} header="Transport Info"  >
                  <Col>{<Descriptions  title="Transport Info">
                    <Descriptions.Item label="Car Model">{item.TransporterCar}</Descriptions.Item>
                    <Descriptions.Item label="Car type">{item.TransporterCarType}</Descriptions.Item>
                    <Descriptions.Item label="Nr o seats">{item.TransporterCarNumberSeats}</Descriptions.Item>
                  </Descriptions> }</Col>
              </Panel>
            </Collapse></Descriptions.Item></Col>


        </Row>
      </Card>)
       }):<></>}
       
      </Row>
    </>
  );
};
export default OfferPage;