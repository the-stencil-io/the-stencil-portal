import React from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Portal from '../../'
import burger from './burger.png';

//import {} from '../../context'
import { Locale } from './Locale';




const Logo: React.FC<{}> = () => {
  
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const medium = useMediaQuery(theme.breakpoints.down("md"));
  
  if(small) {
    return (<img src={burger} height="70px" width="70px" />);
  } else if(medium) {
    
  }
  
  
  return (
    <img src={burger} height="120px" width="120px" />
  )
}

export {Logo};