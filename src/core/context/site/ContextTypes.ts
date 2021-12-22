import * as Api from '../../service';
import { SiteState, ContextAction } from './contextReducer';

interface SiteContextType {
  service: Api.Service;
  site?: Api.Site;
  locale: string;
  topic?: Api.Topic;
  link?: Api.TopicLink;

  setSite: (site?: Api.Site) => void;
  setLink: (newLink?: Api.TopicLink) => void;
  setLocale: (newLocale: string) => void;
  setTopic: (newTopic: Api.Topic) => void;
}

const initContext = (
  state: SiteState,
  service: Api.Service,
  dispatch: React.Dispatch<ContextAction>): SiteContextType => {

  return {
    service: service,
    locale: state.locale,
    site: state.site,
    topic: state.topic,

    setSite: (site?: Api.Site) => {
      dispatch({ type: "setSite", site })
    },

    setTopic: (newTopic: Api.Topic) => {
      dispatch({ type: "setTopic", topic: newTopic })
    },

    setLocale: (newLocale: string) => {
      if (state.locale === newLocale) {
        return;
      }
      service.getSite(newLocale).then(site => {
        dispatch({ type: "setSite", site: site })
        dispatch({ type: "setLocale", locale: newLocale })

        if (state.topic) {
          dispatch({ type: "setTopic", topic: site.topics[state.topic.id] })
        }

      });

    },
    setLink: (newLink?: Api.TopicLink) => {
      if (newLink && !(newLink.type === "dialob" || newLink.type === "workflow")) {
        return;
      }
      dispatch({ type: "setLink", link: newLink })
    },
  };
}

export type { SiteContextType };
export { initContext };
