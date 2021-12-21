import * as Api from './Service';

import FallbackSites from './FallbackSites';


interface Store {
  fetch<T>(url: string, init?: RequestInit): Promise<T>;
}


class ServiceMock implements Api.Service, Store {

  private _config: Api.ServiceConfig;

  constructor(config: Api.ServiceConfig) {
    this._config = config;
    console.log("using mock services", config);
  }


  async getSite(locale: string): Promise<Api.Site> {
    return FallbackSites(locale).maintainance;
    /*
    return this.fetch<Api.Site>(this._config.content.url + "?locale=" + locale)
      .then(site => {
        if (site) {
          return site;
        }
        return FallbackSites(locale).maintainance;
      });
      */
  }
  getSiteLoading(locale: string): Api.Site {
    return FallbackSites(locale).loading;
  }


  setErrors(value: any, url: string, init?: RequestInit) {
    console.error(value, url, init)
  }
  fetch<T>(url: string, init?: RequestInit): Promise<T> {
    if (!url) {
      throw new Error("can't fetch with undefined url")
    }

    const finalInit = init ? init : { method: "GET" };
    return fetch(url, finalInit)
      .then(response => {
        if (response.status === 302) {
          return null;
        }
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .catch(errors => this.setErrors(errors, url, init))
  }
}

export { ServiceMock };

