import React from 'react';

import { CssBaseline, Box, useMediaQuery, useTheme } from '@mui/material';
import { SxProps } from '@mui/system';

import { BreakpointConfig } from '../context/AppAPI';
import { useDrawer } from '../context/drawer/DrawerContext';


interface LayoutCalcProps {
  config: BreakpointConfig,
  children: (props:
    {
      secondary: SxProps, 
      main: SxProps,
      drawerWidth: string | number
    }) => React.ReactNode
}

const LayoutCalc: React.FC<LayoutCalcProps> = ({ config, children }) => {

  const layout = useDrawer();
  const drawerOpen = layout.session.drawer;
  const theme = useTheme();


  // style calcs  
  const drawerWidth = React.useMemo(() => config.drawerWidth(theme, useMediaQuery), [theme, useMediaQuery, config.drawerWidth]);
  const main: SxProps = React.useMemo(() => {
    if (drawerOpen) {
      return Object.assign({ 
        flexGrow: 1, 
        height: `calc(100vh - ${config.toolbarHeight}px)`, 
        width: `calc(100vw - ${typeof drawerWidth === 'number' ? drawerWidth + 'px' : drawerWidth})` 
      }, config.main({drawerOpen}));
    }
    return Object.assign({ flexGrow: 1, height: `calc(100vh - ${config.toolbarHeight}px)` }, config.main({drawerOpen}));
  }, [drawerOpen, config.toolbarHeight, drawerWidth, config.main])

  const secondary: SxProps = React.useMemo(() => Object.assign({ width: drawerWidth, height: `calc(100vh - ${config.toolbarHeight}px)` }, config.secondary({drawerOpen})), [drawerWidth, config.secondary, drawerOpen]);
  const contents = React.useMemo(() => children({ main, secondary, drawerWidth }), [main, secondary, drawerWidth]);

  return (<Box sx={{ display: 'flex', height: "100vh" }}>
    <CssBaseline />
    {contents}
  </Box>);
}

export { LayoutCalc, LayoutCalcProps };
