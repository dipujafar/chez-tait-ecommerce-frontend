import SignForm from "@/components/(auth)/sign-in/SignForm";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";


const SignPage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-[70px] flex justify-center">
        <SignForm></SignForm>
      </Container>
    </div>
  );
};

export default SignPage;
