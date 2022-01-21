import * as Api from '../../service';
import { SiteActionOverrides, SiteActions } from './ContextTypes';


interface SiteStateData {
  loaded: boolean;
  locale: string;
  site?: Api.Site;
  topic?: Api.Topic;
  topicProps?: any;
  link?: Api.TopicLink;
  parent?: SiteState;
}

interface SiteState extends SiteStateData {
  withLocale(locale: string): SiteState;
  withSite(site: Api.Site, defaultTopicId?: string): SiteState;
  withTopic(topic?: Api.Topic, topicProps?: any): SiteState;
  withLink(link?: Api.TopicLink): SiteState;
  getBlob(topic?: Api.Topic): Api.Blob | undefined;
}

class ImmutableSiteState implements SiteState {
  private _locale: string;
  private _loaded: boolean;
  private _site?: Api.Site;
  private _topic?: Api.Topic;
  private _topicProps?: any;
  private _link?: Api.TopicLink;
  private _parent?: SiteState;

  constructor(locale: string, init: {
    site?: Api.Site;
    topic?: Api.Topic;
    link?: Api.TopicLink;
    parent?: SiteState;
    topicProps?: any
  }) {
    this._locale = locale;
    this._loaded = init.site != null && init.site.loader !== true;
    this._site = init.site;
    this._topic = init.topic;
    this._topicProps = init.topicProps;
    this._link = init.link;
    this._parent = init.parent;
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
  withSite(site: Api.Site, defaultTopicId?: string): SiteState {
    if(defaultTopicId) {
      const found = Object.values(site.topics).filter(t => t.id === defaultTopicId);
      if(found.length > 0) {
        return new ImmutableSiteState(this._locale, this.init({ parent: this, site, topic: found[0] })); 
      }
    }
    return new ImmutableSiteState(this._locale, this.init({ parent: this, site }));
  }
  withTopic(topic?: Api.Topic, topicProps?: any): SiteState {
    return new ImmutableSiteState(this._locale, this.init({ parent: this, topic, topicProps }));
  }
  withLink(link?: Api.TopicLink): SiteState {
    return new ImmutableSiteState(this._locale, this.init({ parent: this, link }));
  }

  init(arg: {}): SiteStateData {
    const newState: SiteStateData = {
      loaded: this._loaded,
      site: this._site,
      topic: this._topic,
      topicProps: this._topicProps,
      link: this._link,
      parent: this,
      locale: this._locale
    };
    return Object.assign(newState, arg);
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
  get topicProps() {
    return this._topicProps;
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
  defaultTopicId?: string;
  topic?: Api.Topic,
  topicProps?: any,
  link?: Api.TopicLink,
}


class SiteReducerDispatch implements SiteActions {

  private _sessionDispatch: React.Dispatch<ContextAction>;
  private _overrides: SiteActionOverrides;
  constructor(session: React.Dispatch<ContextAction>, overrides: SiteActionOverrides) {
    console.log("portal: init site dispatch");
    this._sessionDispatch = session;
    this._overrides = overrides;
  }
  setLocale(locale: string) {
    this._sessionDispatch({ type: "setLocale", locale })
  }
  setSite(site?: Api.Site, locale?: Api.LocaleCode, defaultTopicId?: string) {
    const newSite = this._overrides.setSite ? this._overrides.setSite(site) : site;
    this._sessionDispatch({ type: "setSite", site: newSite, locale, defaultTopicId })
  }    
  setTopic(topic: Api.Topic, topicProps?: any) {
    const newTopic = this._overrides.setTopic ? this._overrides.setTopic(topic, topicProps) : topic;
    this._sessionDispatch({ type: "setTopic", topic: newTopic, topicProps })
  }
  setLink(link?: Api.TopicLink) {
    const newLink = this._overrides.setLink ? this._overrides.setLink(link) : link
    this._sessionDispatch({ type: "setLink", link: newLink })
  }
}

const contextReducer = (oldState: SiteState, action: ContextAction): SiteState => {
  switch (action.type) {
    case "setSite": {
      if (!action.site) {
        console.error("new site is undefined");
        return oldState;
      }
      const site = action.site;      
      const newState = oldState.withSite(site, action.defaultTopicId).withLocale(action.locale ? action.locale : oldState.locale)
      
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
      const newTopic = action.topic;
      if(oldState.topic && newTopic && newTopic.id === oldState.topic.id) {
        return oldState;
      }
      return oldState.withTopic(newTopic);
    }
    case "setLink": {
      const newLink = action.link;
      if (newLink && !(newLink.type === "dialob" || newLink.type === "workflow")) {
        return oldState;
      }
      return oldState.withLink(newLink);
    }
  }
}


export type { SiteState, ContextAction };
export { contextReducer, ImmutableSiteState, SiteReducerDispatch };

