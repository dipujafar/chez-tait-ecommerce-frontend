"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TCartProduct } from "@/types/types";
import Empty from "@/utils/Empty";
import { ConfirmModal, Error_Modal, Success_model } from "@/utils/models";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  clearCart,
  removeProduct,
  updateQuantity,
} from "@/redux/features/cartSlice";
import { useState } from "react";
import discountedPrice from "@/utils/discountedPrice";
import ContinueToLoginModal from "@/utils/ContinueToLoginModal";
import { useRouter } from "next/navigation";

const ShoppingCartContainer = () => {
  // Initialize state with quantities from productData

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const {
    items: cart,
    totalAmount,
    subTotal,
  } = useAppSelector((state) => state.cart);

  const handleProductQuantity = (cartId: string, quantity: number) => {
    const findProduct = cart?.find(
      (product: TCartProduct) => product?.cartId === cartId,
    );

    // @ts-ignore
    if (findProduct?.stock < quantity) {
      Error_Modal({ title: "Product quantity can't be more than stock!" });

      return;
    }

    // @ts-ignore
    dispatch(updateQuantity({ cartId, quantity }));
  };

  const handleDeleteCartProduct = (cardId: string) => {
    ConfirmModal("Are you sure?", "Remove").then((result) => {
      if (result.isConfirmed) {
        dispatch(removeProduct(cardId));
        Success_model({ title: "Removed from cart" });
      }
    });
  };

  const handleClearCart = () => {
    ConfirmModal(
      "All products will be removed from your cart!",
      "Remove",
      "Yes, Remove All",
    ).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        Success_model({ title: "Cart cleared" });
      }
    });
  };

  const handleCreateOrder = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    ConfirmModal(
      "Are you sure?",
      "you want to create an order",
      "Continue",
    ).then((result) => {
      if (result.isConfirmed) {
        router.push("/checkout");
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-black lg:text-4xl">
        My Shopping Cart
      </h1>
      {cart?.length ? (
        <div className="mt-10 grid grid-cols-1 items-center justify-center gap-7 xl:grid-cols-3">
          <div className="col-span-2 rounded-md py-5 shadow-md">
            <Table className="w-full overflow-x-auto lg:text-lg">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart?.map((data: TCartProduct, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="min-w-fit font-medium">
                      <div className="flex min-w-fit flex-col items-center gap-3 lg:flex-row lg:text-lg">
                        <Image
                          src={data?.images[0]?.url}
                          alt="product_image"
                          width={950}
                          height={700}
                          className="size-28 truncate rounded-2xl"
                        />
                        <p>{data?.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      ${discountedPrice(data?.price, data?.discount)}
                      {Number(data?.discount) > 0 && (
                        <s className="ml-1 text-sm text-primary-gray">
                          ${data?.price}
                        </s>
                      )}
                    </TableCell>
                    <TableCell>
                      {/* quantity */}
                      <div className="flex max-w-fit items-center gap-x-3 rounded-full border-2">
                        <Button
                          onClick={() => {
                            handleProductQuantity(
                              data?.cartId,
                              Number(data?.quantity) - 1,
                            );
                          }}
                          className={`bg-light-gray ${
                            Number(data?.quantity) === 1 && "text-primary-gray"
                          } text flex size-10 items-center justify-center rounded-full text-xl text-black shadow-md duration-500 hover:bg-primary-color hover:text-primary-white`}
                          disabled={Number(data?.quantity) === 1}
                        >
                          -
                        </Button>
                        <p>{data?.quantity}</p>
                        <Button
                          onClick={() => {
                            handleProductQuantity(
                              data?.cartId,
                              Number(data?.quantity) + 1,
                            );
                          }}
                          className="flex size-10 items-center justify-center rounded-full bg-light-gray text-lg text-black shadow-md duration-500 hover:bg-primary-color hover:text-primary-white"
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      $
                      {(
                        Number(discountedPrice(data?.price, data?.discount)) *
                        Number(data?.quantity)
                      ).toFixed(2)}
                      {Number(data?.discount) > 0 && (
                        <s className="ml-1 text-sm text-primary-gray">
                          ${Number(data?.price) * Number(data?.quantity)}
                        </s>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        onClick={() => handleDeleteCartProduct(data?.cartId)}
                        className="flex size-8 cursor-pointer items-center justify-center rounded-full border text-primary-gray hover:bg-primary-gray hover:text-red-500"
                      >
                        <X size={20} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <hr />
            <div className="mt-5 flex justify-between px-4">
              <Link href="/products">
                <Button className="bg-light-gray text-primary-black hover:text-primary-white">
                  Return to shop
                </Button>
              </Link>
              <Button
                onClick={handleClearCart}
                className="bg-light-gray text-primary-black hover:text-primary-white"
              >
                Clear Carte
              </Button>
            </div>
          </div>

          {/* cart statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Cart Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex justify-between py-5">
                  <p>Subtotal:</p>
                  <p className="font-medium">${subTotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className="flex justify-between py-5">
                  <p>Discount:</p>
                  <p className="font-medium">
                    ${(Number(subTotal) - Number(totalAmount)).toFixed(2)}
                  </p>
                </div>
                <hr />
                <div className="flex justify-between py-5">
                  <p>Total:</p>
                  <p className="font-medium">${totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCreateOrder}
                className="w-full rounded-full bg-primary-color"
              >
                Proceed to checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div>
          <Empty message="Your cart is empty"></Empty>
          <Button
            className="group mx-auto mt-10 flex max-w-max items-center gap-x-1 font-medium text-muted-foreground"
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
      )}
      <ContinueToLoginModal
        setOpen={setShowLoginModal}
        open={showLoginModal}
      ></ContinueToLoginModal>
    </div>
  );
};

export default ShoppingCartContainer;
