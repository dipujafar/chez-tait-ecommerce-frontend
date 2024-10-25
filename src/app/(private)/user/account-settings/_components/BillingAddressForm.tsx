"use client";
import { Button } from "@/components/ui/button";
import CountryStateCitySelector from "@/components/ui/CountryStateCitySelector";
import { Label } from "@/components/ui/label";
import {
  useGetProfileDataQuery,
  useUpdateProfileDataMutation,
} from "@/redux/api/profileApi";
import { TError } from "@/types/types";
import Loading from "@/utils/Loading";
import { Error_Modal, Success_model } from "@/utils/models";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInputs {
  area: string;
  house: string;
  country: string;
  state: string;
  city: string;
}

const BillingAddressForm = () => {
  const { data: userData } = useGetProfileDataQuery(undefined);
  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateProfileDataMutation();

  const { register, handleSubmit, control, reset, setValue } =
    useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const billingAddressData = {
      country: data?.country,
      states: data?.state,
      city: data?.city || userData?.data?.city,
      address: `${data?.area},${data?.house}`,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(billingAddressData));
    try {
      await updateProfile(formData).unwrap();
      Success_model({ title: "Profile updated successfully" });
      reset();
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <div className="dashboard-card" id="address">
      <h1 className="px-7 py-5 text-2xl font-medium">Billing Address</h1>
      <hr />
      <div className="px-7 py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
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
                  house: userData?.data?.address?.split(",")[1],
                }}
                register={register}
                setValue={setValue}
              />
            </div>
          </div>
          {/* submit button */}
          <Button
            type="submit"
            className="mt-7 rounded-full bg-primary-color px-10"
          >
            {isUpdateProfileLoading && <Loading color="#fff"></Loading>}
            Save Change
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BillingAddressForm;
