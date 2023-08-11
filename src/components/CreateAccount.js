import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import { ethers } from 'ethers'
import { ExclamationCircleOutlined } from "@ant-design/icons";

function CreateAccount({ setSeedPhrase, setWallet }) { 
  
  const [newSeedPhrase, setNewSeedPhrase] = useState(null)
  const navigate = useNavigate()

  const generateWallet = () => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic)
  }

  const setWalletAndMnemonic = () => {
    setSeedPhrase(newSeedPhrase)
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address)
  }

  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <ExclamationCircleOutlined style={{ fontSize: "20px" }} />
          <div>
            Once you generate the seed phrase, save it securely in order to
            recover your wallet in the future.
          </div>
        </div>

        <Button
          className="frontPageButton"
          type="primary"
          onClick={() => generateWallet()}
        >
          Generate Seed Phrase
        </Button>

        <Card className="seedPhraseContainer">
          {newSeedPhrase && <pre style={{whiteSpace: "pre-wrap"}}>{newSeedPhrase}</pre>}
        </Card>

        <Button
          className="frontPageButton"
          type="default"
          onClick={()=>setWalletAndMnemonic()}
        >
          Open your New Wallet
        </Button>

        <p className="frontPageButton" onClick={()=>navigate('/')}>
          Back Home
        </p>
      </div>
    </>
  );
}

export default CreateAccount;
