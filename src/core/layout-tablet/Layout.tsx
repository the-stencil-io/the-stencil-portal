import React from 'react';

import { Box, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import { styled } from "@mui/material/styles";

import StyledToolbar from './Toolbar';
import StyledAppBar from './Appbar';
import StyledDrawer from '../layout-calc/Drawer';

import { MediaQuery } from '../context/AppAPI';
import { useDrawer } from '../context/drawer/DrawerContext';
import { LayoutCalc } from '../layout-calc/LayoutCalc';


interface ContainerProps {
  main: React.ReactElement;
  secondary: React.ReactElement;
  toolbar: React.ReactElement;
  config: {
    drawerWidth: (theme: Theme, mediaQuery: MediaQuery) => string | number,
    toolbarHeight: number,
    main: SxProps,
    secondary: SxProps
  }
};


const StyledMain = styled("main")(() => ({
  width: "100%",
  height: "100%"
}));

const Container: React.FC<ContainerProps> = (components) => {
  const layout = useDrawer();
  const drawerOpen = layout.session.drawer;
  const { main, secondary, toolbar, config } = components;

  const mainWindow = React.useMemo(() => main, [main]);
  const secondaryWindow = React.useMemo(() => secondary, [secondary]);
  const toolbarWindow = React.useMemo(() => toolbar, [toolbar]);


  return (<LayoutCalc config={config} children={(styles) => (
    <>
      <StyledAppBar position="fixed">
        <StyledToolbar disableGutters toolbarHeight={components.config.toolbarHeight} sx={{ alignItems: 'self-start' }}>
          {toolbarWindow}
        </StyledToolbar>
      </StyledAppBar>

      <StyledDrawer variant="permanent" open={drawerOpen} drawerWidth={styles.drawerWidth}>
        <StyledToolbar disableGutters toolbarHeight={components.config.toolbarHeight} />
        {drawerOpen ? (<Box sx={styles.secondary}>{secondaryWindow}</Box>) : null}
      </StyledDrawer>

      <StyledMain>
        <StyledToolbar disableGutters toolbarHeight={components.config.toolbarHeight} />
        <Box sx={styles.main}>{mainWindow}</Box>
      </StyledMain>
    </>)
  } />);
}

export type { ContainerProps };
export { Container };
