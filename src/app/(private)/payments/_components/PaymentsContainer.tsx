"use client";
import { Error_Modal } from "@/utils/models";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { redirect } from "next/navigation";
import CheckoutForm from "./CheckoutFrom";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
);
const PaymentsContainer = () => {
  const clientSecret = sessionStorage.getItem("clientSecret-key");

  // If client secret not found redirect
  if (!clientSecret) {
    Error_Modal({ title: "Something went wrong!", text: "Please try again" });
    return redirect("/");
  }

  const appearance: any = {
    theme: "stripe",
    variables: {
      fontWeightNormal: "500",
      borderRadius: "8px",
      colorPrimary: "#fe6201",
      tabIconSelectedColor: "#fff",
      gridRowSpacing: "20px",
    },
    rules: {
      ".Tab, .Input, .Block, .CheckboxInput, .CodeInput": {
        boxShadow: "0px 3px 10px rgba(18, 42, 66, 0.08)",
      },
      ".Block": {
        borderColor: "transparent",
      },
      ".BlockDivider": {
        backgroundColor: "#ebebeb",
      },
      ".Tab, .Tab:hover, .Tab:focus": {
        border: "0",
      },
      ".Tab--selected, .Tab--selected:hover": {
        backgroundColor: "#f360a6",
        color: "#fff",
      },
    },
  };

  return (
    <div>
      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentsContainer;
