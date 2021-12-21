import React from 'react';

import * as API from './AppAPI';

import { DrawerProvider } from './drawer/DrawerContext';

import { SiteProvider } from './site/Context';
import { ServiceConfig } from '../service';

import { TabsProvider } from './tabs/TabsContext';
import { SecondaryProvider } from './secondary/SecondaryContext';
import { Container } from '../layout-desktop';
import { Mobile } from '../layout-mobile';


interface AppProviderProps {
  drawerOpen?: boolean;
  secondaryOpen?: string;
  config: ServiceConfig;
  children: API.App;
}

const CreateContainer: React.FC<{ app: API.App }> = ({ app }) => {
  const Main = React.useMemo(() => app.components.primary, [app]);
  const Secondary = React.useMemo(() => app.components.secondary, [app]);
  const Toolbar = React.useMemo(() => app.components.toolbar, [app]);

  console.log(`portal: app container/layout Init: '${app.id}'`);
  return (
    <Mobile main={<Main />} secondary={<Secondary />} toolbar={<Toolbar />} />
  );
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
      <SiteProvider config={props.config}>
        <TabsProvider appId={id}>
          <SecondaryProvider appId={id} secondary={props.secondaryOpen}>
            <AppInit children={props.children} />
          </SecondaryProvider>
        </TabsProvider>
      </SiteProvider>
    </DrawerProvider>);
};

export type { AppProviderProps };
export { AppProvider };

