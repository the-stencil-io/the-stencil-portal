import React from 'react';
import { Box, SxProps } from '@mui/material';
import { Content } from './Content';
import { useTopic } from '../../context/site/useContext';
import { PrimaryProps } from '../../context/AppAPI';

const Primary: React.FC<PrimaryProps> = ({ sx }) => {
  const topic = useTopic();
  const id = topic ? topic.id : "";
  return (
    <Box sx={Object.assign({}, sx, {p: 2})} key={id}>
      <Content />
    </Box>
  );
}


export { Primary };

