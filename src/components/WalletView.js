import React, { useEffect, useState } from "react";
import {
  Divider,
  Tooltip,
  List,
  Avatar,
  Spin,
  Tabs,
  Input,
  Button,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../noImg.png";
import axios from 'axios'

const tokens = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: 100000000000,
    decimals: 18,
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    balance: 100000000000,
    decimals: 18,
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    balance: 100000000000,
    decimals: 18,
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    balance: 100000000000,
    decimals: 18,
  },
  {
    symbol: "SepoliaETH",
    name: "Sepolia",
    balance: 100000000000,
    decimals: 18,
  },
];

const nfts = [
  "https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xd774557b647330c91bf44cfeab205095f7e6c367/0xfb76f9ef3adabc27d77c615959f9e22dea24ac7d6a10af3458b3481e5f5e0f10/high.png",
  ,
  "https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0x749f5ddf5ab4c1f26f74560a78300563c34b417d/0x90cae88ffc909feab8e4df76abd0652dee98b7bffab29597d898260d91c20aa1/high.jpeg",
];

function WalletView({
  wallet,
  setWallet,
  seedPhrase,
  setSeedPhrase,
  selectedChain
}) {

   const [tokens, setTokens] = useState(null)
   const [nfts, setNfts] = useState(null)
   const [balance, setBalance] = useState(0)
   const [fetching, setFetching] = useState(true)
   const navigate = useNavigate()

   const items = [
    {
      key: "3",
      label: `Tokens`,
      children : (
        <>
          {tokens ? (
            <>
              <List 
                bordered
                itemLayout="horizontal"
                dataSource={tokens}
                renderItem={(item, index) => (
                  <List.Item style={{textAlign: "left", color: "white"}}>
                    <List.Item.Meta 
                      avatar={<Avatar src={item.logo || logo} />}
                      title={<span style={{ color: 'white' }}>{item.symbol}</span>}
                      description={<span style={{ color: 'white' }}>{item.name}</span>}
                    />
                    <div>
                      {(
                        Number(item.balance) /
                        10 ** Number(item.decimals)
                      ).toFixed(2)}{" "}
                      Tokens
                    </div>
                  </List.Item>
                )}
              />
            </>
          ) : (
            <>
              <span>You seem to not have any tokens yet</span>
              <p className="frontPageBottom">
                Find Alt Coin Gems:{" "}
                <a
                  href="https://moralismoney.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  money.moralis.io
                </a>
              </p>
            </>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: `NFTs`,
      children : (
        <>
          {nfts ? (
            <>
            {nfts.map((e, i) => {
              return (
                <>
                  {e && (
                    <img
                      key={i}
                      className="nftImage"
                      alt="nftImage"
                      src={e}
                    />
                  )}
                </>
              );
            })}
          </>
          ) : (
            <>
            <span>You seem to not have any tokens yet</span>
            <p className="frontPageBottom">
              Find Alt Coin Gems:{" "}
              <a
                href="https://moralismoney.com/"
                target="_blank"
                rel="noreferrer"
              >
                money.moralis.io
              </a>
            </p>
          </>
          )}
        </>
      ),
    },
    {
      key: "1",
      label: `Transfer`,
      children : (
        <>
        Transfer
        </>
      )
    },
   ]

   const getAccountTokens = async () => {
    setFetching(true)
    const res = await axios.get(`http://localhost:3001/getTokens`, {
      params: {
        userAddress: wallet,
        chain: selectedChain,
      }
    })

    const response = res.data

    if(response.tokens.length > 0) {
      setTokens(response.tokens);
    }

    if(response.nfts.length > 0) {
      setTokens(response.nfts);
    }

    setBalance(response.balance)
    setFetching(false)
   }

   const logout = () => {
    setWallet(null)
    setSeedPhrase(null)
    navigate('/')
   }

  return (
    <>
      <div className="content">
        <div className="logoutButton" onClick={logout}>
          <LogoutOutlined />
        </div>
        <div className="walletName">Wallet</div>

        <Tooltip title={wallet}>
          <div>
            {wallet.slice(0,4)}...{wallet.slice(-4)}
          </div>
        </Tooltip>

        <Tabs defaultActiveKey="1" items={items} className="walletView" />
      </div>
    </>
  );
}

export default WalletView;
