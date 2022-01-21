import React from 'react';
import { Service, Topic, TopicLink, Site } from '../../service';
import { contextReducer, SiteState, ImmutableSiteState, SiteReducerDispatch } from './contextReducer';
import { SiteContextType, initContext, SiteActionOverrides } from './ContextTypes';

interface SiteProviderProps {
  service: Service;
  defaultLocale: string;
  defaultTopic?: string
  children: React.ReactNode; 
  overrides?: SiteActionOverrides;
}

const initState = (defaultLocale: string, service: Service, overrides?: SiteActionOverrides): SiteState => {
  console.log("portal: site state init");
  return new ImmutableSiteState(
    defaultLocale, { 
      site: service.getSiteLoading(defaultLocale), 
      overrides: overrides ? overrides : {}
    });
};

const SiteProvider: React.FC<SiteProviderProps> = (props) => {
  const { overrides, defaultLocale } = props;
  const service: Service = React.useMemo(() => props.service, [props.service])
  const init = React.useMemo(() => initState(defaultLocale, service, overrides), [defaultLocale, service, overrides])
  const [state, dispatch] = React.useReducer(contextReducer, init);
  const actions = React.useMemo(() => new SiteReducerDispatch(dispatch), [dispatch]);
  const contextValue = React.useMemo(() => initContext(state, service, actions), [state, service, actions]);

  // load site
  React.useEffect(() => {
    if (!state.loaded) {
      console.log("portal: site init loader");

      service.getSite(state.locale).then(site => {
        if (site) {
          actions.setSite(site, state.locale, props.defaultTopic);
        }
      })

    }
  }, [service, state.locale, state.loaded, dispatch, props.defaultTopic, actions]);

  return (<SiteContext.Provider value={contextValue}>{state.loaded && props.children}</SiteContext.Provider>);
}

const SiteContext = React.createContext<SiteContextType>({
  service: {} as any,
  locale: "en",
  actions: {} as any,
  getBlob: (topic?: Topic) => { console.log(topic); return undefined },
  setSite: (site?: Site) => console.log(site),
  setLocale: (newLocale: string) => console.log(newLocale),
  setTopic: (newTopic: Topic) => console.log(newTopic),
  setLink: (newLink?: TopicLink) => console.log(newLink),
})

export type { SiteProviderProps };
export { SiteContext, SiteProvider };


