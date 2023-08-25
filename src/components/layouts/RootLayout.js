import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";

const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-11/12 max-w-[1200px] mx-auto min-h-[60vh] mt-20 md:mt-28 mb-14">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
