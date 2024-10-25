import VerifyOtpForm from "@/components/(auth)/verify-otp/VerifyOtpForm";
import Container from "@/components/shared/Container";
import TopbarBanner from "@/components/shared/TopbarBanner";
import React from "react";

const VerifyOtpPage = () => {
  return (
    <div>
      <TopbarBanner></TopbarBanner>
      <Container className="mt-[100px] flex justify-center">
        <VerifyOtpForm></VerifyOtpForm>
      </Container>
    </div>
  );
};

export default VerifyOtpPage;
