import { CSSObject, styled, Drawer, Theme, DrawerProps } from '@mui/material';

interface StyledDrawerProps extends DrawerProps {
  drawerWidth: number;
}


const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
  width: drawerWidth - 1,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: "0px",
  visibility: 'hidden'
});


const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<StyledDrawerProps>(
  ({ theme, open, drawerWidth }) => ({
    width: drawerWidth - 1,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme, drawerWidth),
      '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default StyledDrawer;
