import ReviewContainer from "@/components/(private)/review/ReviewContainer";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share a Review",
  description:
    "Share your feedback and reviews on Chez Tati products. Help others by sharing your shopping experience and let us know how we can improve our services.",
};

const ReviewPage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-10">
        <ReviewContainer></ReviewContainer>
      </Container>
    </div>
  );
};

export default ReviewPage;
