import ForgetPasswordFrom from "@/components/(auth)/forget-password/ForgetPasswordFrom";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";

const ForgetPasswordpage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-[100px] flex justify-center">
        <ForgetPasswordFrom></ForgetPasswordFrom>
      </Container>
    </div>
  );
};

export default ForgetPasswordpage;
