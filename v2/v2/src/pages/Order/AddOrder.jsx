import React,{useState,useEffect}from "react";
import { Form, Input, Button, Typography, DatePicker, Space,Card } from "antd";
import { useNavigate } from "react-router-dom";
import AddresForm from "../../components/AddresForm";
import MyNotifications from "../../notifications/MyNotifications";
import AddForm from "../../components/AddForm";
const AddOrder = () => {
  const history = useNavigate();
  const mynotification = new MyNotifications();
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const [numberpersons, setNumberPersons] = useState(0);
  const [startpointaddressid, setStartPointAddressId] = useState(0);
  const [endpointaddressid, setEndPointAddressId] = useState(0);
  const [idaddress, setIdAddress] = useState(0);
  const [userId,setUserId] = useState(0);
  const [loading, setloading] = useState(true);
  const [date, setDate] = useState(null);
  const [moredetails, setMoreDetails] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isActiveSecond, setIsActiveSecond] = useState(false);
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
  const handleNumberPersonsChange = (e) => {
    setNumberPersons(e.target.value);
    console.log(e.target.value);
  };
  const handleStartPointAddressIdChange = (e) => {
    setStartPointAddressId(e.target.value);
  };
  const handleEndPointAddressIdChange = (e) => {
    setEndPointAddressId(e.target.value);
  };
  const handleDateChange = (e, value) => {
    setDate(value);
  };
  const handleMoreDetailsChange = (e) => {
    setMoreDetails(e.target.value);
  };
  const handleAddress  =()=> {
   setIsActive(!isActive);

}
const handleAddressSecond  =()=> {
  setIsActiveSecond(!isActiveSecond);
  setStartPointAddressId(idaddress);
  
} 
  
  const handleSubmit = (event) => {
    //event.preventDefault();
    setEndPointAddressId(idaddress);
    console.log(idaddress);
    console.log(endpointaddressid);
    fetch(`http://localhost:8080/api/order/add`, {
      method: 'POST',
      body: JSON.stringify({
        numberpersons,
        startpointaddressid,
        endpointaddressid:idaddress,
        date,
        moredetails
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();

      }

    }).then((data) => {

      if (data != null) {


         fetch(`http://localhost:8080/api/customer/add`, {
      method: 'POST',
      body: JSON.stringify({
        orderid:data.IdOrder,
        userid:userId
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();

      }

    }).then((data) => {

      if (data != null) {

        mynotification.succesNotification("Order");
        return history('/orderpage');
      }
    });
      }
    });

  };
  return (
    
      <AddForm/>
    
  );
};

export default AddOrder;