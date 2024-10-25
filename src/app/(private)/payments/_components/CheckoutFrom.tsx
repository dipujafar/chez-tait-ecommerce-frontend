import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./payment.css";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import { Error_Modal, Success_model } from "@/utils/models";
import { toast } from "sonner";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
import { Button } from "@/components/ui/button";

export const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  // Get order info
  const orderId = useSearchParams().get("order");
  const { data: orderRes } = useGetSingleOrderQuery(orderId, {
    skip: !orderId,
  });
  const order = orderRes?.data || [];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/payments/payments-confirm/${orderId}`,
        },
      });

      if (result.error) {
        Error_Modal({ title: `${result.error.message}` });
      } else {
        Success_model({ title: "Payment successful" });
      }
    } catch (error: any) {
      toast.error(
        typeof error?.message === "string" ? error?.message : "Something wrong",
      );
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-fit justify-center rounded-lg border p-10 shadow-lg"
      style={{
        boxShadow: "0px 0px 5px rgb(254 98 1 / 0.3)",
      }}
    >
      <div>
        <PaymentElement />
        <Button
          type="submit"
          disabled={!stripe || loading}
          className="w-full overflow-x-hidden rounded-lg bg-primary-color py-2 text-center disabled:bg-gray-300"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-x-3">
              <Loader size={20} className="animate-spin" />
              Processing...
            </div>
          ) : (
            `Pay $${order?.totalAmount?.toFixed(2)}`
          )}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
