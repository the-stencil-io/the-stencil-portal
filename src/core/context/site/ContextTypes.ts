import * as Api from '../../service';
import { SiteState } from './contextReducer';

interface SiteContextType extends SiteActions {
  service: Api.Service;
  site?: Api.Site;
  locale: string;
  topic?: Api.Topic;
  link?: Api.TopicLink;
  getBlob: (topic?: Api.Topic) => Api.Blob | undefined;
  actions: SiteActions;
}

interface SiteActions {
  setSite: (site?: Api.Site, newLocale?: Api.LocaleCode) => void;
  setLink: (newLink?: Api.TopicLink) => void;
  setLocale: (newLocale: string) => void;
  setTopic: (newTopic: Api.Topic) => void;
}


interface SiteActionOverrides {
  setTopic?: (state: SiteState, newTopic?: Api.Topic) => Api.Topic | undefined;
  setLink?: (state: SiteState, newLink?: Api.TopicLink) => Api.TopicLink | undefined;
  setSite?: (state: SiteState, newSite?: Api.Site) => Api.Site | undefined;
}

const initContext = (
  state: SiteState,
  service: Api.Service,
  actions: SiteActions,
): SiteContextType => {

  return {
    service: service,
    locale: state.locale,
    site: state.site,
    topic: state.topic,
    getBlob: (topic) => state.getBlob(topic),
    actions: actions,
    setLink: (newLink?: Api.TopicLink) => actions.setLink(newLink),
    setTopic: (newTopic: Api.Topic) => actions.setTopic(newTopic),
    setSite: (site?: Api.Site, newLocale?: Api.LocaleCode) => actions.setSite(site, newLocale),
    setLocale: (newLocale: string) => {
      if (state.locale === newLocale) {
        return;
      }
      service.getSite(newLocale).then(apiSite => actions.setSite(apiSite, newLocale));
    },
  };
}


export type { SiteContextType, SiteActionOverrides, SiteActions };
export { initContext };
