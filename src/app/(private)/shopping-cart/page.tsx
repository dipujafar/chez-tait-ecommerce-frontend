import ShoppingCartContainer from "@/components/(private)/shopping-cart/ShoppingCartContainer";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review the items in your shopping cart at Chez Tati. Proceed to checkout or continue shopping to find more great products. Enjoy a seamless and secure shopping experience.",
};

const ShoppingCartPage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-10">
        <ShoppingCartContainer></ShoppingCartContainer>
      </Container>
    </div>
  );
};

export default ShoppingCartPage;
