import { Theme, Options } from '@mui/material';
import { SxProps } from '@mui/system';

type AppId = string;
type MediaQuery = (queryInput: string | ((theme: Theme) => string), options?: Options) => boolean;

interface App {
  id: AppId;
  components: {
    toolbar: React.ElementType<ToolbarProps>;
    primary: React.ElementType<PrimaryProps>;
    secondary: React.ElementType<SecondaryProps>;
  },
  config: {
    mobile: {
      breakpoint: (theme: Theme, mediaQuery: MediaQuery) => boolean;
      drawerWidth: (theme: Theme, mediaQuery: MediaQuery) => string | number;
      toolbarHeight: number;
      main: SxProps;
      secondary: SxProps;
    },
    tablet: {
      breakpoint: (theme: Theme, mediaQuery: MediaQuery) => boolean;
      drawerWidth: (theme: Theme, mediaQuery: MediaQuery) => string | number;
      toolbarHeight: number;
      main: SxProps;
      secondary: SxProps;
    },
    desktop: {
      breakpoint: (theme: Theme, mediaQuery: MediaQuery) => boolean;
      drawerWidth: (theme: Theme, mediaQuery: MediaQuery) => string | number;
      toolbarHeight: number;
      main: SxProps;
      secondary: SxProps;
    }
  }
}

interface ToolbarProps {
}

interface PrimaryProps {

}
interface SecondaryProps {

}

export type { App, AppId, MediaQuery };
