"use client"; 
import React, { useEffect, useState } from 'react';
import useStore from '@/store';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

const MemeCoinApp = () => {
  const wallet = useAnchorWallet(); // Hook to get the connected wallet
  const {
    initializeTokenAccount,
    mintTokens,
    transferTokens,
    burnTokens,
    currentAddress,
    setCurrentAddress
  } = useStore();

  const [totalSupply, setTotalSupply] = useState<number>(1000);
  const [mintAmount, setMintAmount] = useState<number>(10);
  const [transferAddress, setTransferAddress] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<number>(5);
  const [burnAmount, setBurnAmount] = useState<number>(2);

  // Initialize token account
  const handleInitialize = async () => {
    if (wallet) {
      await initializeTokenAccount(wallet, totalSupply);
    } else {
      alert("Please connect your wallet");
    }
  };

  // Mint tokens
  const handleMint = async () => {
    if (wallet) {
      await mintTokens(wallet, mintAmount);
    } else {
      alert("Please connect your wallet");
    }
  };

  // Transfer tokens
  const handleTransfer = async () => {
    if (wallet) {
      await transferTokens(wallet, transferAddress, transferAmount);
    } else {
      alert("Please connect your wallet");
    }
  };

  // Burn tokens
  const handleBurn = async () => {
    if (wallet) {
      await burnTokens(wallet, burnAmount);
    } else {
      alert("Please connect your wallet");
    }
  };

  return (
    <div>
      <h1>Meme Coin DApp</h1>
      
      <div className='flex space-x-4 mt-4'>
        <h2>Initialize Token Account</h2>
        <input
         className='border'
          type="number"
          value={totalSupply}
          onChange={(e) => setTotalSupply(Number(e.target.value))}
          placeholder="Total Supply"
        />
        <button onClick={handleInitialize}>Initialize</button>
      </div>

      <div className='flex space-x-4 mt-4'>
        <h2>Mint Tokens</h2>
        <input
         className='border'
          type="number"
          value={mintAmount}
          onChange={(e) => setMintAmount(Number(e.target.value))}
          placeholder="Amount to Mint"
        />
        <button onClick={handleMint}>Mint</button>
      </div>

      <div className='flex space-x-4 mt-4'>
        <h2>Transfer Tokens</h2>
        <input
         className='border'
          type="text"
          value={transferAddress}
          onChange={(e) => setTransferAddress(e.target.value)}
          placeholder="Recipient Address"
        />
        <input
         className='border'
          type="number"
          value={transferAmount}
          onChange={(e) => setTransferAmount(Number(e.target.value))}
          placeholder="Amount to Transfer"
        />
        <button onClick={handleTransfer}>Transfer</button>
      </div>

      <div className='flex space-x-4 mt-4'>
        <h2>Burn Tokens</h2>
        <input
         className='border'
          type="number"
          value={burnAmount}
          onChange={(e) => setBurnAmount(Number(e.target.value))}
          placeholder="Amount to Burn"
        />
        <button onClick={handleBurn}>Burn</button>
      </div>
    </div>
  );
};

export default MemeCoinApp;
