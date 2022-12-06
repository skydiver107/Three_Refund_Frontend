import React, { Fragment } from "react";

import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

import { SxProps, Theme } from '@mui/material/styles';

import ImageWrapper from 'src/views/components/base/ImageWrapper';
import WalletIcon from 'src/views/components/base/SvgIcon/WalletIcon';

import handleImageError from 'src/@utils/handleImageError';
import { Wallet } from "@project-serum/anchor";

interface Props {
  children?: any,
  sx?: SxProps<Theme>
}

const RoadMap = (props: Props) => {
  const linkRouter = useRouter();

  const isActive = (url: string) => {
    //used pathname before news category page.
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
        zIndex: 7
      }}
    >
      <Stack
        direction={`row`}
        alignItems={`center`}
        justifyContent={`center`}
        sx={{
          ...props?.sx,
          borderRadius: `50%`,
          border: theme => `solid 4px ${theme.palette.neutral.contrast}`,
          background: `#F0F6F6`
        }}
      >
        {
          props?.children
        }
      </Stack>
    </Stack>

  );
};

export default RoadMap;
