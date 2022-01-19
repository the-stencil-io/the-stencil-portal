import * as Api from '../../service';
import { SiteActionOverrides, SiteActions } from './ContextTypes';


interface SiteStateData {
  loaded: boolean;
  locale: string;
  site?: Api.Site;
  topic?: Api.Topic;
  link?: Api.TopicLink;
  parent?: SiteState;
  overrides: SiteActionOverrides;
}

interface SiteState extends SiteStateData {
  withLocale(locale: string): SiteState;
  withSite(site: Api.Site): SiteState;
  withTopic(topic?: Api.Topic): SiteState;
  withLink(link?: Api.TopicLink): SiteState;
  getBlob(topic?: Api.Topic): Api.Blob | undefined;
}

class ImmutableSiteState implements SiteState {
  private _locale: string;
  private _loaded: boolean;
  private _site?: Api.Site;
  private _topic?: Api.Topic;
  private _link?: Api.TopicLink;
  private _parent?: SiteState;
  private _overrides: SiteActionOverrides;

  constructor(locale: string, init: {
    site?: Api.Site;
    topic?: Api.Topic;
    link?: Api.TopicLink;
    parent?: SiteState;
    overrides: SiteActionOverrides
  }) {
    this._locale = locale;
    this._loaded = init.site != null && init.site.loader !== true;
    this._site = init.site;
    this._topic = init.topic;
    this._link = init.link;
    this._parent = init.parent;
    this._overrides = init.overrides;
  }
  getBlob(topic?: Api.Topic) {
    if (!this._site) {
      return undefined;
    }
    if (!topic && !this._topic) {
      return undefined;
    }

    let targetTopic = topic ? topic : this._topic;
    if (!targetTopic?.blob) {
      return undefined
    }
    return this._site.blobs[targetTopic.blob];
  }
  withLocale(locale: string): SiteState {
    return new ImmutableSiteState(locale, this.init({ parent: this }));
  }
  withSite(site: Api.Site): SiteState {
    return new ImmutableSiteState(this._locale, this.init({ parent: this, site }));
  }
  withTopic(topic?: Api.Topic): SiteState {
    return new ImmutableSiteState(this._locale, this.init({ parent: this, topic }));
  }
  withLink(link?: Api.TopicLink): SiteState {
    return new ImmutableSiteState(this._locale, this.init({ parent: this, link }));
  }

  init(arg: {}): SiteStateData {
    const newState: SiteStateData = {
      loaded: this._loaded,
      site: this._site,
      topic: this._topic,
      link: this._link,
      parent: this,
      locale: this._locale,
      overrides: this._overrides
    };
    return Object.assign(newState, arg);
  }
  get overrides() {
    return this._overrides;
  }
  get locale() {
    return this._locale;
  }
  get site() {
    return this._site;
  }
  get topic() {
    return this._topic;
  }
  get link() {
    return this._link;
  }
  get parent() {
    return this._parent;
  }
  get loaded() {
    return this._loaded;
  }
}

interface ContextAction {
  type: "setSite" | "setLocale" | "setTopic" | "setLink",

  site?: Api.Site,
  locale?: string,
  topic?: Api.Topic,
  link?: Api.TopicLink,
}


class SiteReducerDispatch implements SiteActions {

  private _sessionDispatch: React.Dispatch<ContextAction>;
  constructor(session: React.Dispatch<ContextAction>) {
    console.log("portal: init site dispatch");
    this._sessionDispatch = session;
  }
  setLocale(locale: string) {
    this._sessionDispatch({ type: "setLocale", locale })
  }
  setSite(site?: Api.Site, locale?: Api.LocaleCode) {
    this._sessionDispatch({ type: "setSite", site, locale })
  }    
  setTopic(topic: Api.Topic) {
    this._sessionDispatch({ type: "setTopic", topic })
  }
  setLink(link?: Api.TopicLink) {
    this._sessionDispatch({ type: "setLink", link })
  }
}

const contextReducer = (oldState: SiteState, action: ContextAction): SiteState => {
  switch (action.type) {
    case "setSite": {
      if (!action.site) {
        console.error("new site is undefined");
        return oldState;
      }
      const site = oldState.overrides.setSite ? oldState.overrides.setSite(oldState, action.site) : action.site;
      if(!site) {
        console.error("new site is undefined");
        return oldState;
      }
      
      const newState = oldState.withSite(site).withLocale(action.locale ? action.locale : oldState.locale)
      if (!newState.topic) {
        const records = newState.site?.topics;
        const topics = Object.values(records ? records : {})
          .filter(t => !t.parent)
          .sort((t1, t2) => t1.id.localeCompare(t2.id));
        if (topics.length) {
          
          if(oldState.topic?.id) {
            const changeTopicLocale = topics.filter(t => t.id === oldState.topic?.id);
            if(changeTopicLocale.length > 0) {
              return newState.withTopic(changeTopicLocale[0]);    
            }
          }
          
          return newState.withTopic(topics[0]);
        }
      }

      return newState;
    }
    case "setLocale": {
      if (!action.locale) {
        console.error("new locale is undefined");
        return oldState;
      }
      if(action.locale === oldState.locale) {
        return oldState;
      }

      return oldState.withLocale(action.locale);
    }
    case "setTopic": {
      const apiTopic = action.topic;
      const newTopic = oldState.overrides.setTopic ? oldState.overrides.setTopic(oldState, apiTopic) : apiTopic;
      return oldState.withTopic(newTopic);
    }
    case "setLink": {
      const apiLink = action.link;
      const newLink = oldState.overrides.setLink ? oldState.overrides.setLink(oldState, apiLink) : apiLink
      if (newLink && !(newLink.type === "dialob" || newLink.type === "workflow")) {
        return oldState;
      }
      return oldState.withLink(newLink);
    }
  }
}


export type { SiteState, ContextAction };
export { contextReducer, ImmutableSiteState, SiteReducerDispatch };

