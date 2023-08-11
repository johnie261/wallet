import React, { useState } from "react";
import "./App.css";
import logo from "./moralisLogo.svg"
import { Select } from 'antd';
import { Routes , Route } from "react-router-dom"
import Home from "./components/Home";
import RecoverAccount from "./components/RecoverAccount";
import CreateAccount from "./components/CreateAccount";

function App() {
  const [selectChain, setSelectChain] = useState("0x1")

  return (
    <div className="App">
      <header>
        <img src={logo} className="headerLogo" alt="logo"/>
        <Select
          onChange={(chain) => setSelectChain(chain)}
          value={selectChain}
          options={[
            {
              label: "Ethereum",
              value: "0x1"
            },
            {
              label: "Mumbai Testnet",
              value: "0x13881"
            },
            {
              label: "Polygon",
              value: "0x89"
            },
            {
              label: "Sepolia",
              value: "11155111"
            },
            {
              label: "Avalance",
              value: "0xa86a"
            }
          ]}
          className="dropdown"
        />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recover" element={<RecoverAccount />} />
        <Route path="/yourwallet" element={<CreateAccount />} />
      </Routes>
    </div>
  );
}

export default App;
