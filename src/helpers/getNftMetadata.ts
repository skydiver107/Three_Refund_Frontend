import { Connection, PublicKey } from '@solana/web3.js'
import * as borsh from 'borsh';

import { Metadata, METADATA_SCHEMA } from './schema';

const METADATA_PROGRAM_ID_PUBLIC_KEY = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
const METADATA_REPLACE = new RegExp('\u0000', 'g');

export async function decodeMetadata(buffer: Buffer) {
  const metadata = borsh.deserializeUnchecked(
    METADATA_SCHEMA,
    Metadata,
    buffer,
  );
  metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, '');
  metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, '');
  metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, '');
  return metadata;
}

export const getNftMetadata = async (uri: string) => {

  const result =
    await fetch(uri)
      .then(res => res.json())
      .catch(() => null)

  return result;
}