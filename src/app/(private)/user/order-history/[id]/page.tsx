import React from "react";
import SingleOrderDetails from "./_components/SingleOrderDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details",
  description:
    "View your past orders with Chez Tati. Track order statuses, review purchase details, and easily reorder your favorite items from your order history.",
};

const SingleOrderDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <SingleOrderDetails orderId={params?.id}></SingleOrderDetails>
    </div>
  );
};

export default SingleOrderDetailsPage;
