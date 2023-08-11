import React, { useState } from "react";
import "./App.css";
import logo from "./moralisLogo.svg"
import { Select } from 'antd';
import { Routes , Route } from "react-router-dom"
import Home from "./components/Home";
import RecoverAccount from "./components/RecoverAccount";
import CreateAccount from "./components/CreateAccount";
import WalletView from "./components/WalletView";

function App() {
  const [wallet, setWallet] = useState(null)
  const [seedPhrase, setSeedPhrase] = useState(null)
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
      { wallet && seedPhrase ? (
        <Routes>
          <Route path="/yourwallet" element={<WalletView />}/>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recover" element={<RecoverAccount />} />
          <Route path="/yourwallet"
            element={<CreateAccount 
              setWallet = {setWallet}
              setSeedPhrase= {setSeedPhrase}
            />} 
          />
        </Routes>
      )}
      
    </div>
  );
}

export default App;
