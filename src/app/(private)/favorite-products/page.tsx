import FavoriteProductsContainer from "@/components/(private)/favorite-products/FavoriteProductsContainer";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Wishlist",
  description:
    "View and manage your saved products in the Chez Tati Wishlist. Keep track of your favorite items and shop when you're ready, with just a few clicks.",
};
const FavoriteProducts = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-10">
        <FavoriteProductsContainer></FavoriteProductsContainer>
      </Container>
    </div>
  );
};

export default FavoriteProducts;
