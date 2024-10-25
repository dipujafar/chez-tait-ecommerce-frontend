"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProgressBar } from "@/components/ui/stepsprogress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
import { useGetProfileDataQuery } from "@/redux/api/profileApi";
import { TOrderItems } from "@/types/types";
import { ChevronRight, Dot, ShieldX } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const SingleOrderDetails = ({ orderId }: { orderId: string }) => {
  const { data: orderData, isLoading: isOrderDataLoading } =
    useGetSingleOrderQuery(orderId);
  const { data: profileData, isLoading: isProfileDataLoading } =
    useGetProfileDataQuery(undefined);

  // check order status
  const checkStatus = (status: string) => {
    if (status === "pending") {
      return 0;
    } else if (status === "processing") {
      return 1;
    } else if (status === "onTheWay") {
      return 2;
    } else if (status === "delivered") {
      return 3;
    } else {
      return 1;
    }
  };

  return isOrderDataLoading || isProfileDataLoading ? (
    <div className="space-y-5">
      <Skeleton className="h-[60px]"></Skeleton>
      <Skeleton className="h-[60px]"></Skeleton>
      <Skeleton className="h-[500px]"></Skeleton>
    </div>
  ) : (
    <div className="dashboard-card py-6">
      <div className="mb-5 flex flex-col items-center justify-between gap-2 px-4 md:flex-row">
        <div className="flex items-center justify-center gap-x-1">
          <h3 className="text-2xl font-medium">Order Details</h3>
          <Dot className="hidden md:block" />
          <p className="">{moment(orderData?.data?.createdAt).format("LL")}</p>
          <Dot className="hidden md:block" />
          <p>{orderData?.data?.items?.length} products</p>
        </div>
        <div>
          <Link href="/user/order-history">
            <p className="font-medium text-primary-color underline">
              Back to List
            </p>
          </Link>
        </div>
      </div>
      <hr />
      <div className="flex flex-col justify-between gap-7 px-7 py-6 lg:flex-row">
        {/* order Address */}
        <div className="flex flex-1 flex-col rounded border md:flex-row">
          {/* billing address */}
          <div className="flex-1 border-r">
            <h1 className="border-b px-7 py-5 text-primary-gray">
              Billing Address
            </h1>
            <div className="px-7 py-5">
              <h2>{profileData?.data?.name}</h2>
              {/* if have user profile address then show else show order address */}
              <p className="text-primary-gray">
                {profileData?.data?.country
                  ? ` ${profileData?.data?.address} ${profileData?.data?.address?.split(",")[1] ? "No. house" : ""}, ${profileData?.data?.city}, ${profileData?.data?.states}, ${profileData?.data?.country}`
                  : `${orderData?.data?.billingDetails?.address},
                ${orderData?.data?.billingDetails?.city}, 
                ${orderData?.data?.billingDetails?.states}, 
                ${orderData?.data?.billingDetails?.country}`}
              </p>
              <p className="mt-10 text-primary-gray">Email</p>
              <p>{profileData?.data?.email}</p>
              <p className="mt-3 text-primary-gray">Phone</p>
              <p>
                {/* if have user profile phone number then show else show order phone number */}
                {profileData?.data?.phoneNumber
                  ? profileData?.data?.phoneNumber
                  : orderData?.data?.billingDetails?.phoneNumber}
              </p>
            </div>
          </div>

          {/* shipping address */}
          <div className="flex-1">
            <h1 className="border-b px-7 py-5 text-primary-gray">
              Shipping Address
            </h1>
            <div className="px-7 py-5">
              <h2>{orderData?.data?.billingDetails?.name}</h2>
              <p className="text-primary-gray">
                {`${orderData?.data?.billingDetails?.address},
                ${orderData?.data?.billingDetails?.city}, 
                ${orderData?.data?.billingDetails?.states}, 
                ${orderData?.data?.billingDetails?.country}`}
              </p>
              <p className="mt-10 text-primary-gray">Email</p>
              <p>{orderData?.data?.billingDetails?.email}</p>
              <p className="mt-3 text-primary-gray">Phone</p>
              <p>{orderData?.data?.billingDetails?.phoneNumber}</p>
            </div>
          </div>
        </div>
        {/* order payment related details */}
        <div className="rounded border">
          <div className="">
            <div className="gap-x-2 border-b border-r px-2 py-5">
              <h3 className="text-center text-primary-gray">Order ID:</h3>
              <p className="text-center">{orderData?.data?.id}</p>
            </div>

            <div className="items-center border-b px-2 py-5">
              <h3 className="text-center text-primary-gray">Payment Method:</h3>
              <p className="text-center">
                {orderData?.data?.paymentStatus == "cashOnDelivery"
                  ? "Cash On Delivery"
                  : "Stripe"}
              </p>
            </div>

            <div className="items-center border-b px-2 py-5">
              <h3 className="text-center text-primary-gray">Payment Status:</h3>
              <p className="text-center">
                {orderData?.data?.paymentStatus === "cashOnDelivery" &&
                  "Cash On Delivery"}
                {orderData?.data?.paymentStatus !== "cashOnDelivery"
                  ? orderData?.data?.paymentStatus === "paid"
                    ? "Paid"
                    : "Unpaid"
                  : ""}
              </p>
            </div>
          </div>

          <div className="px-6 py-5">
            <div className="flex justify-between gap-x-2 py-3">
              <h3 className="text-xl">Total </h3>
              <p className="text-xl font-semibold text-primary-red">
                ${orderData?.data?.totalAmount?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* progressdbar */}
      <div className="mx-auto mt-10 px-2 pl-14 lg:w-3/4 lg:pl-10">
        {orderData?.data?.paymentStatus === "cancelled" ? (
          // if payment status is cancelled then show this
          <div className="flex flex-col items-center justify-center gap-1">
            <ShieldX color="red" size={36} className="mx-auto" />
            <p className="text-center">Sorry your order has been cancelled</p>
            <Button
              className="group mx-auto mt-2 flex max-w-max items-center gap-x-1 font-medium text-muted-foreground"
              variant="secondary"
              asChild
            >
              <Link href="/products">
                Explore all products
                <ChevronRight
                  size={15}
                  className="transition-all duration-300 ease-in-out group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </div>
        ) : (
          // if payment status is not cancelled then show this
          <ProgressBar
            stages={["Order Received", "Processing", "On the way", "Delivered"]}
            percent={1}
            currentStage={checkStatus(orderData?.data?.paymentStatus)}
          />
        )}
      </div>

      {/* product table */}
      <Table className="mt-20 w-full overflow-x-auto">
        <TableHeader>
          <TableRow className="bg-light-gray">
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Subtotal</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderData?.data?.items?.map((data: TOrderItems, idx: number) => (
            <TableRow key={idx}>
              <TableCell className="min-w-fit font-medium">
                <div className="flex min-w-fit flex-col items-center gap-3 lg:flex-row">
                  <Image
                    src={data?.product?.images[0]?.url}
                    alt="product_image"
                    width={950}
                    height={700}
                    className="size-10 rounded md:size-28"
                  />
                  <p>{data?.product?.name}</p>
                </div>
              </TableCell>
              <TableCell>${data?.product?.price.toFixed(2)}</TableCell>
              <TableCell>x{data?.quantity}</TableCell>
              <TableCell>
                $
                {(
                  Number(data?.quantity) * Number(data?.product?.price)
                ).toFixed(2)}
              </TableCell>
              <TableCell>{data?.discount}%</TableCell>
              <TableCell className="font-semibold">
                ${(data?.totalPrice).toFixed(2)}
              </TableCell>
              <TableCell
                className={cn(
                  orderData?.data?.status === "delivered" ? "" : "hidden",
                )}
              >
                <Link href={`/review?product=${data?.product?._id}`}>
                  <p className="font-medium text-primary-color underline">
                    Feedback
                  </p>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SingleOrderDetails;
