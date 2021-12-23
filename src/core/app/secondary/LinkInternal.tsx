import React from 'react';

import { Theme, ListItem, ListItemText, ListItemIcon } from '@mui/material';

import LinkIcon from '@mui/icons-material/Link';
//import { Api } from '../';
import Portal from '../../';




interface LinkInternalProps {
  children: Portal.TopicLink;
}

const LinkInternal: React.FC<LinkInternalProps> = ({ children }) => {
  const link = children;

  return (
    <ListItem button component="a" href={link.value} target="_blank">
      <ListItemIcon><LinkIcon /></ListItemIcon>
      <ListItemText primary={link.name} />
    </ListItem>)
}

export { LinkInternal }
