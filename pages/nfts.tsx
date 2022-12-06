import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import {
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";
import { Connection, Transaction } from "@solana/web3.js";
import {
  useConnection,
  useAnchorWallet,
  useWallet
} from '@solana/wallet-adapter-react';

require('@solana/wallet-adapter-react-ui/styles.css'); // Default styles that can be overridden by your app

import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import Grid from "@mui/material/Grid";
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

import MagicEdenWhiteIcon from 'src/views/components/base/SvgIcon/MagicEdenWhiteIcon';
import handleImageError from 'src/@utils/handleImageError';
import { getNftMetadata } from 'src/helpers/getNftMetadata'
import { signAndSendTransactions } from "src/helpers/connection";

import NoNfts from 'src/views/components/pages/RefundContainer/NoNfts';

import NftItem from 'src/views/components/pages/RefundContainer/NftItem';
import NftsStatisticBar from 'src/views/components/pages/RefundContainer/NftsStatisticBar';
import { MAKE_REFUND, CREATOR_ADDRESS } from 'src/configs/config'
import axios from "axios";
import { useRouter } from "next/router";
import { iteratorSymbol } from "immer/dist/internal";



const Home = () => {
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();
  const router = useRouter();

  const { connection } = useConnection();

  const [isShowModal, setIsShowModal] = React.useState(false);

  const [showLoading, setShowLoading] = React.useState<boolean>(false);
  // For alert message
  const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>(``);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>(`success`);

  const [nftLists, setNftLists] = useState<any[]>([])
  const [selectedNftCount, setSelectedNftCount] = useState(0)
  const [mintArray, setMintArray] = useState<any[]>([])
  const [txId, setTxID] = useState('')
  const [transactionId, setTransactionId] = useState('')

  const showModal = () => {
    setIsShowModal(true);
  };

  const hideModal = () => {
    setIsShowModal(false);
  };

  const closeMessage = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessageContent(``);
    setMessageSeverity(`success`)
    setIsShowMessage(false);
  };

  const handleRefund = async () => {

    setShowLoading(true)
    const newArr = mintArray.filter((item: any, idx: any) => item?.selected)
    const mintAddress: any[] = newArr.map((item: any) => item.mint)
    // console.log('nftlist', nftLists)
    // let newNftList = nftLists.filter((item: any) => item?.selected == false)
    // setNftLists([...newNftList])
    console.log('newArr', newArr)
    console.log('mintAddress', mintAddress)

    try {
      setShowLoading(true)
      const txs: any = await axios.post(`${MAKE_REFUND}/make-txs`, {
        user: wallet.publicKey.toBase58(),
        nfts: mintAddress
      })
      console.log('txs', txs)
      console.log('txs data', txs?.data.map((tx: any) => Transaction.from(tx?.data)));
      const result: any = await signAndSendTransactions(connection, wallet!, txs?.data.map((tx: any) => Transaction.from(tx?.data)));
      console.log('result', result)
      // for (let i = 0; i < result.length; i++) {
      //   if (result[i]?.slot !== 0) {

      //     const result_failed = result.map((item: any, idx: any) => {
      //       if (item?.slot === 0)
      //         return idx
      //     })

      //     console.log('result_failed', result_failed)

      //     const remain_failed = mintAddress.filter((item: any, idx: any) => {
      //       return result_failed.includes(idx)
      //     })


      //     console.log('remain_failed', remain_failed)
      //     let result_nft_remain: any[] = [];

      //     remain_failed.map((item: any) => {
      //       const obj = newArr.find((item2: any) => {
      //         return item === item2.mint
      //       })
      //       result_nft_remain.push(obj)
      //     })

      //     console.log('result_nft_remain', result_nft_remain)

      //     setTxID(result[0]?.txid.substr(0, 4) + '...' + result[0]?.txid.substr(result[0]?.txid.length - 4, 4))
      //     setTransactionId(result[0]?.txid)
      //     let newNftList = nftLists.filter((item: any) => item?.selected == false)
      //     setNftLists([...newNftList, ...result_nft_remain])
      //     setSelectedNftCount(0)
      //     showModal()
      //     setShowLoading(false)
      //   }
      // }

      if (result[0]?.txid) {
        let result_nft_remain: any[] = []

        for (let i = 0; i < result.length; i++) {
          if (result?.slot === 0) {
            result_nft_remain.push(newArr[i])
          }
        }

        console.log('result_nft_remain', result_nft_remain)

        setTxID(result[0]?.txid.substr(0, 4) + '...' + result[0]?.txid.substr(result[0]?.txid.length - 4, 4))
        setTransactionId(result[0]?.txid)
        let newNftList = nftLists.filter((item: any) => item?.selected == false)
        setNftLists([...newNftList, ...result_nft_remain])
        setSelectedNftCount(0)
        showModal()
        setShowLoading(false)
      }

      setShowLoading(false)

    } catch (error) {
      console.log('error', error)
      setShowLoading(false)

    }

  }

  const getCollectionControl = async () => {
    try {
      if (anchorWallet == undefined) return
      setShowLoading(true)

      let rpcHost: any = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST;
      let connection = new Connection(rpcHost);
      const nftArray = await Promise.all([

        getParsedNftAccountsByOwner({
          publicAddress: wallet.publicKey.toString(),
          connection,
        })
      ]
      )

      /* Get hashList from creatorAdddress */

      // const getCollection = await getMintAddresses(new PublicKey(CREATOR_ADDRESS), connection)
      // console.log('getCollection', getCollection)

      //----------------------------------

      const newArr = nftArray[0].filter((item: any, idx: any) => {
        return item?.data?.creators[0].address === CREATOR_ADDRESS
      })

      let values = await Promise.all(newArr.map((item: any) => {
        let meta: any = getNftMetadata(item.data.uri);
        return meta
      }))

      const newRes = newArr.map((item: any, idx: any) => {
        return { ...item, metadata: values[idx], selected: false }
      })
      setMintArray([...newRes])
      // setNftLists([...newRes.map((item) => { return { ...item, selected: false } })])
      setNftLists([...newRes])
      setShowLoading(false)

    } catch (error) {
      console.log("Error thrown, while fetching NFTs", error.message);
    }
  }

  useEffect(() => {
    (async () => {
      await getCollectionControl()
    })()
  }, [wallet]);

  useEffect(() => {
    (async () => {

      console.log('connected', wallet.connected, 'connecting', wallet.connecting)
      if (!wallet?.connected && !wallet?.connecting) {
        // router.push('/home')
        // setShowLoading(false)
      }
    })()
  }, [anchorWallet]);


  return (
    <Box
      component={`section`}
      sx={{
        width: `100%`,
        position: `relative`,
      }}
    >
      <Container
        component={`section`}
        maxWidth={`lg`}
        sx={{
          px: {
            ss: `20px !important`,
            sm: `48px !important`,
            md: `64px !important`,
          }
        }}
      >
        <Stack
          direction={`row`}
          alignItems={`center`}
          justifyContent={`center`}
          sx={{
            pb: {
              ss: 4,
              sm: 4
            }
          }}
        >
          <Typography
            variant={`h2`}
            sx={{
              fontFamily: `Eloquia Display`
            }}
          >
            REFUND PROTOCOL
          </Typography>
        </Stack>

        <Typography
          variant={`subtitle2`}
          sx={{
            fontFamily: `Gilroy`,
            mb: 2,
            textAlign: `center`,
            fontSize: `32px`,
            fontWeight: 600,
            textTransform: `uppercase`
          }}
        >
          {
            nftLists.length > 0 && `Select your NFTs`
          }
        </Typography>

        {
          true &&
          <Grid
            container
            direction={`row`}
            alignItems={`center`}
            spacing={{
              ss: 3,
              sm: 4,
              md: 6,
              xl: 4
            }}
            sx={{
              mt: `0 !important`,
              pb: {
                ss: 20,
                sm: 18
              }
            }}
          >
            {
              nftLists.map((nft: any, index: number) => {
                return (
                  <Grid
                    item
                    ss={12}
                    xs={6}
                    sm={6}
                    md={4}
                    xl={3}
                    sl={3}
                    key={index}
                    sx={{
                      pt: `0px !important`,
                      pb: `26px !important`,
                      transition: `all 0.3s`,
                      '&:hover': {
                        cursor: `pointer`,
                        transform: `scale(1.03)`
                      }
                    }}
                  >
                    <NftItem
                      isChecked={false}
                      onClick={() => {
                      }}
                      nftItem={nft}
                      index={index}
                      nftImg={nft?.metadata?.image}
                      nftName={nft?.metadata?.name}
                      nftList={nftLists}
                      setNftLists={setNftLists}
                      selectedNftCount={selectedNftCount}
                      setSelectedNftCount={setSelectedNftCount}
                      setMintArray={setMintArray}
                    >

                    </NftItem>
                  </Grid>
                )
              })
            }
          </Grid>
        }


        {
          nftLists.length == 0 &&
          <NoNfts />
        }

      </Container>

      <NftsStatisticBar
        sx={{
          position: `fixed`,
          background: `#F8D8B0`,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 9,
          py: 1.5
        }}
        onClick={
          () => {
            handleRefund()
          }
        }
        selected={selectedNftCount}
        solPrice={selectedNftCount}
      >

      </NftsStatisticBar>

      <Dialog
        open={isShowModal}
        onClose={hideModal}
        sx={{
          '& .MuiPaper-root': {
            background: theme => `none`,
            borderRadius: 8,
            width: 516,
            maxHeight: `84vh`
          }
        }}
      >
        <Stack
          direction={`column`}
          alignItems={`center`}
          justifyContent={`space-between`}
          sx={{
            position: `relative`,
            px: {
              ss: 2,
              sm: 4
            },
            background: `#F2ECDF`,
            borderRadius: 8,
            overflow: `unset !important`
          }}
        >
          <CloseIcon
            sx={{
              position: `absolute`,
              right: `16px`,
              top: `16px`,
              cursor: `pointer`
            }}
            onClick={hideModal}
          />

          <Box sx={{
            width: `216px`,
            height: `216px`
          }} >
            <Box
              component={`img`}
              src={`/images/assets/rain.gif`}
              sx={{
                width: `100%`,
                mx: `auto`
              }}
            />
          </Box>

          <Typography
            variant={`h4`}
            sx={{
              color: theme => theme.palette.common.black,
              fontFamily: `Gotham`,
              textAlign: `center`
            }}
          >
            You’ll be missed
          </Typography>

          <Typography
            variant={`body1`}
            sx={{
              color: theme => theme.palette.common.black,
              fontFamily: `Gotham`,
              mt: 2,
              textAlign: `center`
            }}
          >
            It’s quite unfortunate to see you leaving us!
          </Typography>

          <Typography
            variant={`body1`}
            sx={{
              color: theme => theme.palette.common.black,
              fontFamily: `Gotham`,
              textAlign: `center`
            }}
          >
            You can track your refund transaction at:
          </Typography>

          <Typography
            variant={`body1`}
            sx={{
              color: theme => theme.palette.common.black,
              fontFamily: `Gotham`,
              fontWeight: `bold`,
              mt: 3,
              textAlign: `center`
            }}
          >
            TRANSACTION ID
          </Typography>
          <a
            href={`https://solscan.io/tx/${transactionId}?cluster=${process.env.NEXT_PUBLIC_SOLANA_NETWORK}`}
            target="blank"
          >
            <Typography
              variant={`body1`}
              sx={{
                fontFamily: `Gotham`,
                mt: 2,
                color: `#59A7E1`,
                textDecoration: `underline`,
                textAlign: `center`
              }}
            >
              {txId}
            </Typography>
          </a>
          <Typography
            variant={`body1`}
            sx={{
              color: theme => theme.palette.common.black,
              fontFamily: `Gotham`,
              mt: 2,
              textAlign: `center`
            }}
          >
            In case you change your mind, feel free to
            come back
          </Typography>
          <Box
            component={`a`}
            href={`https://magiceden.io/marketplace/flippinrabbits`}
            target="_blanks"
          >
            <Button
              sx={{
                display: `flex`,
                alignItems: `center`,
                height: {
                  ss: 36,
                  sm: 48
                },
                background: `#F8D8B0`,
                boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
                borderRadius: `16px`,
                py: 0,
                px: 4,
                mt: 3,
                mb: 4,
                border: `3px solid black`,
                color: 'black',
                '&:disabled': {
                  background: theme => theme.palette.neutral.grey
                },
                '&:hover': {
                  background: `#f5b463`
                }
              }}
            >
              <Typography
                variant={`subtitle2`}
                sx={{
                  fontFamily: `Gilmer`,
                  fontWeight: `bold`,
                  textAlign: `center`
                }}
              >
                BUY NOW FROM&nbsp;
              </Typography>
              <MagicEdenWhiteIcon
                sx={{
                  width: 38,
                  height: 38,
                  mt: 0.5
                }}
              />
            </Button>
          </Box>

        </Stack>
      </Dialog>

      <Snackbar open={isShowMessage} autoHideDuration={5000} onClose={closeMessage} sx={{ zIndex: 9 }}>
        <Alert onClose={closeMessage} severity={messageSeverity} sx={{ width: '100%', zIndex: 9 }}>
          {messageContent}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: '#00e7ffb8', zIndex: 9 }}
        open={showLoading}
      >
        <CircularProgress color="inherit" sx={{ width: '70px', height: '70px' }} />
      </Backdrop>
    </Box>
  );
}

export default Home;