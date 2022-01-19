import React from 'react';

import * as API from './AppAPI';

import { BreakpointProvider, useBreakpoint } from './breakpoint/BreakpointContext';
import { DrawerProvider } from './drawer/DrawerContext';
import { TabsProvider } from './tabs/TabsContext';
import { SecondaryProvider } from './secondary/SecondaryContext';
import { Container } from '../layout-calc/Layout';


interface AppProviderProps {
  drawerOpen?: boolean;
  secondaryOpen?: string;
  children: API.App;
}

const CreateContainer: React.FC<{ app: API.App }> = ({ app }) => {
  const Main = React.useMemo(() => app.components.primary, [app]);
  const Secondary = React.useMemo(() => app.components.secondary, [app]);
  const Toolbar = React.useMemo(() => app.components.toolbar, [app]);
  const mode = useBreakpoint();

  // example
  //import { useMediaQuery, useTheme, Theme } from '@mui/material';
  //const small = useMediaQuery(theme.breakpoints.down("sm"));
  //const medium = useMediaQuery(theme.breakpoints.down("md"));

  console.log(`portal: app container/layout Init: '${app.id}', mode: ${mode}`);

  if (mode === 'MOBILE') {
    return (<Container main={<Main />} secondary={<Secondary />} toolbar={<Toolbar />} config={app.config.mobile} />);
  } else if (mode === "TABLET") {
    return (<Container main={<Main />} secondary={<Secondary />} toolbar={<Toolbar />} config={app.config.tablet} />)
  }
  return (<Container main={<Main />} secondary={<Secondary />} toolbar={<Toolbar />} config={app.config.desktop} />);
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
          <BreakpointProvider app={props.children}>
            <AppInit children={props.children} />
          </BreakpointProvider>
        </SecondaryProvider>
      </TabsProvider>
    </DrawerProvider>
  );
};

export type { AppProviderProps };
export { AppProvider };

