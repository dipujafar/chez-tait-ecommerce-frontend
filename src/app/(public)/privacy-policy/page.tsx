import PrivacyPolicyContainer from "@/components/(public)/privacy-policy/PrivacyPolicyContainer";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy ",
  description:
    "Read Chez Tati's Privacy Policy to learn how we collect, use, and protect your personal information. We are committed to ensuring the privacy and security of your data while you shop with us.",
};

const PrivacyPolicyPage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-10">
        <PrivacyPolicyContainer></PrivacyPolicyContainer>
      </Container>
    </div>
  );
};

export default PrivacyPolicyPage;
