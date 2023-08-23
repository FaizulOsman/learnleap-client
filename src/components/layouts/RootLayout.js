import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";

const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-11/12 max-w-[1200px] mx-auto">{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
