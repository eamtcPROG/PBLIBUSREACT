import React, { useState, useEffect } from "react";

import "./App.css";
import AddOrder from "./pages/Order/AddOrder";
import AddOffer from "./pages/Offer/AddOffer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Layout, Menu, Skeleton, PageHeader } from "antd";
import "antd/dist/antd.css";
import MyNavBar from "./components/navbar";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import OrderPage from "./pages/Order/OrderPage";
import OfferPage from "./pages/Offer/OfferPage";
import EditOrder from "./pages/Order/EditOrder";
import Home from "./pages/Home";
import Order from "./pages/Order/Order";
import Offer from "./pages/Offer/Offer";
import Axios from "axios";
import TransporterPage from "./pages/Transporter/TransporterPage";
import AddTransport from "./pages/Transporter/AddTransport";
import EditOffer from "./pages/Offer/EditOffer";
import CustomerPage from "./Customer/CustomerPage";
const { Header, Content, Footer } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [orderId, setOrderId] = useState(0);
  const [typeUserId, setTypeUserId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [loading, setloading] = useState(true);



  useEffect(() => {

    const token = localStorage.getItem('token');

    if (token == null) {
      setIsAuthenticated(false);
    }
    fetch(`http://localhost:8080/api/auth/check-auth`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
      },
    }).then((res) => {

      switch (res.status) {
        case 200:
          setIsAuthenticated(true);
          console.log(res)
          break;
        default:
          setIsAuthenticated(false);
          break;
      }
    })
      .catch(console.error);


  }, [isAuthenticated]);

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (token == null) {
      setIsAuthenticated(false);
    }

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
        setTypeUserId(data.TypeUserId);
        console.log(data.IdUser)
        setUserId(data.IdUser);
        setIsAuthenticated(true);
        setloading(false)
      }
    })
      .catch(console.error);

    console.log(userId)
  }, [loading]);

  return loading ? (<Skeleton />) : (
    //Layout Component
    <Layout className="layout">
      <Header // Header Component
        className="header"
      >

        <MyNavBar setIsAuthenticated={setIsAuthenticated} typeUserId={typeUserId} isAuthenticated={isAuthenticated} />
      </Header>
      <Content // Content Component
        className="site-layout"
        style={{



        }}
      >

        {/* <Router> */}
        <Routes>
          <Route
            path="/addorder"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
              >
                <AddOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="/addoffer"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              <AddOffer orderId={orderId} userId={userId} />
            </PrivateRoute>}
          />
          <Route
            path="/editoffer/:id"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              <EditOffer />
            </PrivateRoute>}
          />
          <Route
            path="/editorder/:id"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              <EditOrder/>
            </PrivateRoute>}
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} setTypeUserId={setTypeUserId} />}
          />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} setTypeUserId={setTypeUserId} />}
          />

          <Route
            path="/orderpage"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              {typeUserId == 2 ? <OrderPage /> : <></>}
            </PrivateRoute>}

          />


          <Route
            path="/offerpage"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              {typeUserId == 1 ? <OfferPage /> : <></>}
            </PrivateRoute>}
          />
          <Route
            path="/editorder"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              <EditOrder />
            </PrivateRoute>}
          />

          <Route
            path="/order"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              {typeUserId == 1 ? <Order setOrderId={setOrderId} /> : <></>}
            </PrivateRoute>}
          />
          <Route
            path="/transporter"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              {typeUserId == 1 ? <TransporterPage /> : <></>}
            </PrivateRoute>}
          />
          <Route
            path="/customer"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              {typeUserId == 2 ? <CustomerPage /> : <></>}
            </PrivateRoute>}
          />
          <Route
            path="/addtransporter"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              {typeUserId == 1 ? <AddTransport /> : <></>}
            </PrivateRoute>}
          />

          <Route
            path="/"
            element={<Home />}
          />


        </Routes>
        {/* </Router> */}

      </Content>

      <Footer className='footer' >Let's Go © 2022</Footer>


    </Layout>
  );
};

export default App;
