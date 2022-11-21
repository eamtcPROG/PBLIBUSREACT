import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, DatePicker, Space, Card, Row, Select, Col, Skeleton } from "antd";
import { useNavigate,useParams } from "react-router-dom";
import Axios from "axios";
import '../../MyStyle/AddForm.css'
import MyNotifications from "../../notifications/MyNotifications";
import moment from "moment";
const EditOrder = () => {
  const history = useNavigate();
  const mynotification = new MyNotifications();
  const idOrder = useParams();
  const [form] = Form.useForm();
  const { Title, Text } = Typography;

  const [locationname, setLocationName] = useState();
  const [locationnameD, setLocationNameD] = useState();
  const [numberpersons, setNumberPersons] = useState();
  const [startpointaddressid, setStartPointAddressId] = useState();
  const [endpointaddressid, setEndPointAddressId] = useState();

  const [userId, setUserId] = useState(0);
  const [loading, setloading] = useState(true);

  const [date, setDate] = useState(null);

  const [addressnumber, setAddressNumber] = useState();
  const [addressnumberD, setAddressNumberD] = useState();
  const [addressname, setAddressName] = useState();
  const [addressnameD, setAddressNameD] = useState();
  const [state, setState] = useState([])
  const [countryid, setCountryId] = useState();
  const [countryidD, setCountryIdD] = useState();

  const [damy, setDamy] = useState(0);
  const [moredetails, setMoreDetails] = useState('');
  const [loadingData, setloadingData] = useState(true);
  const dateFormat = "DD/MM/YYYY";
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
        setUserId(data.IdUser);
        setloading(false);
      }
    })
      .catch(console.error);
  }, [loading]);

  const getData = async () => {
    await Axios.get(
      "http://localhost:8080/api/country/getall"
    ).then(
      res => {

        setState(
          res.data.map(row => ({
            IdCountry: row.IdCountry,
            Name: row.Name,
          })

          )

        );

        console.log(state);

        setloading(false);
      }
    );
  };
  
  useEffect(() => {

    getDataOrder();
    getData();
}, [loading,loadingData,damy]);

  const getDataOrder = async () => {
    await Axios.get(
        `http://localhost:8080/api/order/${idOrder.id}`
    ).then(
        res => {
            console.log(res.data);
            if (res.data != undefined) {
              setStartPointAddressId(res.data.StartPointAddressId);
              setEndPointAddressId(res.data.EndPointAddressId);
              setNumberPersons(res.data.NumberPersons);
              setDate(moment(res.data.Date));
              
              setMoreDetails(res.data.MoreDetails);
              getDataAddress(res.data.StartPointAddressId,1);
              getDataAddress(res.data.EndPointAddressId,2);
            }
        }
    );
    console.log(countryid)
    if (moredetails != undefined ) {
        setloadingData(false);
    }
};

const getDataAddress = async (id,type) => {
  
  await Axios.get(
      `http://localhost:8080/api/address/${id}`
  ).then(
      res => {
          console.log(res.data);

          if (res.data != undefined) {
            if(type == 1){
              setLocationName(res.data.LocationName);
              setAddressName(res.data.AddressName);
              setAddressNumber(res.data.AddressNumber);
              setCountryId(res.data.CountryId);
            }else{
              setLocationNameD(res.data.LocationName);
              setAddressNameD(res.data.AddressName);
              setAddressNumberD(res.data.AddressNumber);
              setCountryIdD(res.data.CountryId);
            }
          }
          if(countryid != undefined || countryidD != undefined){
            setDamy(1);
          }
      }
      
  );
};

  const handleNumberPersonsChange = (e) => {
    setNumberPersons(e.target.value);
  };

  const handleDateChange = (e, value) => {
    setDate(value);
  };
  const handleMoreDetailsChange = (e) => {
    setMoreDetails(e.target.value);

  };
  const handleCountryIdChange = (value) => {
    setCountryId(value);

  };
  const handleCountryIdDChange = (value) => {
    setCountryIdD(value);

  };
  const handleLocationNameChange = (e) => {
    setLocationName(e.target.value);
  };
  const handleAddressNumberChange = (e) => {
    setAddressNumber(e.target.value);
  };
  const handleAddressNameChange = (e) => {
    setAddressName(e.target.value);
  };
  const handleLocationNameDChange = (e) => {
    setLocationNameD(e.target.value);
  };
  const handleAddressNumberDChange = (e) => {
    setAddressNumberD(e.target.value);
  };
  const handleAddressNameDChange = (e) => {
    setAddressNameD(e.target.value);
  };


  const handleSubmit = () => {



    fetch(`http://localhost:8080/api/address/update/${startpointaddressid}`, {
      method: 'PUT',
      body: JSON.stringify({
        locationname,
        addressnumber,
        addressname,
        countryid

      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {

      if (res.status === 200) {
        fetch(`http://localhost:8080/api/address/update/${endpointaddressid}`, {
        method: 'PUT',
        body: JSON.stringify({
          locationname: locationnameD,
          addressnumber: addressnumberD,
          addressname: addressnameD,
          countryid: countryidD
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {

        if (res.status === 200) {
          if (startpointaddressid!= undefined && endpointaddressid != undefined) {
            fetch(`http://localhost:8080/api/order/update/${idOrder.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                numberpersons,
                startpointaddressid,
                endpointaddressid,
                date,
                moredetails
              }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }).then((res) => {
              if (res.status === 200) {
                Axios.delete(`http://localhost:8080/api/offer/deletefororder/${idOrder.id}`).then(
                  res=>{
                    if (res.status === 200) {
                      mynotification.succesNotification("Order","edited");
                      return history('/orderpage');
                    }
                  }
                )
              }
  
            })
          }

        }

      })

      }

    })

  };
  
  

  return loading != false || loadingData != false || countryid == undefined || countryidD == undefined || date == undefined? (<Skeleton/>) :(

    <Row style={{marginTop:'2.5vh'}} >
      <Col align="center" span={24}><Card id="AddFormCard"
      title="Edit Order"
      style={{
        width: "50%"
      }}
    >
      <Form
        name="contact-us"
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >

        <Row>
          <Title>Set Starting Location</Title>
        </Row>
        <Row>
          <Col span={10} style={{marginLeft:"2vm"}}>
            <Form.Item
              label="Country"
            >
              < Select
                defaultValue={countryid}
                style={{
                  width: "100%",
                }}
                onChange={handleCountryIdChange}
                options={state.map((item) => ({
                  value: item.IdCountry,
                  label: `${item.Name}`
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={10} push={2}>
            <Form.Item
              label="Town"
              
              initialValue={locationname}
              
            >
              <Input className="InputAddForm" placeholder="Location Name" onChange={handleLocationNameChange} value={locationname} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} style={{marginLeft:"2vm"}}>
            <Form.Item
              label="Street"
              
              initialValue={addressname}
              
            >
              <Input className="InputAddForm" placeholder="Street Name" onChange={handleAddressNameChange} value={addressname} />
            </Form.Item>
          </Col>
          <Col span={10} push={2}>
            <Form.Item
              label="Street Number"
              
              initialValue={addressnumber}
              
            >
              <Input className="InputAddForm" placeholder="Street Number" onChange={handleAddressNumberChange} value={addressnumber} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Title>Set Destination</Title>
        </Row>
        <Row>
          <Col span={10} style={{marginLeft:"2vm"}}>
            <Form.Item
              label="Country"
            >
              < Select
                defaultValue={countryidD}
                style={{
                  width: "100%",
                }}
                onChange={handleCountryIdDChange}
                options={state.map((item) => ({
                  value: item.IdCountry,
                  label: `${item.Name}`
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={10} push={2}>
            <Form.Item
              label="Town"
              initialValue={locationnameD}
              
            >
              <Input className="InputAddForm" placeholder="Location Name" onChange={handleLocationNameDChange} value={locationnameD} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} style={{marginLeft:"2vm"}}>
            <Form.Item
              label="Street"
              initialValue={addressnameD}
            >
              <Input className="InputAddForm" placeholder="Street Name" onChange={handleAddressNameDChange} value={addressnameD} />
            </Form.Item>
          </Col>
          <Col span={10} push={2}>
            <Form.Item
              label="Street Number"
              
              initialValue={addressnumberD}
              
            >
              <Input className="InputAddForm" placeholder="Street Number" onChange={handleAddressNumberDChange} value={addressnumberD} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} style={{marginLeft:"2vm"}}>
            <Form.Item label="Date"
              name="date"
              initialValue={date}
            >

              <DatePicker style={{ width: "100%" }} onChange={handleDateChange} format={dateFormat} value={date} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} style={{marginLeft:"2vm"}}>
            <Form.Item // Form Item (Email)
              label="Number of people"
              name="nrPeople"
              initialValue={numberpersons}
              
            >
              <Input style={{ width: "100%" }} placeholder="Number of people" onChange={handleNumberPersonsChange} value={numberpersons} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} style={{marginLeft:"vm"}}>
            <Form.Item 
              label="Preferences"
              name="message"
              initialValue={moredetails}
            >
              <Input.TextArea
                placeholder="Type here.."
                autoSize={{ minRows: 8, maxRows: 10 }}
                onChange={handleMoreDetailsChange} value={moredetails}

              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card></Col></Row>

  );
};

export default EditOrder;