import React from 'react';

import { List, ListItem, ListItemText, Collapse } from '@mui/material';

import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

import { useTopics, useContext } from '../../context/site/useContext';
import Portal from '../../'


interface TopicProps {
  value: Portal.Topic;
}

//<ListItemText secondary={sub.name} classes={{ secondary: (topic?.id === sub.id ? classes.active : undefined) }} />


const Topic: React.FC<TopicProps> = ({ value }) => {
  const [open, setOpen] = React.useState(false);
  const { setTopic } = useContext();
  const topics = useTopics();

  const subTopics = Object.values(topics)
    .filter(t => t.parent === value.id)
    .map((sub, index) => (
      <ListItem key={index} button selected={true} sx={{ ml: 3 }} onClick={() => setTopic(sub)}>
        <ListItemText secondary={sub.name} />
      </ListItem>
    ));
  const length = subTopics.length;

  const onMainTopicClick = () => {
    if (!open || length === 0) {
      setTopic(value);
    }
    setOpen(!open);
  };

  const mainTopicName = length > 0 ? `${value.name} (${length})` : `${value.name}`;
  return (
    <>
      <ListItem button onClick={onMainTopicClick}>
        <ListItemText primary={mainTopicName} />
        {length === 0 ? null :
          (open ? <ExpandLess /> : <ExpandMore />
          )
        }
      </ListItem >
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>{subTopics}</List>
      </Collapse>
    </>
  );

}
export { Topic }
