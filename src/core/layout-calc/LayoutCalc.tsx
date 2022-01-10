import React from 'react';

import { CssBaseline, Box, Theme, useMediaQuery, useTheme } from '@mui/material';
import { SxProps } from '@mui/system';

import { MediaQuery } from '../context/AppAPI';
import { useDrawer } from '../context/drawer/DrawerContext';


interface LayoutCalcProps {
  config: {
    drawerWidth: (theme: Theme, mediaQuery: MediaQuery) => string | number,
    toolbarHeight: number,
  },
  children: (props: { secondary: SxProps, main: SxProps, drawerWidth: string | number }) => React.ReactNode
}

const LayoutCalc: React.FC<LayoutCalcProps> = ({ config, children }) => {

  const layout = useDrawer();
  const drawerOpen = layout.session.drawer;
  const theme = useTheme();

  // style calcs  
  const drawerWidth = React.useMemo(() => config.drawerWidth(theme, useMediaQuery), [theme, useMediaQuery, config.drawerWidth]);
  const main: SxProps = React.useMemo(() => {
    if (drawerOpen) {
      return { flexGrow: 1, overflow: "auto", height: `calc(100vh - ${config.toolbarHeight}px)`, width: `calc(100vw - ${drawerWidth})` };
    }
    return { flexGrow: 1, overflow: "auto", height: `calc(100vh - ${config.toolbarHeight}px)` };
  }, [drawerOpen, config.toolbarHeight, drawerWidth])

  const secondary: SxProps = React.useMemo(() => ({ width: drawerWidth, height: "100%" }), [drawerWidth]);
  const contents = React.useMemo(() => children({ main, secondary, drawerWidth}), [main, secondary, drawerWidth]);

  return (<Box sx={{ display: 'flex', height: "100vh" }}>
    <CssBaseline />
    {contents}
  </Box>);
}

export { LayoutCalc, LayoutCalcProps };