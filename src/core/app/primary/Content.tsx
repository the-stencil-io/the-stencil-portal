import React from 'react';

//import { useBlob} from '../';
import { Markdown } from './Markdown';
import Portal from '../../';


interface AppContentProps {

}

const Content: React.FC<AppContentProps> = () => {
  const site = Portal.useSite();
  const blob = site.getBlob();

  if (blob) {
    return (<Markdown children={blob.value} />);
  }
  
  return null;

}


export { Content }

