import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="main">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;