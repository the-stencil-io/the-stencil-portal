import React from 'react';
import * as Api from '../../service';
import { SiteContext } from './Context';
import { SiteContextType } from './ContextTypes';


const useContext = () => {
  const result: SiteContextType = React.useContext(SiteContext);
  return result;
}
const useLocale = () => {
  const {locale, setLocale} = useContext();
  return {locale, setLocale};
}
const useSite = () => {
  return useContext().site;
}
const useTopic = () => {
  return useContext().topic;
}
const useTopics = (): Record<string, Api.Topic> => {
  const site = useSite();
  if(site) {
    return site.topics;
  }
  return {};
}

const useBlob = () => {
  const { site, topic } = useContext();
  if(!site || !topic || !topic.blob) {
    return null;
  }
  return site.blobs[topic.blob];
}

const useLink = (linkId: string): Api.TopicLink => {
  const site = useSite();
  if(!site){
    throw new Error("Site not loaded")
  }
  return site.links[linkId];
}

export {
  useContext, useLocale, useSite, useTopics, useTopic, useBlob, useLink };