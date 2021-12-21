import React from 'react';
import { Box, IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Portal from '../'
import logo from './logo/burger.png';


const PortalAppToolbar: React.FC<{}> = () => {
  const { actions, session } = Portal.useDrawer();

  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column">

      <Box display="flex" sx={{ backgroundColor: 'primary.main'}}>
        <Box sx={{ml:1}}> John Smith </Box>
        <Box flexGrow={1} />
        <Box sx={{mr:1}}>EN</Box>
      </Box>

      <Box display="flex" color="black" >
        <Box alignSelf="center"
          sx={{ color: 'primary.main', ml: 1 }}
          flexGrow={1}>
          <img src={logo} height="70px" width="70px" />
        </Box>
        
        <Box flexGrow={1} />

        <Box display="flex" alignSelf="center" sx={{mr: 1}} >
          <Box>
            <IconButton  sx={{color:"primary.main"}}>
              <PersonIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton  sx={{color:"primary.main"}} onClick={() => actions.handleDrawerOpen(!session.drawer)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PortalAppToolbar;