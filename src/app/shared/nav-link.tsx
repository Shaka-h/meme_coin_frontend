'use client'; // Add this directive to make it a Client Component
import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function NavLinks() {
  const [currentAddress, setCurrentAddress] = useState(null);
  const router = useRouter();
  
  const connect_wallet = async () => {
    try {
      // Replace this logic with the actual wallet connection logic (e.g., MetaMask)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAddress(accounts[0]); // Store the wallet address in global state
      console.log("Wallet connected: ", accounts[0]);
      router.push('/home')
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };


  return <div>
      <div className="flex justify-center">
        <div onClick={ connect_wallet } className="text-white border p-3 rounded-lg cursor-pointer">CONNECT</div>
      </div>
  </div>
}