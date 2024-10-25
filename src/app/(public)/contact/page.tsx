import ContactContainer from "@/components/(public)/contact/ContactContainer";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Chez Tati! We're here to assist you with any inquiries or support you may need. Contact us via message our online form for prompt assistance.",
};
const ContactPage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-10">
        <ContactContainer></ContactContainer>
      </Container>
    </div>
  );
};

export default ContactPage;
