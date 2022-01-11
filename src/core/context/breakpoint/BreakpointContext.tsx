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
  const mobile = config.mobile.breakpoint(theme, useMediaQuery);
  const tablet = config.tablet.breakpoint(theme, useMediaQuery);
  //const desktop = config.desktop.breakpoint(theme, useMediaQuery);
  console.log(`portal: breakpoints, mobile: ${mobile}, tablet: ${tablet} `);
  let mode: BreakpointMode = "DESKTOP"; 
  if(mobile) {
    mode = "MOBILE";  
  } else if(tablet) {
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