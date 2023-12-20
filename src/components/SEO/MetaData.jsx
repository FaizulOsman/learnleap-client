import Head from "next/head";
import React from "react";

const MetaData = ({
  title,
  keywordContent,
  imageContent,
  urlContent,
  titleContent,
  descriptionContent,
  siteNameContent,
  typeContent,
  localeContent,
}) => {
  return (
    <Head>
      <title>{title?.length > 0 ? title : "Learn Leap"}</title>
      <meta
        name="description"
        content={
          descriptionContent?.length > 0
            ? descriptionContent
            : "Learn Leap, Exam, MCQ, Test, Discussion, Discuss, Bookmark"
        }
      />
      <meta
        name="keywords"
        content={
          keywordContent?.length > 0
            ? keywordContent
            : "learn leap,learnleap,learn-leap,test,exam,discussion,random-question,bookmark"
        }
      />
      <meta
        property="og:image"
        content={
          imageContent?.length > 0
            ? imageContent
            : "https://i.ibb.co/S33Tq0K/logo-nobg-n.png"
        }
      />
      <meta
        property="og:url"
        content={
          urlContent?.length > 0
            ? urlContent
            : "https://i.ibb.co/S33Tq0K/logo-nobg-n.png"
        }
      />
      <meta
        property="og:title"
        content={
          titleContent?.title > 0 ? titleContent : "Learn Leap - Test Yourself"
        }
      />
      <meta
        property="og:description"
        content={
          descriptionContent?.length > 0
            ? descriptionContent
            : "Challenge your friends or make new ones in our competitive exams . See who reigns supreme on the leaderboard!"
        }
      />
      <meta
        property="og:site_name"
        content={siteNameContent?.length > 0 ? siteNameContent : "Learn Leap"}
      />
      <meta
        property="og:type"
        content={typeContent?.length > 0 ? typeContent : "website"}
      />
      <meta
        property="og:locale"
        content={localeContent?.length > 0 ? localeContent : "en_US"}
      />
    </Head>
  );
};

export default MetaData;
