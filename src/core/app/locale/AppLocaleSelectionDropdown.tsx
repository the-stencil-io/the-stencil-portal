import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';

import { Theme, Typography, Button, Box, Menu, MenuItem, ButtonGroup } from '@mui/material';

import LanguageIcon from '@mui/icons-material/Translate';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { FormattedMessage, useIntl } from 'react-intl';


const UI_LANGUAGES = ['en', 'fi', 'sv'];

const useStyles = makeStyles((theme: Theme) => ({
  languageBar: {
    display: 'flex',
    background: theme.palette.primary.light,
    width: '100%',
  },
  languageLabel: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    }
  },
  spacer: {
    flexGrow: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    textTransform: 'capitalize',
    fontWeight: 600,
    fontSize: '.9rem',
    "&:focus": {
      backgroundColor: "transparent",
      color: theme.palette.secondary.contrastText,
    },
    borderColor: theme.palette.primary.light,

  },
  disabledButton: {
    fontWeight: 600,
    fontSize: '.9rem',
    textTransform: 'capitalize',
    "&:disabled": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderColor: theme.palette.primary.main
    },
  }
}
));

interface AppLocaleSelectionProps {
  setLocale: (locale: string) => void;
  buttons: React.ReactChild;
}

export const AppLocaleSelection: React.FC<AppLocaleSelectionProps> = ({ setLocale, buttons }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  }

  const handleLanguageSelect = (language: string) => {
    handleLanguageMenuClose();
    setLocale(language);
  }

  return (
    <div className={classes.languageBar}>
      <Box className={classes.spacer} />
      <div className={classes.buttonGroup} >
        <Button aria-controls='language-menu' aria-haspopup='true' onClick={handleLanguageMenuOpen} color='inherit'>
          <LanguageIcon />
          <span className={classes.languageLabel}><FormattedMessage id={`locale.${intl.locale}`} /></span>
          <ExpandMoreIcon fontSize="small" />
        </Button>
        <Menu id='language-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleLanguageMenuClose}>
          {
            UI_LANGUAGES.map(lang => (
              <MenuItem key={lang} selected={lang === intl.locale} onClick={() => handleLanguageSelect(lang)}>
                <FormattedMessage id={`locale.${lang}`} />
              </MenuItem>
            ))
          }
        </Menu>
        {buttons}
      </div>
    </div>
  );
}
