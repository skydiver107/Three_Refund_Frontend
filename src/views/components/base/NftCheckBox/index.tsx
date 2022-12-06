import React, { Fragment, useEffect, useRef, useState } from "react";

import Checkbox from "@mui/material/Checkbox";

import { SxProps, Theme } from '@mui/material/styles';

import CheckedIcon from 'src/views/components/base/SvgIcon/CheckedIcon';
import UnCheckedIcon from 'src/views/components/base/SvgIcon/UnCheckedIcon';
import handleImageError from "src/@utils/handleImageError";

interface ImageWrapperProps {
 children?: React.ReactNode,
 isChecked: boolean,
 sx?: SxProps<Theme>,
}

const NftCheckBox = (props: ImageWrapperProps) => {
 return (
  <Checkbox
   inputProps={{
    'aria-label': 'Nft Select'
   }}
   icon={<UnCheckedIcon />}
   checkedIcon={<CheckedIcon />}
   sx={{
    ...props.sx
   }}
   checked={props?.isChecked ? true : false}
  />
 )
}

export default NftCheckBox;