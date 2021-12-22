import React from 'react';

import { Button, Box } from '@mui/material';

import { FormattedMessage, useIntl } from 'react-intl';
import Portal from '../../';
import { UI_LANGUAGES } from '../util';

const AppLocaleSelection: React.FC<{}> = ({ }) => {
  const intl = useIntl();
  const site = Portal.useSite();
  const handleLanguageSelect = (language: string) => site.setLocale(language);

  return (
    <Box aria-label="selected language">
      {
        UI_LANGUAGES.map((lang, index) => (
          <Button key={index} disabled={lang === intl.locale} onClick={() => handleLanguageSelect(lang)} 
            sx={{ 
              "&:disabled": {color: 'lightgrey'}, 
              color: "primary.contrastText", p:0 }}>
            <FormattedMessage id={`locale.${lang}`} />
          </Button>
        ))
      }
    </Box>
  );
}

export { AppLocaleSelection };