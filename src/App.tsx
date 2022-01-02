import React from "react";
import "antd/dist/antd.min.css";
import "./App.css";
import Timesheet from "./features/timesheet/Timesheet";
import { Layout } from "antd";

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Content>
        <div className="main-content">
          <Timesheet />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
