import SignUpForm from "@/components/(auth)/sign-up/SignUpForm";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";

const SignUpPage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-[70px] flex justify-center">
        <SignUpForm></SignUpForm>
      </Container>
    </div>
  );
};

export default SignUpPage;
