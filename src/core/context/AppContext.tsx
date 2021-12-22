import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import * as API from './AppAPI';

import { DrawerProvider } from './drawer/DrawerContext';
import { TabsProvider } from './tabs/TabsContext';
import { SecondaryProvider } from './secondary/SecondaryContext';
import { Container } from '../layout-desktop';
import { Mobile } from '../layout-mobile';


interface AppProviderProps {
  drawerOpen?: boolean;
  secondaryOpen?: string;
  children: API.App;
}

const CreateContainer: React.FC<{ app: API.App }> = ({ app }) => {
  const Main = React.useMemo(() => app.components.primary, [app]);
  const Secondary = React.useMemo(() => app.components.secondary, [app]);
  const Toolbar = React.useMemo(() => app.components.toolbar, [app]);
  const theme = useTheme();
  
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const medium = useMediaQuery(theme.breakpoints.down("md"));
  
  console.log(`portal: app container/layout Init: '${app.id}', small: ${small}, medium: ${medium}`);
  
  if(small) {
    return (<Mobile main={<Main />} secondary={<Secondary />} toolbar={<Toolbar />} config={app.config.mobile} />);
  } else if(medium) {
    
  }
  
  return (<Container main={<Main />} secondary={<Secondary />} toolbar={<Toolbar />} />);
}


const AppInit: React.FC<{ children: API.App }> = ({ children }) => {
  const app = children;

  console.log(`portal: app context init: '${app.id}'`);
  const container = React.useMemo(() => (<CreateContainer app={app} />), [app]);
  return (<>{container}</>);
}


const AppProvider: React.FC<AppProviderProps> = (props: AppProviderProps) => {
  const { id } = props.children;

  console.log("portal: App Provider Init");
  return (
    <DrawerProvider drawerOpen={props.drawerOpen}>
      <TabsProvider appId={id}>
        <SecondaryProvider appId={id} secondary={props.secondaryOpen}>
          <AppInit children={props.children} />
        </SecondaryProvider>
      </TabsProvider>
    </DrawerProvider>);
};

export type { AppProviderProps };
export { AppProvider };

