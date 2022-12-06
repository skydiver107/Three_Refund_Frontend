import React from "react";

import { useRouter } from "next/router";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface FooterProps {
  children: React.ReactNode
}

const Footer = (props: FooterProps) => {
  const linkRouter = useRouter();
  const isActive = (url: string) => {
    return linkRouter.asPath.includes(url);
  };

  React.useEffect(() => {
    (async () => {

    })()
  }, []);

  return (
    <AppBar
      position="relative"
      color="primary"
      sx={{
        top: 'auto',
        bottom: `0 !important`,
        background: `transparent`,
        py: 1.5,
        boxShadow: `none`,
        zIndex: 9
      }}
    >
      <Toolbar sx={{ minHeight: `auto !important` }}>
        <Typography
          variant={`body1`}
          sx={{
            color: theme => theme.palette.common.black,
            fontFamily: `Roboto`,
            mx: `auto`,
            fontWeight: 500
          }}
        >
          Ⓒ  {new Date().getFullYear()} Thre3. All Rights Reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
