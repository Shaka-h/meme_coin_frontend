// useStore.ts
import { create } from 'zustand';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import { Idl, Program, Provider, web3 } from "@project-serum/anchor";
import idl from '../idl/meme_coin.json';
import kp from "./keypair.json";
import {MemeCoinStore} from '@/types';

const connection = new Connection('https://api.devnet.solana.com');
const programID = new PublicKey('48UJPVGHWQshBb6ptcv9rXCSFjNiw5envuVZUYMSGR9S'); 
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

const useStore = create<MemeCoinStore>((set) => ({
  currentAddress: null,
  tokenSupply: 0,
  setCurrentAddress: (address: string) => set({ currentAddress: address }),
  setTokenSupply: (supply: number) => set({ tokenSupply: supply }),

  initializeTokenAccount: async (wallet: AnchorWallet, totalSupply: number) => {
    const provider = new Provider(connection, wallet, {});
    const program = new Program(idl as Idl, programID, provider);

    try {
      const tx = await program.rpc.initialize({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log("Token account initialized:", tx);
    } catch (error) {
      console.error("Initialization error:", error);
    }
  },

  mintTokens: async (wallet: AnchorWallet, amount: number) => {
    const provider = new Provider(connection, wallet, {});
    const program = new Program(idl as Idl, programID, provider);

    try {
      const tx = await program.rpc.mint(amount, {
        accounts: {
          owner: wallet.publicKey,
        },
      });
      console.log("Minted tokens:", tx);
    } catch (error) {
      console.error("Mint error:", error);
    }
  },

  transferTokens: async (wallet: AnchorWallet, receiverAddress: string, amount: number) => {
    const provider = new Provider(connection, wallet, {});
    const program = new Program(idl as Idl, programID, provider);
    const receiverPublicKey = new PublicKey(receiverAddress);

    try {
      const tx = await program.rpc.transfer(amount, {
        accounts: {
          senderAccount: wallet.publicKey,
          receiverAccount: receiverPublicKey,
        },
      });

      console.log("Transferred tokens:", tx);
    } catch (error) {
      console.error("Transfer error:", error);
    }
  },

  burnTokens: async (wallet: AnchorWallet, amount: number) => {
    const provider = new Provider(connection, wallet, {});
    const program = new Program(idl as Idl, programID, provider);

    try {
      const tx = await program.rpc.burn(amount, {
        accounts: {
          owner: wallet.publicKey,
        },
      });
      console.log("Burned tokens:", tx);
    } catch (error) {
      console.error("Burn error:", error);
    }
  },
}));

export default useStore;
