"use client";

import { useConfirmPaymentMutation } from "@/redux/api/paymentApi";

import { TError } from "@/types/types";
import Loading from "@/utils/Loading";
import { Error_Modal, Success_model } from "@/utils/models";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { text } from "stream/consumers";

const PaymentsConfirm = ({ orderId }: { orderId: string }) => {
  const router = useRouter();
  const paymentIntentId = useSearchParams().get("payment_intent");

  const [confirmPayment, { isLoading: isPaymentConfirming }] =
    useConfirmPaymentMutation();

  useEffect(() => {
    const handleConfirmPayment = async () => {
      try {
        const res = await confirmPayment({
          orderId,
          paymentIntentId,
        }).unwrap();

        // check if payment is successful, then remove client secret, then show success ,then redirect to order history
        if (res?.success) {
          sessionStorage.removeItem("clientSecret-key");
          Success_model({
            title: "congratulation Payment Successful",
            text: "We will contact you soon",
          });
          router.push(`/user/order-history/${orderId}`);
        }
      } catch (error: TError | any) {
        Error_Modal({ title: error?.data?.message });
        router.push("/");
      }
    };

    if (paymentIntentId && orderId) {
      handleConfirmPayment();
    }
  }, [orderId, paymentIntentId]);
  return <div>{isPaymentConfirming && <Loading size={36}></Loading>}</div>;
};

export default PaymentsConfirm;
