import React from 'react';
import Portal from '../'
import PortalAppHeader from './PortalAppHeader';
import { IntlProvider } from 'react-intl'
import { UI_LANGUAGES, DEFAULT_LOCALE } from './util';

const Primary: React.FC<{}> = () => {
  return (
    <div>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum."
      </p>

      <p>
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
        quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
        aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
      </p>

    </div>);
}
const Secondary: React.FC<{}> = () => {
  return (

    <div>
      <p>Topic 1</p>
      <p>Topic 2</p>
      <p>Topic 3</p>
    </div>);
}
const Toolbar: React.FC<{}> = () => {

  const { actions, session } = Portal.useDrawer();
  console.log("init toolbar");
  return (
    <PortalAppHeader />
  );
}

const app: Portal.App = {
  id: "demoApp",
  components: { primary: Primary, secondary: Secondary, toolbar: Toolbar },
  config: {
    mobile: {
      drawerWidth: 300,
      toolbarHeight: 100
    }
  }
}

const PortalLocale: React.FC<{}> = () => {
  const { locale } = Portal.useSite();
  return (<IntlProvider locale={locale} messages={Portal.messages[locale]}>
    <Portal.Provider>{app}</Portal.Provider>
  </IntlProvider>);
}

const PortalApp: React.FC<{}> = (props) => {
  let defaultLocale = "";
  const browserLocale: string = (navigator.languages && navigator.languages[0]) || navigator.language || (navigator as any).userLanguage || 'en-US';
  if (browserLocale.indexOf("-")) {
    defaultLocale = browserLocale.split("-")[0];
  }
  if (!UI_LANGUAGES.includes(defaultLocale)) {
    defaultLocale = DEFAULT_LOCALE;
  }

  const service = React.useMemo(() => Portal.createService({ defaultLocale, dev: true, content: { url: "http://localhost:8080/q/ide-services" } }), [defaultLocale]);

  return (
    <Portal.SiteProvider service={service} defaultLocale={defaultLocale}>
      <PortalLocale />
    </Portal.SiteProvider>);
}

export { PortalApp };

