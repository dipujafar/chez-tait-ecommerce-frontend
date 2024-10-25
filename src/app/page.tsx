import HomePageContainer from "@/components/(public)/home/HomePageContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Chez Tati",
  description:
    "Welcome to Chez Tati, your go-to online store for a wide selection of high-quality products. Explore our latest collections, special offers, and enjoy a seamless shopping experience with fast shipping and excellent customer service.",
};

export default function Home() {
  return <HomePageContainer></HomePageContainer>;
}
