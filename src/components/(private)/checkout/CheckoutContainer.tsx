"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CountryStateCitySelector from "@/components/ui/CountryStateCitySelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { useCreatePaymentIntentMutation } from "@/redux/api/paymentApi";
import { useGetProfileDataQuery } from "@/redux/api/profileApi";
import { clearCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TError, TProduct } from "@/types/types";
import discountedPrice from "@/utils/discountedPrice";
import Loading from "@/utils/Loading";
import { Error_Modal, Success_model } from "@/utils/models";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "sonner";

// Define form input types
interface CheckoutFormInputs {
  name: string;
  email: string;
  phoneNumber: string;
  paymentMethod: string;
  country: string;
  state: string;
  city: string;
  area: string;
  house: string;
}

const paymentMethods = [
  {
    id: "1",
    name: "Stripe",
    value: "stripe",
  },
  {
    id: "2",
    name: "Cash On Delivery",
    value: "cashOnDelivery",
  },
];

const CheckoutContainer = () => {
  const { data: userData, isLoading: isProfileDataLoading } =
    useGetProfileDataQuery(undefined);
  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [paymentIntent, { isLoading: isPaymentIntentLoading }] =
    useCreatePaymentIntentMutation();

  const {
    items: cart,
    totalAmount,
    subTotal,
  } = useAppSelector((state) => state.cart);

  // Convert cart items to order items
  const orderItems = cart?.map((item: TProduct) => {
    return {
      product: item._id,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount,
      totalPrice:
        Number(discountedPrice(item.price, item.discount)) *
        Number(item.quantity),
    };
  });

  // Setup useForm with default values
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<CheckoutFormInputs>({});

  // Form submission for  create order and payment
  const onSubmit: SubmitHandler<CheckoutFormInputs> = async (data) => {
    // check if payment method is selected
    if (!data?.paymentMethod) {
      toast.error("Please select a payment method", {
        duration: 1500,
      });
      return;
    }

    // check if all required fields are filled
    if (!data?.name || !data?.country || !data?.state) {
      toast.error("Please fill all the required fields billing address ", {
        duration: 1500,
      });
      return;
    }

    if (!data?.area) {
      toast.error("Please Input Your Area ", {
        duration: 1500,
      });
      return;
    }

    if (!data?.phoneNumber && !userData?.data?.phoneNumber) {
      toast.error(
        "Please provide a phone number or add a phone number in your profile",
        {
          duration: 1500,
        },
      );

      return;
    }

    // if (!data?.city && !userData?.data?.city) {
    //   toast.error("Please provide a city or add a city in your profile", {
    //     duration: 1500,
    //   });
    // }

    const billingAddressData = {
      name: data?.name,
      email: data?.email || userData?.data?.email,
      phoneNumber: data?.phoneNumber || userData?.data?.phoneNumber,
      country: data?.country,
      states: data?.state,
      city: data?.city || userData?.data?.city,
      address: `${data?.area}, ${data?.house ? `${data?.house} No. house` : ""} `,
    };

    // order confirmation for cash on delivery
    if (data?.paymentMethod === "cashOnDelivery") {
      const orderData = {
        totalAmount: totalAmount,
        paymentStatus: "cashOnDelivery",
        billingDetails: billingAddressData,
        items: orderItems,
      };

      try {
        const res = await createOrder(orderData).unwrap();
        Success_model({ title: "Order created successfully" });
        dispatch(clearCart());
        router.push(`/user/order-history/${res?.data?._id}`);
        return;
      } catch (error: TError | any) {
        Error_Modal(error?.data?.message);
      }
    }

    // order confirmation for stripe
    if (data?.paymentMethod === "stripe") {
      const orderData = {
        totalAmount: totalAmount,
        billingDetails: billingAddressData,
        items: orderItems,
      };

      try {
        const res = await createOrder(orderData).unwrap();

        // if order is created successfully, then create payment intent
        if (res?.data?._id) {
          // formatting payment intent data
          const paymentIntentData = {
            order: res?.data?._id,
            billingDetails: {
              name: res?.data?.billingDetails?.name,
              location: `${res?.data?.billingDetails?.address}, ${res?.data?.billingDetails?.city}, ${res?.data?.billingDetails?.states},  ${res?.data?.billingDetails?.country}`,
              phoneNumber: res?.data?.billingDetails?.phoneNumber,
              email: res?.data?.billingDetails?.email,
            },
          };

          // send request to create payment intent
          const paymentIntentRes =
            await paymentIntent(paymentIntentData).unwrap();

          // setting client secret in session storage
          sessionStorage.setItem(
            "clientSecret-key",
            paymentIntentRes?.data?.clientSecret,
          );

          // clear cart after creating payment intent
          dispatch(clearCart());

          // redirect to payment page
          router.push(`/payments?order=${res?.data?._id}`);

          return;
        }

        return;
      } catch (error: TError | any) {
        Error_Modal(error?.data?.message);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-black lg:text-4xl">
        Billing Information
      </h1>
      {isProfileDataLoading ? (
        <div className="mt-10 grid grid-cols-1 gap-7 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Skeleton className="h-[40px]"></Skeleton>

            <Skeleton className="h-[40px]"></Skeleton>
            <Skeleton className="h-[40px]"></Skeleton>
            <Skeleton className="h-[40px]"></Skeleton>
            <Skeleton className="h-[40px]"></Skeleton>
            <Skeleton className="h-[40px]"></Skeleton>
          </div>
          <div>
            <Skeleton className="h-[300px]"></Skeleton>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 grid grid-cols-1 items-center justify-center gap-7 xl:grid-cols-3"
        >
          {/* form */}
          <div className="col-span-2 justify-start py-5">
            <div>
              <div className="grid w-full items-center gap-4">
                {/* Name input */}
                <div className="flex flex-1 flex-col space-y-1.5">
                  <Label>Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    {...register("name")}
                    defaultValue={userData?.data?.name}
                  />
                </div>

                {/* address */}
                <div className="relative grid w-full items-center gap-1.5">
                  <Label
                    htmlFor="address"
                    className="mb-1 block font-semibold text-primary-black"
                  >
                    Address :
                  </Label>

                  <CountryStateCitySelector
                    control={control}
                    userAddress={{
                      country: userData?.data?.country,
                      state: userData?.data?.states,
                      city: userData?.data?.city,
                      area: userData?.data?.address?.split(",")[0],
                      house: userData?.data?.address
                        ?.split(",")[1]
                        ?.split("No.")[0],
                    }}
                    register={register}
                    setValue={setValue}
                  />
                </div>

                {/* Email and Phone inputs */}
                <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
                  <div className="flex flex-1 flex-col space-y-1.5">
                    <Label>Email</Label>
                    <Input
                      id="email"
                      placeholder="Email Address"
                      disabled
                      {...register("email", {
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      defaultValue={userData?.data?.email}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col space-y-1.5">
                    {/* user phone number */}
                    <div className="mb-2 space-y-1">
                      <Label> Phone Number</Label>
                      <Controller
                        // @ts-ignore
                        name="phoneNumber"
                        // rules={{ required: "Phone number is required" }}
                        control={control}
                        render={({ field }) => (
                          <PhoneInput
                            // @ts-ignore
                            value={userData?.data?.phoneNumber || field.value}
                            onChange={field.onChange}
                            international
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* cart statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* products information */}
              <div>
                <div className="flex justify-between pb-5">
                  <p>Product Price:</p>
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

              {/* payment method */}
              <Label className="text-xl">Payment Method</Label>

              <RadioGroup className="mt-4">
                {paymentMethods.map((paymentMethod) => (
                  <div
                    className="flex items-center space-x-2"
                    key={paymentMethod?.id}
                  >
                    <RadioGroupItem
                      value={paymentMethod?.value}
                      id={paymentMethod?.id}
                      onClick={() =>
                        setValue("paymentMethod", paymentMethod?.value)
                      }
                    />
                    <Label htmlFor={paymentMethod?.id}>
                      {paymentMethod?.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.paymentMethod && (
                <p className="text-sm text-red-500">
                  {errors.paymentMethod.message}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full rounded-full bg-primary-color"
                disabled={isOrderLoading || cart?.length === 0}
              >
                {isOrderLoading && <Loading color="#fff"></Loading>}
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </div>
  );
};

export default CheckoutContainer;
