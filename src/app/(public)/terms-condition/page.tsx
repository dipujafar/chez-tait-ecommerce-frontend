import TermsContainer from "@/components/(public)/terms/TermsContainer";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Review Chez Tati's Terms and Conditions to understand the rules and guidelines for using our website, making purchases, and engaging with our services. Ensure you are informed about your rights and responsibilities as a customer.",
};

const TermsPage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-10">
        <TermsContainer></TermsContainer>
      </Container>
    </div>
  );
};

export default TermsPage;
