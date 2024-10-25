import ProductDetailsContainer from "@/components/(public)/products/[id]/ProductDetailsContainer";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Product Details",
  description:
    "Explore detailed information about Chez Tati's products, including features, specifications, customer reviews, and pricing. Make informed decisions before adding items to your cart.",
};
const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-8">
        <ProductDetailsContainer
          productsId={params.id}
        ></ProductDetailsContainer>
      </Container>
    </div>
  );
};

export default ProductDetailsPage;
