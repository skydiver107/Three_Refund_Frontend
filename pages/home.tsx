import React, { Fragment, useEffect, useRef, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as anchor from '@project-serum/anchor';
import Countdown, { zeroPad, CountdownApi } from 'react-countdown';
import { PublicKey, Transaction, Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import {
  useConnection,
  useAnchorWallet,
  useWallet
} from '@solana/wallet-adapter-react';
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css'); // Default styles that can be overridden by your app

import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

import RoadMap from 'src/views/components/pages/RefundContainer/Roadmap';
import WalletIcon from 'src/views/components/base/SvgIcon/WalletIcon';
import FireArrowIcon from 'src/views/components/base/SvgIcon/FireArrowIcon';
import CheckIcon from 'src/views/components/base/SvgIcon/CheckIcon';
import { IDL } from "src/constants/IDL/refund";
import { PROGRAM_ID, TOTAL_SUPPLY } from "src/configs/config"
import { getProvider } from "src/helpers/getProvider";
import Footer from "src/views/components/pages/RefundContainer/Footer";

const Home = () => {
  const router = useRouter();

  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  let countdownStartApi: CountdownApi | null = null;
  let countdownEndApi: CountdownApi | null = null;
  const [showLoading, setShowLoading] = React.useState<boolean>(false);
  // For alert message
  const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>(``);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>(`success`);

  const [startTime, setStartTime] = useState<number>(new Date().getTime())
  const [endTime, setEndTime] = useState<number>(new Date().getTime())
  const [refundedCount, setRefundCount] = useState(0)
  const [totalSupply, setTotalSupply] = useState(1111)

  const setStartRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownStartApi = countdown.getApi();
    }
  };

  const setEndRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownEndApi = countdown.getApi();
    }
  };


  const closeMessage = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessageContent(``);
    setMessageSeverity(`success`)
    setIsShowMessage(false);
  };


  useEffect(() => {
    (async () => {
      if (!anchorWallet) return
      const provider: any = getProvider(connection, anchorWallet!);
      const program: any = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
      let [statisticPool] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("statistic")],
        new PublicKey(PROGRAM_ID)
      );

      const statisticPoolInfo = await connection.getAccountInfo(statisticPool);
      if (!statisticPoolInfo) {
        // setMamaBreedCount(0);
        return;
      }

      const getCount = await program.account.statistic.fetch(statisticPool)

      setRefundCount(getCount.refundedCount)
    })()
  }, [anchorWallet]);


  useEffect(() => {
    let start = 1657746000000
    // let start = 1659995350897
    setStartTime(start)
    countdownStartApi?.start();

  }, [startTime])

  useEffect(() => {
    let end = 1665500400217
    setEndTime(end)
    countdownEndApi?.start();
  }, [endTime])

  const startTimeRenderer = ({ api, formatted, completed }) => {
    const { days, hours, minutes, seconds } = formatted;
    if (api.isPaused()) api.start();

    return (
      <>
        {
          completed ?

            <Stack
              // direction={`row`}
              // alignItems={`center`}
              // justifyContent={`center`}
              sx={{
                mt: {
                  // ss: 3,
                  // sm: 6,
                  // md: 12
                },
                // pb: {
                //   ss: 8,
                //   sm: 12,
                //   md: 12
                // }
              }}
            >
              <Countdown
                ref={setEndRef}
                autoStart={true}
                date={endTime}
                zeroPadTime={2}
                renderer={endTimeRenderer}
                onComplete={handleCompleted}
              />
            </Stack>

            :
            <>
              <Stack
                direction={`row`}
                alignItems={`center`}
                justifyContent={`center`}
                sx={{
                  my: 6
                }}
              >
                {/* <Box className={`large-wallet-button-disable`}  >Connect </Box> */}
                <WalletMultiButton disabled className={`large-wallet-button-disabled`} startIcon={null} >CONNECT WALLET </WalletMultiButton>
              </Stack>
              <Stack
                direction={`row`}
                alignItems={`center`}
                justifyContent={`center`}
                sx={{
                  width: `auto`,
                  mx: `auto`
                }}
              >
                <Grid
                  container
                  direction={`row`}
                  alignItems={`center`}
                  justifyContent={`center`}
                  sx={{
                    zIndex: 7
                  }}
                >
                  <Grid
                    item
                    ss={2.7}
                    sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                  >
                    <Typography
                      variant={`h2`}
                      sx={{
                        fontFamily: `Gilmer`
                      }}
                    >
                      {zeroPad(days)}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    ss={0.35}
                    sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                  >
                    <Typography
                      variant={`h2`}
                      sx={{
                        fontFamily: `Gilmer`
                      }}
                    >
                      :
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    ss={2.7}
                    sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                  >
                    <Typography
                      variant={`h2`}
                      sx={{
                        fontFamily: `Gilmer`
                      }}
                    >
                      {zeroPad(hours)}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    ss={0.35}
                    sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                  >
                    <Typography
                      variant={`h2`}
                      sx={{
                        fontFamily: `Gilmer`
                      }}
                    >
                      :
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    ss={2.7}
                    sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                  >
                    <Typography
                      variant={`h2`}
                      sx={{
                        fontFamily: `Gilmer`
                      }}
                    >
                      {zeroPad(minutes)}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    ss={0.35}
                    sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                  >
                    <Typography
                      variant={`h2`}
                      sx={{
                        fontFamily: `Gilmer`
                      }}
                    >
                      :
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    ss={2.7}
                    sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                  >
                    <Typography
                      variant={`h2`}
                      sx={{
                        fontFamily: `Gilmer`
                      }}
                    >
                      {zeroPad(seconds)}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    ss={3}
                    sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                  >
                    <Typography
                      variant={`subtitle1`}
                      sx={{
                        fontFamily: `Gilmer`
                      }}
                    >
                      Days.
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    ss={3}
                    sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                  >
                    <Typography
                      variant={`subtitle1`}
                      sx={{
                        fontFamily: `Gilmer`
                      }}
                    >
                      Hrs.
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    ss={3}
                    sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                  >
                    <Typography
                      variant={`subtitle1`}
                      sx={{
                        fontFamily: `Gilmer`
                      }}
                    >
                      Mins.
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    ss={3}
                    sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                  >
                    <Typography
                      variant={`subtitle1`}
                      sx={{
                        fontFamily: `Gilmer`
                      }}
                    >
                      Secs.
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </>
        }
      </>

    )
  };

  const endTimeRenderer = ({ api, formatted, completed }) => {
    const { days, hours, minutes, seconds } = formatted;
    if (api.isPaused()) api.start();

    return (
      <>
        {
          completed ?
            <>
              <Typography
                variant={`subtitle2`}
                sx={{
                  fontFamily: `Gotham`,
                  mx: `auto`,
                  textAlign: `center`
                }}
              >
                TOTAL NFTs REFUNDED
              </Typography>

              <Typography
                variant={`subtitle2`}
                sx={{
                  fontFamily: `Gotham`,
                  mx: `auto`,
                  textAlign: `center`,
                  mt: 2
                }}
              >
                {refundedCount} / {TOTAL_SUPPLY}
              </Typography>
              <Stack
                direction={`row`}
                alignItems={`center`}
                justifyContent={`center`}
                sx={{
                  my: 3
                }}
              >
                {/* <Box className={`large-wallet-button-disable`}  >Connect </Box> */}
                <WalletMultiButton disabled className={`large-wallet-button-disabled`} startIcon={null} >CONNECT WALLET </WalletMultiButton>
              </Stack>
              <Grid
                item
                ss={0.35}
                sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
              >
                <Typography
                  variant={`h4`}
                  sx={{
                    fontFamily: `Gilmer`,
                    mt: 2
                  }}
                >
                  REFUND ENDED
                </Typography>
              </Grid>
            </>
            :
            anchorWallet ?
              <>
                <Typography
                  variant={`subtitle2`}
                  sx={{
                    fontFamily: `Gotham`,
                    mx: `auto`,
                    textAlign: `center`
                  }}
                >
                  TOTAL NFTs REFUNDED
                </Typography>

                <Typography
                  variant={`subtitle2`}
                  sx={{
                    fontFamily: `Gotham`,
                    mx: `auto`,
                    textAlign: `center`,
                    mt: 2
                  }}
                >
                  {refundedCount} / {TOTAL_SUPPLY}
                </Typography>

                <Box
                  sx={{
                    background: `#F8D8B0`,
                    color: `black`,
                    boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
                    borderRadius: `58px`,
                    fontFamily: `Gilmer`,
                    fontStyle: `normal`,
                    fontWeight: 700,
                    fontSize: `2.75rem`,
                    lineHeight: `48px`,
                    padding: `16px 96px`,
                    maxWidth: `fit-content`,
                    margin: `24px auto`,
                    cursor: `pointer`,
                    border: `3px solid #000000`
                  }}
                  onClick={() => router.push('/nfts')}
                >
                  REFUND
                </Box>
                <Stack
                  direction={`row`}
                  alignItems={`center`}
                  justifyContent={`center`}
                  sx={{
                    width: `auto`,
                    mx: `auto`
                  }}
                >
                  <Grid
                    container
                    direction={`row`}
                    alignItems={`center`}
                    justifyContent={`center`}
                    sx={{
                      zIndex: 7
                    }}
                  >
                    <Grid
                      item
                      ss={2.7}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        {zeroPad(days)}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={0.35}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        :
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={2.7}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        {zeroPad(hours)}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={0.35}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        :
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={2.7}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        {zeroPad(minutes)}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={0.35}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        :
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={2.7}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        {zeroPad(seconds)}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={3}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`subtitle1`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        Days.
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={3}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`subtitle1`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        Hrs.
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={3}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`subtitle1`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        Mins.
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={3}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`subtitle1`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        Secs.
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </>
              :
              <Stack
                direction={`column`}
                alignItems={`center`}
                justifyContent={`center`}
                sx={{
                  // mb: 6
                }}
              >
                <WalletMultiButton className={`large-wallet-button`} startIcon={null} >CONNECT WALLET </WalletMultiButton>
                <Stack
                  direction={`row`}
                  alignItems={`center`}
                  justifyContent={`center`}
                  sx={{
                    width: `auto`,
                    mx: `auto`,
                    mt: 3
                  }}
                >
                  <Grid
                    container
                    direction={`row`}
                    alignItems={`center`}
                    justifyContent={`center`}
                    sx={{
                      zIndex: 7
                    }}
                  >
                    <Grid
                      item
                      ss={2.7}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        {zeroPad(days)}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={0.35}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        :
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={2.7}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        {zeroPad(hours)}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={0.35}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        :
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={2.7}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        {zeroPad(minutes)}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={0.35}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        :
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={2.7}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`h2`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        {zeroPad(seconds)}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={3}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`subtitle1`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        Days.
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={3}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`subtitle1`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        Hrs.
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={3}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`subtitle1`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        Mins.
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      ss={3}
                      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
                    >
                      <Typography
                        variant={`subtitle1`}
                        sx={{
                          fontFamily: `Gilmer`
                        }}
                      >
                        Secs.
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>


        }
      </>
    )

  }

  const handleCompleted = () => {
    // alert('12121211')
  }

  return (
    <>
      <Box
        component={`section`}
        sx={{
          width: `100%`,
          position: `relative`
        }}
      >
        <Container
          component={`section`}
          maxWidth={`lg`}
          sx={{
            position: `relative`
          }}
        >
          <Stack
            direction={`row`}
            alignItems={`center`}
            justifyContent={`center`}
            sx={{
              py: {
                ss: 4,
                sm: 6,
                xl: 8,
              }
            }}
          >
            <Typography
              variant={`h2`}
              sx={{
                color: theme => theme.palette.neutral.main,
                fontFamily: `Eloquia Display`,
              }}
            >
              REFUND PROTOCOL
            </Typography>
          </Stack>

          <Container
            sx={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`,
              flexDirection: `row`,
              mx: `auto`
            }}
            maxWidth={`tg`}
          >
            <Grid
              container
              direction={`row`}
              alignItems={`center`}
              justifyContent={`space-between`}
            >
              <Grid item ss={12} sm={3} sx={{ display: `flex`, flexDirection: { ss: `column`, sm: `row` }, alignItems: `center`, justifyContent: `center` }}>
                <RoadMap
                  sx={{
                    width: {
                      ss: 184,
                      xs: 216,
                      sm: 176,
                      tm: 186,
                      md: 226,
                      lg: 239,
                      tg: 239,
                      xl: 256
                    },
                    height: {
                      ss: 184,
                      xs: 216,
                      sm: 176,
                      tm: 186,
                      md: 226,
                      lg: 239,
                      tg: 239,
                      xl: 256
                    }
                  }}
                >
                  <WalletIcon
                    sx={{
                      width: {
                        ss: 76,
                        xs: 120,
                        sm: 100,
                        md: 128,
                        lg: 128,
                        tg: 128,
                        xl: 128
                      },
                      height: {
                        ss: 76,
                        xs: 120,
                        sm: 120,
                        md: 128,
                        lg: 128,
                        tg: 128,
                        xl: 128
                      }
                    }}
                  />
                </RoadMap>

                <Typography
                  variant={`subtitle2`}
                  sx={{
                    fontFamily: `Gilmer`,
                    fontWeight: `bold`,
                    py: 3,
                    display: {
                      sm: `none`
                    }
                  }}
                >
                  1. CONNECT WALLET
                </Typography>
              </Grid>

              <Grid item ss={12} sm={1.5} sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}>
                {/* <RedArrow
                sx={{
                  width: `1280px`,
                  height: 64,
                  transform: {
                    ss: `rotate(90deg)`,
                    sm: `rotate(0)`
                  },
                  mb: {
                    ss: 3
                  }
                }}
              /> */}
                <Box
                  component={`img`}
                  src="images/blackarrow.png"
                  sx={{
                    width: 105,
                    height: 61,
                    transform: {
                      ss: `rotate(90deg)`,
                      sm: `rotate(0)`
                    },
                    mb: {
                      sm: 0,
                      ss: 3
                    }
                  }}
                />
              </Grid>

              <Grid item ss={12} sm={3} sx={{ display: `flex`, flexDirection: { ss: `column`, sm: `row` }, alignItems: `center`, justifyContent: `center` }}>
                <RoadMap
                  sx={{
                    width: {
                      ss: 184,
                      xs: 216,
                      sm: 176,
                      tm: 186,
                      md: 226,
                      lg: 239,
                      tg: 239,
                      xl: 256
                    },
                    height: {
                      ss: 184,
                      xs: 216,
                      sm: 176,
                      tm: 186,
                      md: 226,
                      lg: 239,
                      tg: 239,
                      xl: 256
                    }
                  }}
                >
                  <FireArrowIcon
                    sx={{
                      width: {
                        ss: 76,
                        xs: 120,
                        sm: 100,
                        md: 128,
                        lg: 128,
                        tg: 128,
                        xl: 128
                      },
                      height: {
                        ss: 76,
                        xs: 120,
                        sm: 120,
                        md: 128,
                        lg: 128,
                        tg: 128,
                        xl: 128
                      }
                    }}
                  />
                </RoadMap>

                <Typography
                  variant={`subtitle2`}
                  sx={{
                    fontFamily: `Gilmer`,
                    fontWeight: `bold`,
                    display: {
                      sm: `none`
                    },
                    py: 3
                  }}
                >
                  2. SELECT NFTs
                </Typography>
              </Grid>

              <Grid item ss={12} sm={1.5} sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}>
                {/* <RedArrow
                sx={{
                  width: 128,
                  height: 64,
                  transform: {
                    ss: `rotate(90deg)`,
                    sm: `rotate(0)`
                  },
                  mb: {
                    ss: 3
                  }
                }}
              /> */}
                <Box
                  component={`img`}
                  src="images/blackarrow.png"
                  sx={{
                    width: 105,
                    height: 61,
                    transform: {
                      ss: `rotate(90deg)`,
                      sm: `rotate(0)`
                    },
                    mb: {
                      sm: 0,
                      ss: 3
                    }
                  }}
                />
              </Grid>

              <Grid item ss={12} sm={3} sx={{ display: `flex`, flexDirection: { ss: `column`, sm: `row` }, alignItems: `center`, justifyContent: `center` }}>
                <RoadMap
                  sx={{
                    width: {
                      ss: 184,
                      xs: 216,
                      sm: 176,
                      tm: 186,
                      md: 226,
                      lg: 239,
                      tg: 239,
                      xl: 256
                    },
                    height: {
                      ss: 184,
                      xs: 216,
                      sm: 176,
                      tm: 186,
                      md: 226,
                      lg: 239,
                      tg: 239,
                      xl: 256
                    }
                  }}
                >
                  <CheckIcon
                    sx={{
                      width: {
                        ss: 76,
                        xs: 120,
                        sm: 100,
                        md: 128,
                        lg: 128,
                        tg: 128,
                        xl: 128
                      },
                      height: {
                        ss: 76,
                        xs: 120,
                        sm: 120,
                        md: 128,
                        lg: 128,
                        tg: 128,
                        xl: 128
                      }
                    }}
                  />

                </RoadMap>
                <Typography
                  variant={`subtitle2`}
                  sx={{
                    fontFamily: `Gilmer`,
                    fontWeight: `bold`,
                    display: {
                      sm: `none`
                    },
                    py: 3
                  }}
                >
                  3. PROCESS REFUND
                </Typography>
              </Grid>

              <Grid item ss={3} sx={{ display: { ss: `none`, sm: `flex` }, alignItems: `center`, justifyContent: `center`, zIndex: 7 }}>
                <Typography
                  variant={`subtitle2`}
                  sx={{
                    mt: 4,
                    fontFamily: `Gilmer`,
                    fontWeight: `bold`
                  }}
                >
                  1. CONNECT WALLET
                </Typography>
              </Grid>

              <Grid item ss={1.5} sx={{ display: { ss: `none`, sm: `flex` }, alignItems: `center`, justifyContent: `center` }}>

              </Grid>

              <Grid item ss={3} sx={{ display: { ss: `none`, sm: `flex` }, alignItems: `center`, justifyContent: `center`, zIndex: 7 }}>
                <Typography
                  variant={`subtitle2`}
                  sx={{
                    mt: 4,
                    fontFamily: `Gilmer`,
                    fontWeight: `bold`
                  }}
                >
                  2. SELECT NFTs
                </Typography>
              </Grid>

              <Grid item ss={1.5} sx={{ display: { ss: `none`, sm: `flex` }, alignItems: `center`, justifyContent: `center` }}>

              </Grid>

              <Grid item ss={3} sx={{ display: { ss: `none`, sm: `flex` }, alignItems: `center`, justifyContent: `center`, zIndex: 7 }}>
                <Typography
                  variant={`subtitle2`}
                  sx={{
                    mt: 4,
                    fontFamily: `Gilmer`,
                    fontWeight: `bold`
                  }}
                >
                  3. PROCESS REFUND
                </Typography>
              </Grid>
            </Grid>
          </Container>


          <Stack
            // direction={`row`}
            // alignItems={`center`}
            // justifyContent={`center`}
            sx={{
              mt: {
                ss: 3,
                sm: 6,
                md: 12
              },
              pb: {
                ss: 8,
                sm: 12,
                md: 12
              }
            }}
          >
            <Countdown
              ref={setStartRef}
              autoStart={true}
              date={startTime}
              zeroPadTime={2}
              renderer={startTimeRenderer}
              onComplete={handleCompleted}
            />
          </Stack>
        </Container>

        <Snackbar open={isShowMessage} autoHideDuration={5000} onClose={closeMessage} sx={{ zIndex: 9 }}>
          <Alert onClose={closeMessage} severity={messageSeverity} sx={{ width: '100%', zIndex: 9 }}>
            {messageContent}
          </Alert>
        </Snackbar>

        <Backdrop
          sx={{ color: '#000000', zIndex: 9 }}
          open={showLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Footer >

        </Footer>
      </Box>
      {/*  */}
    </>
  );
}

export default Home;