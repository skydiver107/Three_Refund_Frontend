import React, { useMemo, useEffect, useState } from 'react';

import { IntlProvider } from 'react-intl';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux';
import { store, RootState } from 'redux/store'
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setTheme } from 'redux/slices/counterSlice';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import * as anchor from '@project-serum/anchor';
import * as web3 from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useAnchorWallet,
  useWallet
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css'); // Default styles that can be overridden by your app
import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import {
  WalletDialogProvider,
  WalletDialogButton,
} from "@solana/wallet-adapter-material-ui";

import { ThemeProvider } from '@mui/material';
import lightTheme from 'src/views/theme/lightTheme';
import darkTheme from 'src/views/theme/darkTheme';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

var localStorage = require('localStorage');

import NProgress from 'nprogress';
import '../public/css/nprogress.css';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import 'styles/global.css';

import RefundContainer from 'src/views/components/pages/RefundContainer';

export function Wrapper({ Component, pageProps }: any) {

  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: RootState) => state.isOwner.theme);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          root: { textTransform: 'capitalize' }
        }}
      />
      <RefundContainer>
        <Component {...pageProps} />
      </RefundContainer>
    </ThemeProvider>
  )

}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork;
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST;//useMemo(() => clusterApiUrl(network), []);
  const wallets = useMemo(
    () => [
      new SolanaMobileWalletAdapter({
        appIdentity: { name: 'Solana Wallet Adapter App' },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
      }),
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  React.useEffect(() => {
    const handleStart = (url: string) => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <ReduxProvider store={store}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Wrapper pageProps={pageProps} Component={Component}></Wrapper>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ReduxProvider>
  );
}
