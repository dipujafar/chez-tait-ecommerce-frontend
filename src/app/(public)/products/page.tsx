import ProductsContainer from "@/components/(public)/products/ProductsContainer";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse a wide range of products at Chez Tati, including the latest fashion, electronics, home goods, and more. Discover high-quality items at competitive prices, tailored to meet all your shopping needs.",
};

const ProductsPage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-7">
        <ProductsContainer></ProductsContainer>
      </Container>
    </div>
  );
};

export default ProductsPage;
