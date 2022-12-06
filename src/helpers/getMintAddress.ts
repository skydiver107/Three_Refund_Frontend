import { Connection, PublicKey } from '@solana/web3.js'
import base58 from 'bs58';
import * as anchor from '@project-serum/anchor';
import { web3 } from '@project-serum/anchor';

const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
const MAX_NAME_LENGTH = 32;
const MAX_URI_LENGTH = 200;
const MAX_SYMBOL_LENGTH = 10;
const MAX_CREATOR_LEN = 32 + 1 + 1;
const MAX_CREATOR_LIMIT = 5;
const MAX_DATA_SIZE = 4 + MAX_NAME_LENGTH + 4 + MAX_SYMBOL_LENGTH + 4 + MAX_URI_LENGTH + 2 + 1 + 4 + MAX_CREATOR_LIMIT * MAX_CREATOR_LEN;
const MAX_METADATA_LEN = 1 + 32 + 32 + MAX_DATA_SIZE + 1 + 1 + 9 + 172;
const CREATOR_ARRAY_START =
  1 +
  32 +
  32 +
  4 +
  MAX_NAME_LENGTH +
  4 +
  MAX_URI_LENGTH +
  4 +
  MAX_SYMBOL_LENGTH +
  2 +
  1 +
  4;


export const getMintAddresses = async (firstCreatorAddress: web3.PublicKey, connection: anchor.web3.Connection): Promise<string[]> => {
  try {
    const metadataAccounts = await connection.getProgramAccounts(
      TOKEN_METADATA_PROGRAM_ID,
      {
        dataSlice: { offset: 33, length: 32 },

        filters: [
          { dataSize: MAX_METADATA_LEN }, // The mint address is located at byte 33 and lasts for 32 bytes.
          {
            memcmp: {
              offset: CREATOR_ARRAY_START,
              bytes: firstCreatorAddress.toBase58(),
            },
          },
        ],
      },
    );
    if (metadataAccounts && Array.isArray(metadataAccounts)) {
      return metadataAccounts.map((metadataAccountInfo) => (
        base58.encode(metadataAccountInfo.account.data)
      ));
    }
    return [];
  }
  catch (err) {
    console.log(`getMintAddresses error:`, err);
    return [];
  }
  finally {

  }
};