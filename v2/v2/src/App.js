import React, { useState, useEffect } from "react";
import "./App.css";
import AddOrder from "./pages/Order/AddOrder";
import AddOffer from "./pages/Offer/AddOffer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Layout, Menu,Skeleton } from "antd";
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
const { Header, Content, Footer } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [orderId, setOrderId] = useState(0);
  const [typeUserId, setTypeUserId] = useState(0);
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
    

  }, []);

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

      if(data) {
        setTypeUserId(data.TypeUserId);
        setIsAuthenticated(true);
        setloading(false)
      }
    })
      .catch(console.error);
    

  }, []);

  return loading ?(<Skeleton />):(
    //Layout Component
    <Layout className="layout">
      <Header // Header Component
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          height: "64px",
          background: "white",

        }}
      >

        <MyNavBar setIsAuthenticated={setIsAuthenticated} typeUserId={typeUserId} isAuthenticated={isAuthenticated}/>
      </Header>
      <Content // Content Component
        className="site-layout"
        style={{
          marginTop: 64,
          padding: 20,
          paddingBottom: "800px",

        }}
      >
        <div className="site-layout-background"></div>
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
              <AddOffer orderId={orderId} />
            </PrivateRoute>}
          />

          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} setTypeUserId={setTypeUserId} />}
          />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} setTypeUserId={setTypeUserId}/>}
          />
          
            <Route
              path="/orderpage"
              element={<PrivateRoute
                isAuthenticated={isAuthenticated}
              >
                {typeUserId == 2 ?<OrderPage />:<></>}
              </PrivateRoute>}

            /> 
          
          
            <Route
              path="/offerpage"
              element={<PrivateRoute
                isAuthenticated={isAuthenticated}
              >
               {typeUserId == 1 ? <OfferPage />: <></>}
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
              {typeUserId == 1 ?  <Order setOrderId={setOrderId} />: <></> }
              </PrivateRoute>}
            />
          
            <Route
              path="/offer"
              element={<PrivateRoute
                isAuthenticated={isAuthenticated}
              >
               {typeUserId == 2 ? <Offer />: <></>}
              </PrivateRoute>}
            />
            
          <Route
            path="/"
            element={<Home />}
          />


        </Routes>
        {/* </Router> */}

      </Content>
      <Footer
        style={{ textAlign: "center", backgroundColor: "fff" }} // Footer Component
      >

      </Footer>
    </Layout>
  );
};

export default App;
