import React from "react";
import OrderHistrory from "./_components/OrderHistrory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order History",
  description:
    "View your past orders with Chez Tati. Track order statuses, review purchase details, and easily reorder your favorite items from your order history.",
};
const OrderHistoryPage = () => {
  return (
    <div>
      <OrderHistrory></OrderHistrory>
    </div>
  );
};

export default OrderHistoryPage;
