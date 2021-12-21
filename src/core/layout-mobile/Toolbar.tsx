import { styled, Toolbar, ToolbarProps } from '@mui/material';

interface StyledToolbarProps extends ToolbarProps {
  toolbarheight: number;
}


const StyledToolbar = styled(Toolbar, {

})<StyledToolbarProps>(
  ({ toolbarheight }) => ({
    height: toolbarheight,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  }),
);

export default StyledToolbar;
