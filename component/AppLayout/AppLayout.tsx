import Navigation from '../Navigation/Navigation';

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <div>{children}</div>
    </>
  );
};

export default AppLayout;
