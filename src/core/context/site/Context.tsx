import React from 'react';
import { Service, Topic, TopicLink, Site } from '../../service';
import { contextReducer, SiteState, ImmutableSiteState } from './contextReducer';
import { SiteContextType, initContext, SiteActionOverrides } from './ContextTypes';

interface SiteProviderProps {
  service: Service;
  defaultLocale: string;
  children: React.ReactNode; 
  overrides?: SiteActionOverrides;
}

const initState = (defaultLocale: string): SiteState => {
  console.log("init state");
  return new ImmutableSiteState(defaultLocale, {});
};

const SiteProvider: React.FC<SiteProviderProps> = (props) => {
  const { overrides, defaultLocale } = props;
  const service: Service = React.useMemo(() => props.service, [props.service])
  const [state, dispatch] = React.useReducer(contextReducer, React.useMemo(() => initState(defaultLocale), [defaultLocale]));
  const contextValue = React.useMemo(() => initContext(state, service, dispatch, overrides ? overrides : {}), [state, service, dispatch, overrides]);

  // load site
  React.useEffect(() => {
    if (!state.loaded) {
      dispatch({ type: "setSite", site: service.getSiteLoading(state.locale) })

      service.getSite(state.locale).then(site => {
        dispatch({ type: "setTopic" });
        if (site) {
          dispatch({ type: "setSite", site })
        }
      });

    }
  }, [service, state.locale, state.loaded, dispatch]);

  return (<SiteContext.Provider value={contextValue}>{state.loaded && props.children}</SiteContext.Provider>);
}

const SiteContext = React.createContext<SiteContextType>({
  service: {} as any,
  locale: "en",
  getBlob: (topic?: Topic) => { console.log(topic); return undefined },
  setSite: (site?: Site) => console.log(site),
  setLocale: (newLocale: string) => console.log(newLocale),
  setTopic: (newTopic: Topic) => console.log(newTopic),
  setLink: (newLink?: TopicLink) => console.log(newLink),
})

export type { SiteProviderProps };
export { SiteContext, SiteProvider };


