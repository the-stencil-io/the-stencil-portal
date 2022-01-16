import * as Api from '../../service';
import { SiteState, ContextAction } from './contextReducer';

interface SiteContextType {
  service: Api.Service;
  site?: Api.Site;
  locale: string;
  topic?: Api.Topic;
  link?: Api.TopicLink;

  getBlob: (topic?: Api.Topic) => Api.Blob | undefined;
  setSite: (site?: Api.Site) => void;
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
  dispatch: React.Dispatch<ContextAction>,
  overrides: SiteActionOverrides
): SiteContextType => {

  return {
    service: service,
    locale: state.locale,
    site: state.site,
    topic: state.topic,

    getBlob: (topic?: Api.Topic) => {
      if (!state.site) {
        return undefined;
      }
      if (!topic && !state.topic) {
        return undefined;
      }

      let targetTopic = topic ? topic : state.topic;
      if (!targetTopic?.blob) {
        return undefined
      }
      return state.site.blobs[targetTopic.blob];
    },
    setLocale: (newLocale: string) => {
      if (state.locale === newLocale) {
        return;
      }
      service.getSite(newLocale).then(apiSite => {
        const site = overrides.setSite ? overrides.setSite(state, apiSite) : apiSite;
        dispatch({ type: "setSite", site: site })
        dispatch({ type: "setLocale", locale: newLocale })

        if (state.topic) {
          dispatch({ type: "setTopic", topic: site? site.topics[state.topic.id] : undefined })
        }

      });
    },

    setSite: (apiSite?: Api.Site) => {
      const site = overrides.setSite ? overrides.setSite(state, apiSite) : apiSite;
      dispatch({ type: "setSite", site })
    },
    setTopic: (apiTopic: Api.Topic) => {
      const newTopic = overrides.setTopic ? overrides.setTopic(state, apiTopic) : apiTopic;
      dispatch({ type: "setTopic", topic: newTopic })
    },
    setLink: (apiLink?: Api.TopicLink) => {
      const newLink = overrides.setLink ? overrides.setLink(state, apiLink) : apiLink
      if (newLink && !(newLink.type === "dialob" || newLink.type === "workflow")) {
        return;
      }
      dispatch({ type: "setLink", link: newLink })
    },
  };
}

export type { SiteContextType, SiteActionOverrides };
export { initContext };
