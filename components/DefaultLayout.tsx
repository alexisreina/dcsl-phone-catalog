import AppNavbar from "./AppNavbar";
import PageWrapper from "./PageWrapper";

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <PageWrapper>
      <AppNavbar />
      {children}
    </PageWrapper>
  );
};

export default DefaultLayout;
