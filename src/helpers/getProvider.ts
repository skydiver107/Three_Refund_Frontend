import * as anchor from '@project-serum/anchor'
import { AccountLayout, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';

export const getProvider = (connection: anchor.web3.Connection, wallet: AnchorWallet) => {
  if (wallet)
    return new anchor.AnchorProvider(connection, wallet, 'confrimed' as anchor.web3.ConfirmOptions);
}