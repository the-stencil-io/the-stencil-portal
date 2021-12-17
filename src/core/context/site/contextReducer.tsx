import * as Api from '../../service';



interface SiteState {
  loaded: boolean;
  locale: string;
  site?: Api.Site;
  topic?: Api.Topic;
  link?: Api.TopicLink;
  parent?: SiteState;

  withLocale(locale: string): SiteState;
  withSite(site: Api.Site): SiteState;
  withTopic(topic?: Api.Topic): SiteState;
  withLink(link?: Api.TopicLink): SiteState;
}

class ImmutableSiteState implements SiteState {
  private _locale: string;
  private _loaded: boolean;
  private _site?: Api.Site;
  private _topic?: Api.Topic;
  private _link?: Api.TopicLink;
  private _parent?: SiteState;

  constructor(locale: string, init: {
    site?: Api.Site;
    topic?: Api.Topic;
    link?: Api.TopicLink;
    parent?: SiteState;
  }) {
    this._locale = locale;
    this._loaded = init.site != null;
    this._site = init.site;
    this._topic = init.topic;
    this._link = init.link;
    this._parent = init.parent;
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

  init(arg: {}): {} {
    return Object.assign({}, {
      loaded: this._loaded,
      site: this._site,
      topic: this._topic,
      link: this._link,
      parent: this,
    }, arg
    );
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

const contextReducer = (oldState: SiteState, action: ContextAction): SiteState => {
  switch (action.type) {
    case "setSite": {
      if (!action.site) {
        console.error("new site is undefined");
        return oldState;
      }

      const newState = oldState
        .withSite(action.site)

      if (!newState.topic) {
        const records = newState.site?.topics;
        const topics = Object.values(records ? records : {})
          .filter(t => !t.parent)
          .sort((t1, t2) => t1.id.localeCompare(t2.id));

        if (topics.length) {
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

      return oldState.withLocale(action.locale);
    }
    case "setTopic": {
      return oldState.withTopic(action.topic);
    }
    case "setLink": {
      return oldState.withLink(action.link);
    }
  }
}


export type { SiteState, ContextAction };
export { contextReducer, ImmutableSiteState };

