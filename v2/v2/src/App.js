import React, { useState, useEffect } from "react";
import "./App.css";
import AddOrder from "./pages/Order/AddOrder";
import AddOffer from "./pages/Offer/AddOffer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Layout, Menu } from "antd";
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

const { Header, Content, Footer } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
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
          break;
        default:
          setIsAuthenticated(false);
          break;
      }
    })
      .catch(console.error);
  }, []);

  return (
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

        <MyNavBar setIsAuthenticated={setIsAuthenticated} />
      </Header>
      <Content // Content Component
        className="site-layout"
        style={{
          marginTop: 64,
          padding: 20,
          paddingBottom: "8000px",

        }}
      >
        <div className="site-layout-background"></div>
        {/* <Router> */}
        <Routes>
          <Route
            path="/AddOrder"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
              >
                <AddOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="/AddOffer"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              <AddOffer />
            </PrivateRoute>}
          />
          
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/OrderPage"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              <OrderPage />
            </PrivateRoute>}
            
          />
          <Route
            path="/OfferPage"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              <OfferPage />
            </PrivateRoute>}
          />
          <Route
            path="/EditOrder"
            element={<PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              <EditOrder />
            </PrivateRoute>}
          />
          <Route
            path="/home"
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
