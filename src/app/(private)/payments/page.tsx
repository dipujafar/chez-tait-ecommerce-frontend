import { Metadata } from "next";
import PaymentsContainer from "./_components/PaymentsContainer";
import TopbarBanner from "@/components/shared/TopbarBanner";
import Container from "@/components/shared/Container";

export const metadata: Metadata = {
  title: "Payments",
  description: "Payments page of Chez Tati",
};
const PaymentsPage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-10">
        <PaymentsContainer></PaymentsContainer>
      </Container>
    </div>
  );
};

export default PaymentsPage;
