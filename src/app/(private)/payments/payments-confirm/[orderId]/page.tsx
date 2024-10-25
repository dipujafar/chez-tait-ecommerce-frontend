import React from "react";
import PaymentsConfirm from "./_components/PaymentsConfirm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Confirm",
  description: "Payment Confirm Page",
};

const PaymentConfirmPage = ({
  params: { orderId },
}: {
  params: { orderId: string };
}) => {
  return (
    <div>
      <PaymentsConfirm orderId={orderId}></PaymentsConfirm>
    </div>
  );
};

export default PaymentConfirmPage;
