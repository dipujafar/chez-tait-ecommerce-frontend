import CheckoutContainer from "@/components/(private)/checkout/CheckoutContainer";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your purchase at Chez Tati with our secure and easy-to-use checkout process. Review your order, enter your shipping details, and finalize payment for a seamless shopping experience.",
};

const CheckoutPage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-10">
        <CheckoutContainer></CheckoutContainer>
      </Container>
    </div>
  );
};

export default CheckoutPage;
