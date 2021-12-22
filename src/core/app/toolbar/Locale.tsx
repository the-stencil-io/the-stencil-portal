import React from 'react';

import { Button, Box, DialogTitle, Dialog, DialogContent } from '@mui/material';

import { FormattedMessage, useIntl } from 'react-intl';
import Portal from '../../';
import { UI_LANGUAGES } from '../util';

interface AppLocaleSelectionDialogProps {
  open: boolean;
  onClose: () => void;

}

const SelectDialog: React.FC<AppLocaleSelectionDialogProps> = ({ open, onClose }) => {
  const site = Portal.useSite();
  const intl = useIntl();

  const handleLanguageSelect = (language: string) => {
    onClose();
    site.setLocale(language)

  };

  return (
    <Dialog open={open}>
      <DialogTitle><FormattedMessage id="locale.select" /></DialogTitle>
      <DialogContent>
        {
          UI_LANGUAGES.map((lang, index) => (
            <Button key={index} disabled={lang === intl.locale} onClick={() => handleLanguageSelect(lang)}
              sx={{ "&:disabled": { color: 'darkGrey' }, color: "primary.main", p: 0 }}>
              <FormattedMessage id={`locale.${lang}`} />
            </Button>
          ))
        }
      </DialogContent>
    </Dialog>
  )
}


const Locale: React.FC<{}> = ({ }) => {
  const site = Portal.useSite();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <Box>
      <SelectDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <Box>
        <Button onClick={() => setDialogOpen(true)}
          sx={{ color: "primary.contrastText", p: 0 }}>
          <FormattedMessage id={`locale.${site.locale}`} />
        </Button>
      </Box>
    </Box>
  );
}

export { Locale };


