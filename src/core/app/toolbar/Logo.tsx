import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

import burger from './burger.png';

//import {} from '../../context'


const Logo: React.FC<{}> = () => {
  
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const medium = useMediaQuery(theme.breakpoints.down("md"));
  
  if(small) {
    return (<img src={burger} height="70px" width="80px" />);
  } else if(medium) {
    return (<img src={burger} height="100" width="120" />)
  }
    
  return (
    <img src={burger} height="120px" width="150px" />
  )
}

export {Logo};