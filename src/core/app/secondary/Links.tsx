import React from 'react';
import { List, Divider, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { useTopic, useSite } from '../../context/site/useContext';
import { LinkInternal } from './LinkInternal';

interface LinksProps {
}

const Links: React.FC<LinksProps> = () => {
  const topic = useTopic();
  const site = useSite();
  if (!topic || !site) {
    return null;
  }

  const links = topic.links.map(link => site.links[link]);
  const internal = links.filter(link => link.type === "internal").map((link, index) => <LinkInternal key={index}>{link}</LinkInternal>)

  return (<>
    <Typography variant="h3" style={{ paddingTop: '10px' }}>
      <FormattedMessage id='appLinks.title' defaultMessage='Links' />
      {internal.length === 0 ? null : <><List>{internal}</List><Divider /></>}
    </Typography>
  </>)
}

export { Links }

