import AboutUsContainer from "@/components/(public)/about-us/AboutUsContainer";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Chez Tati, the premier e-commerce platform offering a wide range of high-quality products tailored for all your needs. Discover our mission, values, and commitment to providing exceptional service.",
};

const AboutPage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-10">
        <AboutUsContainer></AboutUsContainer>
      </Container>
    </div>
  );
};

export default AboutPage;
