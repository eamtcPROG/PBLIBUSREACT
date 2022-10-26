import React from "react";
import "./App.css";
import AddOrder from "./pages/Order/AddOrder";
import AddOffer from "./pages/Offer/AddOffer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import MyNavBar from "./components/navbar";
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
  return (
    //Layout Component
    <Layout className="layout">
      <Header // Header Component
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          height:"64px",
          background:"white",
          
        }}
      >
        
       <MyNavBar />
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
        <Router>
            <Routes>
              
              <Route
                path="/AddOffer"
                element={<AddOffer />}
              />
               <Route
                path="/AddOrder"
                element={<AddOrder />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />
               <Route
                path="/OrderPage"
                element={<OrderPage />}
              />
               <Route
                path="/OfferPage"
                element={<OfferPage />}
              />
              <Route
                path="/EditOrder"
                element={<EditOrder />}
              />
              <Route
                path="/home"
                element={<Home />}
              />

              {/* <Route
              path="/"
              render={(props) => (
                
              )} />*/}

            </Routes>
          </Router>
        
      </Content>
      <Footer
        style={{ textAlign: "center", backgroundColor: "fff" }} // Footer Component
      >
        
      </Footer>
    </Layout>
  );
};

export default App;
