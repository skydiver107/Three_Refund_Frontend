import React, { Fragment, useState, useEffect } from "react";

import { Router, useRouter } from "next/router";

import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css'); // Default 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/material/Menu";
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from "@mui/icons-material/Menu";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

import ImageWrapper from 'src/views/components/base/ImageWrapper';
import DiscordIcon from 'src/views/components/base/SvgIcon/DiscordIcon';
import TwitterIcon from 'src/views/components/base/SvgIcon/TwitterIcon';
import MagicEdenIcon from 'src/views/components/base/SvgIcon/MagicEdenIcon';
import WalletIcon from 'src/views/components/base/SvgIcon/WalletIcon';

import handleImageError from 'src/@utils/handleImageError';
import Countdown, { CountdownApi } from "react-countdown";

interface HeaderProps {
  children?: any
}

const Header = (props: HeaderProps) => {
  const linkRouter = useRouter();

  let countdownStartApi: CountdownApi | null = null;
  let countdownEndApi: CountdownApi | null = null;
  const [startTime, setStartTime] = useState<number>(new Date().getTime())
  const [endTime, setEndTime] = useState<number>(new Date().getTime())
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const startTimeRender = ({ api, formatted, completed }) => {
    const { days, hours, minutes, seconds } = formatted;
    if (api.isPaused()) api.start();

    return (
      <>
        {
          completed ?
            <Countdown
              ref={setEndRef}
              autoStart={true}
              date={endTime}
              zeroPadTime={2}
              renderer={endTimeRender}
            />
            : <WalletMultiButton
              disabled
              startIcon={
                <WalletIcon sx={{ width: 24, height: 24 }} />
              }
              className={`wallet-button`}
            />
        }
      </>
    )
  }

  const endTimeRender = ({ api, formatted, completed }) => {
    const { days, hours, minutes, seconds } = formatted;
    if (api.isPaused()) api.start();
    return (
      <>
        {
          completed ? <WalletMultiButton
            startIcon={
              <WalletIcon sx={{ width: 24, height: 24 }} />
            }
            className={`wallet-button`}
          /> : <WalletMultiButton
            startIcon={
              <WalletIcon sx={{ width: 24, height: 24 }} />
            }
            className={`wallet-button`}
          />
        }
      </>
    )

  }

  return (
    <Box
      sx={{
        boxShadow: `none`,
        // background: `url('/images/background.svg')`,
        background: `transparent`,
        backgroundPosition: `center`,
        backgroundSize: `cover`,
        // backgroundRepeat: `repeat`,
        zIndex: 9
      }}
    >
      <Toolbar>
        <Container
          maxWidth={`lg`}
        >
          <Stack
            direction={`row`}
            alignItems={`center`}
            justifyContent={`space-between`}
            sx={{
              py: {
                ss: 1,
                sm: 2
              }
            }}
          >
            <Stack
              direction={`row`}
              alignItems={`center`}
              justifyContent={`space-between`}
            >
              <Box
                component={`img`}
                src={`/images/logo.svg`}
                sx={{
                  width: {
                    ss: 76,
                    ts: 84,
                    sm: 108,
                    md: 116,
                    td: 128
                  },
                  height: `auto`,
                  '&:hover': {
                    cursor: `pointer`
                  }
                }}
                onClick={() => {
                  linkRouter.push(`/home`)
                }}
              />
            </Stack>

            <Stack
              direction={`row`}
              alignItems={`center`}
              justifyContent={`space-between`}
              spacing={{
                ss: 0,
                xs: 1,
                sm: 3
              }}
            >
              <IconButton aria-label="delete" sx={{ display: { ss: `none`, sm: `inline-flex` } }}>
                <a href='https://discord.gg/XhvmdVeqys' target='_blank' ><DiscordIcon /></a>
              </IconButton>

              <IconButton aria-label="delete" sx={{ display: { ss: `none`, sm: `inline-flex` } }}>
                <a href='https://twitter.com/Thre3Art' target='_blank' ><TwitterIcon /></a>
              </IconButton>

              <IconButton aria-label="delete" sx={{ display: { ss: `none`, sm: `inline-flex` } }}>
                <a href='https://magiceden.io/marketplace/thre3' target='_blank' ><MagicEdenIcon /></a>
              </IconButton>

              <Countdown
                ref={setStartRef}
                autoStart={true}
                // date={Date.now() + currentTime}
                date={startTime}
                zeroPadTime={2}
                renderer={startTimeRender}
              />


              <Box>
                <IconButton edge="end" aria-label="menu"
                  sx={{
                    display: {
                      sm: `none`
                    },
                    color: theme => theme.palette.common.black
                  }}
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    handleMenu(event)
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{
                    '& .MuiList-root': {
                      background: theme => theme.palette.background.default
                    }

                  }}
                >
                  <MenuItem
                    sx={{
                      background: theme => theme.palette.background.default
                    }}
                  >
                    <WalletMultiButton
                      startIcon={
                        <WalletIcon sx={{ width: 24, height: 24 }} />
                      }
                      className={`mobile-wallet-button`}
                    />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <IconButton aria-label="delete">
                      <DiscordIcon />
                    </IconButton>

                    <Typography
                      variant={`subtitle2`}
                      sx={{ color: theme => theme.palette.common.black }}
                    >
                      Discord
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                    <IconButton aria-label="delete" >
                      <TwitterIcon />
                    </IconButton>
                    <Typography
                      variant={`subtitle2`}
                      sx={{ color: theme => theme.palette.common.black }}
                    >
                      Twitter
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                    <IconButton aria-label="delete">
                      <MagicEdenIcon />
                    </IconButton>
                    <Typography
                      variant={`subtitle2`}
                      sx={{ color: theme => theme.palette.common.black }}
                    >
                      Magic Eden
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </Box>
  );
};

export default Header;
