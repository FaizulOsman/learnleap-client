import RootLayout from "@/layouts/RootLayout";
import AllExams from "./exam";
import AllTests from "./test";

const HomePage = () => {
  return (
    <>
      <AllExams />
      <AllTests />
    </>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
