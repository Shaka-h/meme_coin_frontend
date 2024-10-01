// types.ts
import { AnchorWallet } from '@solana/wallet-adapter-react';

export interface MemeCoinStore {
  currentAddress: string | null;
  tokenSupply: number;
  setCurrentAddress: (address: string) => void;
  setTokenSupply: (supply: number) => void;
  initializeTokenAccount: (wallet: AnchorWallet, totalSupply: number) => Promise<void>;
  mintTokens: (wallet: AnchorWallet, amount: number) => Promise<void>;
  transferTokens: (wallet: AnchorWallet, receiverAddress: string, amount: number) => Promise<void>;
  burnTokens: (wallet: AnchorWallet, amount: number) => Promise<void>;
}
