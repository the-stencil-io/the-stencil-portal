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


const AppInit: React.FC<{ children: API.App }> = ({ children }) => {
  const mode = useBreakpoint();
  console.log(`portal: app container/layout Init: '${children.id}', mode: ${mode}`);
  
  return React.useMemo(() => {
    const { config, components } = children;
    const {primary, secondary, toolbar} = components;
    
    if (mode === 'MOBILE') {
      return (<Container primary={primary} secondary={secondary} toolbar={toolbar} config={config.mobile} />);
    } else if (mode === "TABLET") {
      return (<Container primary={primary} secondary={secondary} toolbar={toolbar} config={config.tablet} />)
    }
    
    return (<Container primary={primary} secondary={secondary} toolbar={toolbar} config={config.desktop} />);
  }, [children, mode]);
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

