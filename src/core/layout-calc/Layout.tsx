import React from 'react';

import { Box, SxProps } from '@mui/material';
import { styled } from "@mui/material/styles";

import StyledToolbar from './Toolbar';
import StyledAppBar from './Appbar';
import StyledDrawer from '../layout-calc/Drawer';

import { BreakpointConfig } from '../context/AppAPI';
import { useTopic } from '../context/site/useContext';
import { useDrawer } from '../context/drawer/DrawerContext';
import { LayoutCalc } from './LayoutCalc';


interface ContainerProps {
  main: React.ReactElement;
  secondary: React.ReactElement;
  toolbar: React.ReactElement;
  config: BreakpointConfig;
};

const StyledMain = styled("main")(() => ({
  width: "100%",
  height: "100%"
}));

const MainWindowContent: React.FC<{sx: SxProps, children: React.ReactNode}> = ({sx, children}) => {
  const topic = useTopic();
  const id = topic ? topic.id : "";
  
  return React.useMemo(() => (<Box key={id} sx={sx}>{children}</Box>), [sx, children, id]); 
}

const Container: React.FC<ContainerProps> = (components) => {
  const layout = useDrawer();
  const drawerOpen = layout.session.drawer;
  const { main, secondary, toolbar, config } = components;
//  const mainRef = React.useRef(); ref={mainRef}

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
        <MainWindowContent sx={styles.main}>{mainWindow}</MainWindowContent>
      </StyledMain>
    </>)
  } />);
}

export type { ContainerProps };
export { Container };
