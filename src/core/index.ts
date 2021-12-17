import { AppProviderProps, AppProvider } from './context/AppContext';
import { useDrawer as useDrawerAlias } from './context/drawer/DrawerContext';
import { useTabs as useTabsAlias } from './context/tabs/TabsContext';
import { useSecondary as useSecondaryAlias } from './context/secondary/SecondaryContext';
import { siteTheme } from './theme/siteTheme';
import { PortalApp } from './app/PortalApp';
import { ServiceConfig, Service, TopicHeading, TopicLink, Topic, Blob, Site, TopicLinkType, createService as createServiceAs } from './service';
import intlMessages from './intl';

import {
  App, AppId
} from './context/AppAPI';
import {
  DrawerContextType, DrawerSession, DrawerActions
} from './context/drawer/DrawerAPI';
import {
  TabsContextType, TabsSession, TabSession, TabsHistory, TabsActions
} from './context/tabs/TabsAPI';
import {
  SecondaryContextType, SecondarySession, SecondaryActions 
} from './context/secondary/SecondaryAPI';

// import { StyledDialog, StyledDialogProps } from './styles/StyledDialog';


declare namespace Portal {
  export { 
    AppProviderProps, App, AppId,
    DrawerContextType, DrawerSession, DrawerActions,
    TabsContextType, TabsSession, TabSession, TabsHistory, TabsActions,
    SecondaryContextType, SecondarySession, SecondaryActions,
    
    ServiceConfig, Service, TopicHeading, TopicLink, Topic, Blob, Site, TopicLinkType
  };
  export {  }
}

namespace Portal {
  export const Provider = AppProvider;
  export const useDrawer = useDrawerAlias;
  export const useTabs = useTabsAlias;
  export const useSecondary = useSecondaryAlias;
  export const DefaultApp = PortalApp;
  export const defaultTheme = siteTheme;
  export const messages = intlMessages;
  export const createService = createServiceAs;
}

export default Portal;