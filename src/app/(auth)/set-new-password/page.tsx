import SetNewPassForm from "@/components/(auth)/set-new-password/SetNewPassForm";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";

const SetNewpassword = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-[100px] flex justify-center">
       <SetNewPassForm></SetNewPassForm>
      </Container>
    </div>
  );
};

export default SetNewpassword;
