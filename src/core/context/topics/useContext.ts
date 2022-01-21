import React from 'react';
import * as Api from '../../service';
import { useSite } from '../site/useContext';
import { TopicsContext } from './Context';
import { TopicsContextType } from './ContextTypes';


const useContext = () => {
  const result: TopicsContextType = React.useContext(TopicsContext);
  return result;
}
const useTopic = () => {
  const site = useSite();
  const topicId = useContext().topic;
  return topicId ? site?.topics[topicId] : undefined;
}
const useBlob = () => {
  const site = useSite();
  const topic = useTopic();
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

export { useContext, useTopic, useBlob, useLink };