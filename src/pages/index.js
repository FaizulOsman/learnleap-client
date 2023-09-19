import RootLayout from "@/layouts/RootLayout";
import AllExams from "./exam";
import AllTests from "./test";
import { useRouter } from "next/router";
import Discussion from "./discussion";

const HomePage = () => {
  const router = useRouter();
  const login = router?.components?.[("/login", "/be-a-premium-user")];

  if (login) {
    window.location.reload();
  }
  return (
    <>
      <AllExams />
      <AllTests />
      <Discussion />
    </>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
