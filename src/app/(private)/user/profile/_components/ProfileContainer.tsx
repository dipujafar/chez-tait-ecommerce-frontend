"use client";
import "../../User.css";
// import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPinHouse, Phone } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProfileDataQuery } from "@/redux/api/profileApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { TOrderData } from "@/types/types";
import moment from "moment";
import Empty from "@/utils/Empty";

const TABLE_HEADERS = [
  "Order ID",
  "Date",
  // "Quantity",
  "Total",
  "Status",
  "Action",
];

export default function ProfileContainer() {
  const { data: userData, isLoading: isProfileDataLoading } =
    useGetProfileDataQuery(undefined);

  const { data: orderData, isLoading: isOrderDataLoading } =
    useGetOrdersQuery(undefined);

  return (
    <div className="space-y-8 text-primary-black">
      {/* Profile Details */}
      {isProfileDataLoading ? (
        <div className="flex flex-col items-stretch gap-x-8 gap-y-8 lg:flex-row">
          <Skeleton className="h-[250px] rounded-xl lg:w-[60%]" />

          <Skeleton className="h-[250px] rounded-xl lg:w-[40%]" />
        </div>
      ) : (
        <div className="flex flex-col items-stretch gap-x-8 gap-y-8 lg:flex-row">
          <div className="dashboard-card flex flex-col items-center justify-center space-y-4 py-8 text-center lg:w-[60%]">
            <Avatar className="size-36">
              <AvatarImage src={userData?.data?.image} />
              <AvatarFallback className="text-3xl uppercase">
                {userData?.data?.name?.split(" ").length > 1 ? (
                  <p>
                    {userData?.data?.name?.split(" ")[0].slice(0, 1)}
                    {userData?.data?.name?.split(" ")[1].slice(0, 1)}
                  </p>
                ) : (
                  userData?.data?.name?.split(" ")[0].slice(0, 2)
                )}
              </AvatarFallback>
            </Avatar>

            <div>
              <h5 className="text-2xl font-bold text-primary-black">
                {userData?.data?.name}
              </h5>
              <p className="mb-3 mt-1 text-base text-muted-foreground">
                {userData?.data?.role === "admin" ? "Admin" : "Customer"}
              </p>

              <Link
                href="/user/account-settings#profile"
                className="dashboard-primary-link"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="dashboard-card px-8 py-6 lg:w-[40%]">
            <p className="font-medium uppercase text-muted-foreground">
              Billing Address
            </p>

            <h4 className="my-4 text-xl font-semibold">
              {userData?.data?.name}
            </h4>

            <div className="space-y-3 text-lg">
              <p className="flex items-center gap-x-3 font-medium text-primary-black/75">
                <Mail size={22} />
                {userData?.data?.email ? userData?.data?.email : "N/A"}
              </p>
              <p className="flex items-center gap-x-3 font-medium text-primary-black/75">
                <MapPinHouse size={22} />{" "}
                {userData?.data?.states && userData?.data?.states},
                {userData?.data?.city && userData?.data?.city},
                {userData?.data?.address && userData?.data?.address}
              </p>
              <p className="flex items-center gap-x-3 font-medium text-primary-black/75">
                <Phone size={22} />{" "}
                {userData?.data?.phoneNumber
                  ? userData?.data?.phoneNumber
                  : "N/A"}
              </p>
            </div>

            <Link href={"/user/account-settings#address"}>
              <button className="dashboard-primary-link mt-7">
                Edit Address
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Recent Order History */}
      {isOrderDataLoading ? (
        <Skeleton className="h-[325px] w-full rounded-xl" />
      ) : (
        <div className="dashboard-card py-6">
          <div className="mb-5 flex items-center justify-between px-4">
            <h3 className="text-2xl font-medium">Recent Order History</h3>
            <Link
              href="/user/order-history"
              type="button"
              className="dashboard-primary-link"
            >
              View All
            </Link>
          </div>

          {orderData?.data?.length == 0 ? (
            <Empty message="No order found"></Empty>
          ) : (
            <Table>
              <TableCaption>
                A list of {userData?.data?.name} recent orders
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-scale-50">
                  {TABLE_HEADERS.map((header) => (
                    <TableHead key={header} className="text-center">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="p-6 text-center font-medium">
                {orderData?.data?.slice(0, 6)?.map((data: TOrderData) => (
                  <TableRow key={data._id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>
                      {moment(data?.createdAt).format("MMMM Do YYYY")}
                    </TableCell>
                    {/* <TableCell>{data.quantity}</TableCell> */}
                    <TableCell>${data.totalAmount?.toFixed(2)}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>
                      <Link
                        href={`/user/order-history/${data._id}`}
                        className="dashboard-primary-link"
                        style={{ fontSize: "1rem" }}
                      >
                        View Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
}
