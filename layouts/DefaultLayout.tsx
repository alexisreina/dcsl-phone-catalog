import AppNavbar from "../components/AppNavbar";

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  );
};

export default DefaultLayout;
