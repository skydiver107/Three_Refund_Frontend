import React, { Fragment } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { SxProps, Theme } from '@mui/material/styles';

import handleImageError from 'src/@utils/handleImageError';

interface Props {
  children?: React.ReactNode,
  sx?: SxProps<Theme>,
  selected?: number,
  solPrice: number,
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const NftsStatisticBar = (props: Props) => {
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
      direction={
        {
          ss: `column`,
          sm: `row`
        }
      }
      alignItems={`center`}
      justifyContent={`center`}
      sx={{
        ...props?.sx
      }}
      spacing={
        {
          ss: 1,
          sm: 4
        }
      }
    >
      <Box
        sx={{
          width: `84px`,
          border: theme => `solid 3px ${theme.palette.common.black}`,
          borderRadius: 2,
          textAlign: `center`,
          background: !props?.selected ? `repeating-linear-gradient(-45deg, #000000, #000000 4px, transparent 4px, transparent 8px)` : `none`,
          p: 0,
          display: { ss: `none`, sm: `block` }
        }}
      >
        <Typography
          variant={`subtitle1`}
          sx={{
            fontFamily: `Red Hat Display`,
            mx: `auto`,
            textAlign: `center`,
            lineHeight: 1.25,
          }}
        >
          {props?.selected || 0}
        </Typography>

      </Box>

      <Typography
        variant={`subtitle1`}
        sx={{
          color: theme => theme.palette.common.black,
          fontFamily: `Gilmer`,
          display: { ss: `none`, sm: `block` }
        }}
      >
        NFTs SELECTED :
      </Typography>

      <Typography
        variant={`subtitle1`}
        sx={{
          color: theme => theme.palette.common.black,
          fontFamily: `Red Hat Display`,
          display: { ss: `none`, sm: `block` }
        }}
      >
        <Box
          component={`img`}
          src={`/images/icons/solana.svg`}
          sx={{
            width: 24,
            height: 24,
            mb: -0.25
          }}
        />
        &nbsp;
        {(2 * props.solPrice).toFixed(1)}
      </Typography>

      <Stack
        direction={`row`}
        alignItems={`center`}
        justifyContent={`center`}
        spacing={
          {
            ss: 2,
          }
        }
        sx={{
          display: { sm: `none` }
        }}
      >
        <Box
          sx={{
            width: `112px`,
            border: theme => `solid 3px ${theme.palette.common.black}`,
            borderRadius: 2,
            textAlign: `center`,
            background: !props?.selected ? `repeating-linear-gradient(-45deg, #000000, #000000 4px, #FFFFFF 4px, #FFFFFF 8px)` : `none`,
            p: 0
          }}
        >
          <Typography
            variant={`subtitle1`}
            sx={{
              fontFamily: `Red Hat Display`,
              mx: `auto`,
              textAlign: `center`,
              lineHeight: 1.25
            }}
          >
            {props?.selected || 0}
          </Typography>

        </Box>

        <Typography
          variant={`subtitle1`}
          sx={{
            color: theme => theme.palette.common.black,
            fontFamily: `Gilmer`,
          }}
        >
          NFTs:
        </Typography>

        <Typography
          variant={`subtitle1`}
          sx={{
            color: theme => theme.palette.common.black,
            fontFamily: `Red Hat Display`,
          }}
        >
          <Box
            component={`img`}
            src={`/images/icons/solana.svg`}
            sx={{
              width: 20,
              height: 20,
              mb: -0.5
            }}
          />
          &nbsp;
          {(2 * props.solPrice).toFixed(1)}
        </Typography>
      </Stack>

      <Button
        sx={{
          background: theme => theme.palette.neutral.contrast,
          boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
          borderRadius: `32px`,
          height: {
            ss: 36,
            sm: 48
          },
          py: 0,
          px: 4,
          color: `#FDFDFD`,
          '&:disabled': {
            background: `#6B6B6B`,
            color: `#A9A9A9`
          },
          '&:hover': {
            background: `black`,
            color: `#FDFDFD`
          }
        }}
        disabled={!props?.selected}
        onClick={() => {
          props.onClick()
        }}
      >
        <Typography
          variant={`subtitle2`}
          sx={{
            fontFamily: `Gilmer`,
            fontWeight: `bold`
          }}
        >
          ISSUE REFUND
        </Typography>
      </Button>
    </Stack>
  );
};

export default NftsStatisticBar;
