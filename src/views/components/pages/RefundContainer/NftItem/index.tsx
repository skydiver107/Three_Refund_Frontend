import React, { MouseEvent } from "react";
require('@solana/wallet-adapter-react-ui/styles.css'); // Default styles that can be overridden by your app
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from '@mui/material/styles';

import NftCheckBox from 'src/views/components/base/NftCheckBox';
import ImageWrapper from 'src/views/components/base/ImageWrapper';

interface Props {
  children?: React.ReactNode,
  sx?: SxProps<Theme>,
  isChecked?: boolean,
  nftItem: any,
  index: any,
  nftImg: string,
  nftName: string,
  nftList: any[],
  setNftLists: any,
  selectedNftCount: number,
  setSelectedNftCount: any,
  setMintArray: any
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const NftItem = (props: Props) => {

  const handleChecked = () => {
    const result = props.nftList.map((item: any, idx: any) => {

      return props.index === idx ? {
        ...item, selected: !item?.selected
      } : item
    }

    )
    props.setNftLists([...result])

    if (result[props.index]?.selected) {
      props.setSelectedNftCount(props.selectedNftCount + 1);

    } else {
      props.setSelectedNftCount(props.selectedNftCount - 1);

    }

    const res = result.filter((item) => {
      return item?.selected === true
    })
    props.setMintArray([...res])
  }


  return (
    <Box
      component={`div`}
      sx={{
        border: props.nftItem?.selected ? theme => `solid 8px ${theme.palette.neutral.contrast}` : theme => `solid 8px ${theme.palette.common.white}`,
        borderRadius: `10px`,
        width: '100%',
      }}
      onClick={() => {
        handleChecked()
        // setChecked(!checked)
      }}
    >
      <Box
        component={`div`}
        sx={{
          background: theme => theme.palette.background.default,
          position: `relative`,
          border: theme => `solid 8px ${theme.palette.common.white}`,
          width: '100%',
          height: `100%`,
          paddingBottom: `calc(100% - 16px - 16px)`
        }}
      >
        <Box
          sx={{
            width: `100%`,
            height: `100%`,
            position: `absolute`,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <ImageWrapper
            src={props.nftImg} height={`calc(100% - 8px - 8px)`}
          />
        </Box>

        <Box
          sx={{
            position: `absolute`,
            background: theme => theme.palette.background.default,
            borderTopRightRadius: `10px`,
            width: `48%`,
            bottom: 0,
            left: 0,
            px: 0
          }}
        >
          <Typography
            variant={`subtitle2`}
            sx={{
              fontFamily: `Red Hat Display`,
              mx: `auto`,
              textAlign: `center`,
              py: 0.75
            }}
          >
            #{props?.nftName?.split('#')[1]}
          </Typography>
        </Box>

        <NftCheckBox
          sx={{
            position: `absolute`,
            top: 1,
            right: 1,
            mx: `auto`,
            textAlign: `center`
          }}
          isChecked={props.nftItem?.selected}
        />
      </Box>
    </Box>
  );
};

export default NftItem;
