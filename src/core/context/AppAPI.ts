import { Theme, Options } from '@mui/material';
import { SxProps } from '@mui/system';
import { Topic, TopicLink, Site } from '../service';
import { SiteState } from './site/contextReducer';

type AppId = string;
type MediaQuery = (queryInput: string | ((theme: Theme) => string), options?: Options) => boolean;
type StyleQuery = (props: { drawerOpen: boolean }) => SxProps;

interface AppOverrides {
  setSite?: (state: SiteState, newSite: Site) => Site | undefined;
  setTopic?: (state: SiteState, topic: Topic) => Topic | undefined
  setTopicLink?: (state: SiteState, link: TopicLink) => TopicLink | undefined
}

interface App {
  id: AppId;
  components: {
    toolbar: React.ElementType<ToolbarProps>;
    primary: React.ElementType<PrimaryProps>;
    secondary: React.ElementType<SecondaryProps>;
  },
  config: {
    mobile: BreakpointConfig,
    tablet: BreakpointConfig,
    desktop: BreakpointConfig
  }
  overrrides?: AppOverrides
}

interface BreakpointConfig {
  breakpoint: (theme: Theme, mediaQuery: MediaQuery) => boolean;
  drawerWidth: (theme: Theme, mediaQuery: MediaQuery) => string | number;
  toolbarHeight: number;
  main: StyleQuery;
  secondary: StyleQuery;  
}

interface ToolbarProps {
}

interface PrimaryProps {

}
interface SecondaryProps {

}

export type { App, AppId, MediaQuery, StyleQuery, BreakpointConfig, AppOverrides };
