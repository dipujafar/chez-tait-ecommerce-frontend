import Container from "@/components/shared/Container";

import TrendingProducts from "./trendingProducts/TrendingProducts";
import CustomerExprience from "./CustomerExprience";
import Feedbacks from "./Feedbacks";
import HeroSection from "./heroSection/HeroSection";

const HomePageContainer = () => {
  return (
    <>
      <hr />
      <Container className="space-y-28">
        <HeroSection></HeroSection>
        <TrendingProducts></TrendingProducts>
        <CustomerExprience></CustomerExprience>
        {/* <Feedbacks></Feedbacks> */}
      </Container>
    </>
  );
};

export default HomePageContainer;
