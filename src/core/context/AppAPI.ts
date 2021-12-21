type AppId = string;

interface App {
  id: AppId;
  components: {
    toolbar: React.ElementType<ToolbarProps>;
    primary: React.ElementType<PrimaryProps>;
    secondary: React.ElementType<SecondaryProps>;
  },
  config: {
    drawerWidth: number;
    toolbarHeight: number;
  }
}

interface ToolbarProps {

}
interface PrimaryProps {

}
interface SecondaryProps {

}

export type { App, AppId };
