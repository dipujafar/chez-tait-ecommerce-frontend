"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { TOrderData } from "@/types/types";
import Empty from "@/utils/Empty";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";

const TABLE_HEADERS = [
  "Order ID",
  "Date",
  // "Quantity",
  "Total",
  "Status",
  "Action",
];

const OrderHistrory = () => {
  const { data: orderData, isLoading: isOrderDataLoading } =
    useGetOrdersQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 8;

  return (
    <div>
      {/* Recent Order History */}
      {isOrderDataLoading ? (
        <Skeleton className="h-[400px] w-full rounded-xl" />
      ) : (
        <div className="dashboard-card py-6">
          <div className="mb-5 flex items-center justify-between px-4">
            <h3 className="text-2xl font-medium">Order History</h3>
          </div>

          {orderData?.data.length === 0 ? (
            <Empty message="No order found"></Empty>
          ) : (
            <>
              <Table>
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
                  {orderData?.data
                    ?.slice(
                      (currentPage - 1) * pagePostsLimit,
                      currentPage * pagePostsLimit,
                    )
                    ?.map((data: TOrderData) => (
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
              <div className="mt-10 text-end">
                <Pagination
                  currentPage={currentPage}
                  itemsPerPage={pagePostsLimit}
                  onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                  totalItems={orderData?.data.length}
                  pageNeighbours={2}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistrory;
