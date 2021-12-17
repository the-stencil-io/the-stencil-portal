type AppId = string;

interface App {
  id: AppId; 
  components: {
    toolbar: React.ElementType<ToolbarProps>;
    primary: React.ElementType<PrimaryProps>;
    secondary: React.ElementType<SecondaryProps>;
  }
}

interface ToolbarProps {

}
interface PrimaryProps {

}
interface SecondaryProps {

}

export type { App, AppId };
