import React from "react";
import "antd/dist/antd.min.css";
import "./App.css";
import Timesheet from "./features/timesheet/Timesheet";
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header />
      <Content>
        <div className="main-content">
          <Timesheet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
