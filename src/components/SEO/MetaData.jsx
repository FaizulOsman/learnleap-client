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
      <title>
        {title?.length > 0
          ? title
          : "Apple iPhone 15 Pro Max - Full phone specifications"}
      </title>
      <meta
        name="description"
        content={
          descriptionContent?.length > 0
            ? descriptionContent
            : "Apple iPhone 15 Pro Max smartphone. Announced Sep 2023. Features 6.7″  display, Apple A17 Pro chipset, 4441 mAh battery, 1024 GB storage, 8 GB RAM, Ceramic Shield glass."
        }
      />
      <meta
        name="keywords"
        content={
          keywordContent?.length > 0
            ? keywordContent
            : "Apple iPhone 15 Pro Max,Apple,iPhone 15 Pro Max,GSM,mobile,phone,cellphone,information,info,specs,specification,opinion,review"
        }
      />
      <meta
        property="og:image"
        content={
          imageContent?.length > 0
            ? imageContent
            : "https://www.apple.com/v/iphone-15-pro/b/images/meta/iphone-15-pro_specs__e2210nw0aniq_og.png?202310231416"
        }
      />
      <meta
        property="og:url"
        content={
          urlContent?.length > 0
            ? urlContent
            : "https://www.apple.com/iphone-15-pro/specs/"
        }
      />
      <meta
        property="og:title"
        content={
          titleContent?.title > 0
            ? titleContent
            : "iPhone 15 Pro and 15 Pro Max - Technical Specifications"
        }
      />
      <meta
        property="og:description"
        content={
          descriptionContent?.length > 0
            ? descriptionContent
            : "View all technical specifications for iPhone 15 Pro and iPhone 15 Pro Max."
        }
      />
      <meta
        property="og:site_name"
        content={siteNameContent?.length > 0 ? siteNameContent : "Apple"}
      />
      <meta
        property="og:type"
        content={typeContent?.length > 0 ? typeContent : "website"}
      />
      <meta
        property="og:locale"
        content={localeContent.length > 0 ? localeContent : "en_US"}
      />
    </Head>
  );
};

export default MetaData;
