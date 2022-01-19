import React from 'react';

import { Box } from '@mui/material';
import { styled } from "@mui/material/styles";

import StyledToolbar from './Toolbar';
import StyledAppBar from './Appbar';
import StyledDrawer from '../layout-calc/Drawer';

import { BreakpointConfig, ToolbarProps, PrimaryProps, SecondaryProps } from '../context/AppAPI';
import { useDrawer } from '../context/drawer/DrawerContext';
import { LayoutCalc, LayoutCalcCallbackProps } from './LayoutCalc';


interface ContainerProps {
  toolbar: React.ElementType<ToolbarProps>;
  primary: React.ElementType<PrimaryProps>;
  secondary: React.ElementType<SecondaryProps>;
  config: BreakpointConfig;
};

const StyledMain = styled("main")(() => ({
  width: "100%",
  height: "100%"
}));

const ContainerComponents: React.FC<{ components: ContainerProps, calc: LayoutCalcCallbackProps }> = ({ components, calc }) => {
  const layout = useDrawer();
  const drawerOpen = layout.session.drawer;
  const { 
    primary: Primary, 
    secondary: Secondary,
    toolbar: Toolbar 
  } = components;
  
  const {main} = calc;

  const primaryWindow = React.useMemo(() => <Primary sx={main}/>, [Primary, main]);
  const secondaryWindow = React.useMemo(() => <Secondary />, [Secondary]);
  const toolbarWindow = React.useMemo(() => <Toolbar />, [Toolbar]);


  return (<>
    <StyledAppBar position="fixed">
      <StyledToolbar disableGutters toolbarHeight={components.config.toolbarHeight} sx={{ alignItems: 'self-start' }}>
        {toolbarWindow}
      </StyledToolbar>
    </StyledAppBar>

    <StyledDrawer variant="permanent" open={drawerOpen} drawerWidth={calc.drawerWidth}>
      <StyledToolbar disableGutters toolbarHeight={components.config.toolbarHeight} />
      {drawerOpen ? (<Box sx={calc.secondary}>{secondaryWindow}</Box>) : null}
    </StyledDrawer>

    <StyledMain>
      <StyledToolbar disableGutters toolbarHeight={components.config.toolbarHeight} />
      {primaryWindow}
    </StyledMain>
  </>)
}

const Container: React.FC<ContainerProps> = (components) => {
  const { config } = components;
  return (<LayoutCalc config={config} children={(calc) => <ContainerComponents calc={calc} components={components} />} />);
}

export type { ContainerProps };
export { Container };
