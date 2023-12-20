import RootLayout from "@/layouts/RootLayout";
import AllExams from "./exam";
import AllTests from "./test";
import { useRouter } from "next/router";
import Discussion from "./discussion";
import Hero from "@/components/UI/Hero/Hero";
import FeedbackPage from "./feedback";
import FAQPage from "./faq";
import MetaData from "@/components/SEO/MetaData";

const HomePage = () => {
  const router = useRouter();
  const login =
    router?.components?.["/login"] ||
    router?.components?.["/be-a-premium-user"];

  if (login) {
    window.location.reload();
  }

  return (
    <>
      <MetaData title="Learn Leap - Home" />
      <Hero />
      <AllExams />
      <AllTests />
      <Discussion />
      <FAQPage />
      <FeedbackPage />
    </>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
