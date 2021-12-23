import React from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm';

import Divider from '@mui/material/Divider';

import Renderers from './Renderers';
import Portal from '../../'

//import { Links } from './Links';

interface MarkdownViewProps {
  children: string
}


const Markdown: React.FC<MarkdownViewProps> = ({ children }) => {
  const site = Portal.useSite();
  const topic = site.topic;
  const blob = site.getBlob();
  if(!topic || !blob) {
    return <div>not selected ...</div>
  }


  const onAnchorClick: (anchor: string) => void = () => console.log("link clicked");
  const createAnchorRef = (name: string): React.RefObject<HTMLSpanElement> => {
    const value: React.RefObject<HTMLSpanElement> = React.createRef();
    return value;
  };
  

  return (
    <>
      <ReactMarkdown
        children={children}
        remarkPlugins={[Renderers.ViewPlugin, gfm]}
        components={{
          image: Renderers.Image,
          h1: (props) => {

            console.log(props)
            return <div style={{ "fontSize": '2.3rem' }}>{props.children}</div>;
          },
          h2: (props) => {

            console.log(props)
            return <div style={{ "fontSize": "2rem" }}>{props.children}</div>;
          },
          h3: (props) => {

            console.log(props)
            return <div style={{ "fontSize": "1.7rem" }}>{props.children}</div>;
          },
          h4: (props) => {

            console.log(props)
            return <div style={{ "fontSize": "1.4rem" }}>{props.children}</div>;
          },
          h5: (props) => {

            console.log(props)
            return <div style={{ "fontSize": "1.1rem" }}>{props.children}</div>;
          },
          h6: (props) => {

            console.log(props)
            return <div style={{ "fontSize": "1rem" }}>{props.children}</div>;
          },
          link: (props) => Renderers.Link(onAnchorClick, props),
          text: (props) => Renderers.Text(createAnchorRef, props)
        }} />
      { topic?.links.length ? (<><Divider />LINKS COMPONENT HERE</>) : null}
    </>);
}

export { Markdown };