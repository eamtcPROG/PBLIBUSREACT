import React from "react";
import './App.css';
import { Layout } from 'antd';
import MyNavBar from "./components/MyNavBar.jsx";
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from "./pages/Login.jsx"
import Register from "./pages/Register";
const { Header, Content, Footer } = Layout;

function App() {

  return (
    <>
      <Layout class="layout">
        <Header>
          <MyNavBar />
        </Header>
        <Content >
          <Router>
            <Routes>
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />

              {/* <Route
              path="/"
              render={(props) => (
                
              )} />*/}

            </Routes>
          </Router>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout>
    </>
  );
}

export default App;
