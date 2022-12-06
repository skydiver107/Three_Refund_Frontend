import React from "react";

import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

import MagicEdenWhiteIcon from 'src/views/components/base/SvgIcon/MagicEdenWhiteIcon';


interface Props {
  children?: React.ReactNode
}

const NoNfts = (props: Props) => {
  const linkRouter = useRouter();
  const isActive = (url: string) => {
    return linkRouter.asPath.includes(url);
  };

  React.useEffect(() => {
    (async () => {

    })()
  }, []);

  return (
    <Stack
      direction={`column`}
      alignItems={`center`}
      justifyContent={`space-between`}
      sx={{
        pb: {
          ss: 28,
          sm: 22
        }
      }}
    >
      <Typography
        variant={`h4`}
        sx={{
          fontFamily: `Gotham`,
          color: theme => theme.palette.common.black,
          textAlign: `center`
        }}
      >
        No NFTs in your wallet :(
      </Typography>

      <Box
        component={`img`}
        src={`/images/assets/sunset.gif`}
        sx={{
          mx: `auto`,
          width: {
            ss: `100%`,
            sm: `360px`,
            tg: `444px`
          }
        }}
      />

      <Typography
        variant={`h4`}
        sx={{
          fontFamily: `Eloquia Display`,
          color: theme => theme.palette.common.black,
          textAlign: `center`,
          fontWeight: 700
        }}
      >
        BRIGHTEN UP YOUR DAY <br />
        BUY ONE TODAY
      </Typography>

      <Box
        component={`a`}
        href={`https://magiceden.io/marketplace/flippinrabbits`}
        target="_blank"
      >
        <Button
          sx={{
            display: `flex`,
            alignItems: `center`,
            height: {
              ss: 48,
              sm: 64
            },
            background: '#F8D8B0',
            border: `3px solid black`,
            boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
            borderRadius: `16px`,
            py: 0,
            px: 4,
            mt: 8,
            color: `black`,
            '&:disabled': {
              background: theme => theme.palette.neutral.grey
            },
            '&:hover': {
              background: `#f5b463`,
            }
          }}
        >
          <Typography
            variant={`subtitle2`}
            sx={{
              fontFamily: `Gilmer`,
              fontWeight: `bold`
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
  );
};

export default NoNfts;
