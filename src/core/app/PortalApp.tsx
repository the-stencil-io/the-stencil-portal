import React from 'react';
import Portal from '../'

const Primary: React.FC<{}> = () => {
  return (<div>
    primary app1
  </div>);
}
const Secondary: React.FC<{}> = () => {
  return (<div>secondary app1</div>);
}
const Toolbar: React.FC<{}> = () => {
  return (<div>toolbar app1</div>);
}

//const service = StencilClient.service({url: "http://localhost:8080/q/ide-services"});

const PortalApp: React.FC<{}> = (props) => {
  const app: Portal.App = {
    id: "demoApp",
    components: {
      primary: Primary,
      secondary: Secondary,
      toolbar: Toolbar
    }
  }

  return (<Portal.Provider drawerOpen config={{ defaultLocale: "en", dev: true, content: { url: "" } }}>
    {app}
  </Portal.Provider>);
}

export { PortalApp };

