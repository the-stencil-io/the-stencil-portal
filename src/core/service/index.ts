import { ServiceConfig, Service, TopicHeading, TopicLink, Topic, Blob, Site, TopicLinkType, LocaleCode, FallbackSites, TopicId, TopicLinkId } from './Service';
import { ServiceImpl } from './ServiceImpl';
import { ServiceMock } from './ServiceMock';

const createService = (config: ServiceConfig): Service => {
  if(config.dev) {
    return new ServiceMock(config);
  }
  return new ServiceImpl(config);
}


export { ServiceImpl, ServiceMock, createService };
export type { ServiceConfig, Service, TopicHeading, TopicLink, Topic, TopicId, TopicLinkId, Blob, Site, TopicLinkType, LocaleCode, FallbackSites };