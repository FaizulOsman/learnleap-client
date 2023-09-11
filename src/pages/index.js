import RootLayout from "@/layouts/RootLayout";
import AllExams from "./exam";
import AllTests from "./test";
import { useRouter } from "next/router";
import Discuss from "./discuss";

const HomePage = () => {
  const router = useRouter();
  const login = router?.components?.["/login"];

  if (login) {
    window.location.reload();
  }
  return (
    <>
      <AllExams />
      <AllTests />
      <Discuss />
    </>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
