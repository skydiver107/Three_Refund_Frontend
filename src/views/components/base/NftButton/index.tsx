import React, { Fragment, useEffect, useRef, useState } from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import { SxProps, Theme } from '@mui/material/styles';

import CheckedIcon from 'src/views/components/base/SvgIcon/CheckedIcon';
import UnCheckedIcon from 'src/views/components/base/SvgIcon/UnCheckedIcon';
import handleImageError from "src/@utils/handleImageError";

interface Props {
 children?: React.ReactNode,
 isChecked: boolean,
 sx?: SxProps<Theme>,
}

const NftCheckBox = (props: Props) => {
 return (
  <Button

  >
  </Button>
 )
}

export default NftCheckBox;