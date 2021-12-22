type AppId = string;

interface App {
  id: AppId;
  components: {
    toolbar: React.ElementType<ToolbarProps>;
    primary: React.ElementType<PrimaryProps>;
    secondary: React.ElementType<SecondaryProps>;
  },
  config: {
    mobile: {
      drawerWidth: number;
      toolbarHeight: number;
    },
    desktop: {
      drawerWidth: number;
      toolbarHeight: number;
    }
  }
}

interface ToolbarProps {
  logoConfig?: {
    mobile: {
      height: number,
      width: number
    },
    desktop: {
      height: number,
      width: number
    }
  }
}

interface PrimaryProps {

}
interface SecondaryProps {

}

export type { App, AppId };
