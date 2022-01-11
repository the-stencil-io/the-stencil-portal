import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { App } from '../AppAPI'

type BreakpointMode = "MOBILE" | "DESKTOP" | "TABLET";
interface BreakpointContextType {
  mode: BreakpointMode
}
const BreakpointContext = React.createContext<BreakpointContextType>({
  mode: "DESKTOP"
})


const BreakpointProvider: React.FC<{ app: App, children: React.ReactElement }> = (props) => {
  const theme = useTheme();
  const config = props.app.config;
  //const desktop = config.desktop.breakpoint(theme, useMediaQuery);
  
  let mode: BreakpointMode = "DESKTOP"; 
  if(config.mobile.breakpoint(theme, useMediaQuery)) {
    mode = "MOBILE";  
  } else if(config.tablet.breakpoint(theme, useMediaQuery)) {
   mode = "TABLET"; 
  }

  return (<BreakpointContext.Provider value={{ mode }}>
      {props.children}
    </BreakpointContext.Provider>);
}

const useBreakpoint = () => {
  const result: BreakpointContextType = React.useContext(BreakpointContext);
  return result.mode;
}

export type { BreakpointContextType, BreakpointMode };

export { BreakpointProvider, BreakpointContext, useBreakpoint };