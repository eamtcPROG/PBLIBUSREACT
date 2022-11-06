import { Button, Space, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import OfferCard from '../../components/OfferCard';
const Offer = ({setOfferId}) => {
  const history = useNavigate();
  
  const [state, setState] = useState([]);
  
  const [loading, setloading] = useState(true);
  
  const { Title, Text } = Typography;
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await Axios.get(
      "http://localhost:8080/api/offer/getall"
    ).then(
      res => {

        setState(
          res.data.map(row => ({
            Price: row.Price,
            OrderId: row.OrderId,
            TrasporterId: row.TrasporterId,
            IdOffer: row.IdOffer
          })
          
          )
          
        );
        
        console.log(state);
        
        setloading(false);
      }
    );
  };

  
  return (
    <>
       
      <Title // Form's Title
        level={3}
        style={{
          marginBottom: 0,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        Offers
      </Title>
      <OfferCard/>
      {
          state ?
            state.map((item) => {
              return <OfferCard state={item} setOfferId={setOfferId}/>;
            }) : <></>
        }
    </>
  );
};
export default Offer;