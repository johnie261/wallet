import React from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";

const { TextArea } = Input;

function RecoverAccount({setWallet, setSeedPhrase}) {

  const [typeSeed, setTypeSeed] = useState("")
  const [nonValid, setNonValid] = useState(false)
  const navigate = useNavigate()

  const seedAdjust = (e) => {
    setTypeSeed(e.target.value)
    setNonValid(false)
  }

  const recoverWallet = () => {
    let recoveredWallet;
    try {
      recoveredWallet = ethers.Wallet.fromPhrase(typeSeed)
    } catch (error) {
      setNonValid(true)
      return;
    }

    setSeedPhrase(typeSeed)
    setWallet(recoveredWallet.address)
    navigate('/yourwallet')
  }

  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <BulbOutlined styles={{fontSize: "20px"}}/>
          <div>
            Type your seed phrase in the field below to recover your wallet (it
            should include 12 words seperated with spaces)
          </div>
        </div>

        <textarea 
          rows={4}
          value={typeSeed}
          onChange={seedAdjust}
          className="seedPhraseContainer"
          placeholder="Type your seed phrase here..."
        />

        <Button
          disabled={typeSeed.split(" ").length !== 12 || typeSeed.slice(-1) === " "}
          className= "frontPageButton"
          type="primary"
          onClick={()=> recoverWallet()}
        >
          Recover Wallet
        </Button>

        {nonValid && <p style={{color: "red"}}>Invalid seed phrase</p>}

        <p className="frontPageButton" onClick={()=>navigate('/')}>
          Back Home
        </p>
      </div>
    </>
  );
}

export default RecoverAccount;
