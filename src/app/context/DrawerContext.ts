import { createContext, SetStateAction } from "react";

const DrawerContext = createContext({
  drawerOpen: false,
  setDrawerOpen: (newvalue: SetStateAction<boolean>) => {},
});

export default DrawerContext;