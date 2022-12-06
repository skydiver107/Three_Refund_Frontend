import React, { Fragment } from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from '@mui/material/Fab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import handleImageError from "src/@utils/handleImageError";

import Header from "./Header";
import Footer from "./Footer";
import ScrollTop from 'src/views/components/pages/RefundContainer/ScrollTop';
interface ContainerProps {
  children: React.ReactNode
}

const RefundContainer = (props: ContainerProps) => {
  const linkRouter = useRouter();

  const isActive = (url: string) => {
    return linkRouter.asPath.includes(url);
  };

  React.useEffect(() => {
    (async () => {

    })()
  }, []);

  return (
    <Box
      component={`main`}
      sx={{
        width: `100%`,
        minHeight: `100vh`,
        position: `relative`,
        // background: `url('/images/background.svg')`,
        // background: `#F2ECDF`,
        backgroundPosition: `center`,
        backgroundSize: `contain`,
        backgroundRepeat: `repeat`
      }}
    >
      <Header>

      </Header>
      {/* <Toolbar id="back-to-top-anchor" sx={{ p: 0, m: 0, height: 0 }} /> */}

      <Box
        component={`section`}
        sx={{
          width: `100%`,
          height: `fit-content`,
          pt: 2
        }}
      >
        {props.children}
      </Box>
      {/* <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop> */}

      <Toolbar sx={{ minHeight: `auto !important`, py: 0 }}>
        <Typography
          variant={`body2`}
          sx={{
            color: theme => theme.palette.common.black,
            fontFamily: `Roboto`,
            mx: `auto`
          }}
        >
        </Typography>
      </Toolbar>

      {
        isActive(`home`) && <Box
          component={`img`}
          src={`/images/assets/machine.svg`}
          sx={{
            width: {
              ss: 0,
              sm: 216,
              md: 224,
              td: 248,
              lg: 264,
              tg: 284
            },
            height: `auto`,
            position: `absolute`,
            bottom: 54,
            right: 16
          }}
        />
      }

    </Box>
  );
};

export default RefundContainer;
