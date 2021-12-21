import React from 'react';
import { Button, Box } from '@mui/material';





const LocaleSelect: React.FC<{}> = () => {


  return (
    
    <Button sx={{
      alignItems: 'center',
      color: 'primary.contrastText',
      fontWeight: 'bold',
      backgroundColor: "transparent",
      pl: 0,
      pr: 0,
      borderRadius: 1
    }}>
      EN
    </Button>

  );
}


export { LocaleSelect };