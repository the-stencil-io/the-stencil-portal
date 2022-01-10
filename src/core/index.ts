import { AppProviderProps, AppProvider } from './context/AppContext';
import { useDrawer as useDrawerAlias } from './context/drawer/DrawerContext';
import { useTabs as useTabsAlias } from './context/tabs/TabsContext';
import { useSecondary as useSecondaryAlias } from './context/secondary/SecondaryContext';
import { siteTheme } from './theme/siteTheme';
import { PortalApp } from './app/PortalApp';
import { ServiceConfig, Service, TopicHeading, TopicLink, Topic, Blob, Site, TopicLinkType, LocaleCode, FallbackSites, createService as createServiceAs } from './service';
import intlMessages from './intl';

import {
  App, AppId, MediaQuery
} from './context/AppAPI';

import {
  DrawerContextType, DrawerSession, DrawerActions
} from './context/drawer/DrawerAPI';
import {
  DrawerProvider as DrawerProviderAs
} from './context/drawer/DrawerContext';


import {
  TabsContextType, TabsSession, TabSession, TabsHistory, TabsActions
} from './context/tabs/TabsAPI';
import {
  TabsProvider as TabsProviderAs
} from './context/tabs/TabsContext';


import {
  SecondaryContextType, SecondarySession, SecondaryActions 
} from './context/secondary/SecondaryAPI';

import {
  SecondaryProvider as SecondaryProviderAs
} from './context/secondary/SecondaryContext';


import {
  SiteProvider as SiteProviderAs, SiteProviderProps
} from './context/site/Context';
import {
  SiteContextType, SiteConfigEvents
} from './context/site/ContextTypes';
import {
  SiteState
} from './context/site/contextReducer';
import {
  useContext as useSiteContext, useBlob as useBlobContext
} from './context/site/useContext';



// import { StyledDialog, StyledDialogProps } from './styles/StyledDialog';


declare namespace Portal { //ONLY can export interfaces and types with 'declare namespace'. DOES NOT COMPILE with constants
  export { 
    AppProviderProps, App, AppId, MediaQuery, 
    DrawerContextType, DrawerSession, DrawerActions,
    TabsContextType, TabsSession, TabSession, TabsHistory, TabsActions,
    SecondaryContextType, SecondarySession, SecondaryActions,
    SiteContextType, SiteState, SiteProviderProps, SiteConfigEvents,
    LocaleCode, FallbackSites,
    ServiceConfig, Service, TopicHeading, TopicLink, Topic, Blob, Site, TopicLinkType,
  };
  export {  }
}

namespace Portal { //export the constants
  export const SiteProvider = SiteProviderAs;
  export const DrawerProvider = DrawerProviderAs;
  export const TabsProvider = TabsProviderAs;
  export const SecondaryProvider = SecondaryProviderAs;
  export const Provider = AppProvider;
  
  export const useDrawer = useDrawerAlias;
  export const useTabs = useTabsAlias;
  export const useSecondary = useSecondaryAlias;
  export const useSite = useSiteContext;
  export const useBlob = useBlobContext;
  
  export const DefaultApp = PortalApp;
  export const defaultTheme = siteTheme;
  export const messages = intlMessages;
  export const createService = createServiceAs;
}

export default Portal;