import React from 'react';

//import { useBlob} from '../';
import { Markdown } from './Markdown';
import Portal from '../../';


interface AppContentProps {

}

const Content: React.FC<AppContentProps> = () => {
  const blob = Portal.useBlob();

  if (blob) {
    return (<Markdown children={blob.value} />);
  }
  
  return null;

}


export { Content }

