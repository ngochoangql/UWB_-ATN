// App.js
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Page/Sidebar";
import Page1 from "./components/Page/Page1";
import Login from "./components/Login/Login";
import Pages from "./components/Page/Pages";
import Page3 from "./components/Page/Page3";

const App = () => {
  return (
    // <div style={{ display: 'flex' }}>
    //   <Sidebar />
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route
    //       path="/"
    //       element={
    //         <Content>
    //           <Pages/>
    //         </Content>
    //       }
    //     />
    //     <Route
    //       path="/page1"
    //       element={
    //         <Content>
    //           <Page1 />
    //         </Content>
    //       }
    //     />
    //     <Route
    //       path="/page2"
    //       element={
    //         <Content>
    //           <Page2 />
    //         </Content>
    //       }
    //     />
    //     <Route
    //       path="/page3"
    //       element={
    //         <Content>
    //           <Page3 />
    //         </Content>
    //       }
    //     />
    //   </Routes>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/network-devices" element={<Page1 />} />
        <Route path="/move-to/:room" element={<Page3/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
