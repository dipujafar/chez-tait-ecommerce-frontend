import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function CountryStateCitySelector({
  control,
  userAddress,
  register,
  setValue,
}: any) {
  const [allData, setAllData] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState<any>(
    userAddress?.country,
  );
  const [selectedState, setSelectedState] = useState<any>(userAddress?.state);
  const [selectedCity, setSelectedCity] = useState<any>(userAddress?.city);

  const [statesOfCountry, setStatesOfCountry] = useState<any>([]);
  const [citiesOfState, setCitiesOfState] = useState<any>([]);

  // -------- Get all data ------------- //
  useEffect(() => {
    fetch("/data/countries-states-cities.json")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
      });
  }, []);

  // -------- Keep data memoized to load once ------------ //
  const memoizedAllCountries = useMemo<any>(() => allData, [allData]);

  // -------- Load states of selected country -------- //
  useEffect(() => {
    if (selectedCountry) {
      const countryData = memoizedAllCountries?.find((country: any) => {
        if (selectedCountry === country.name) {
          return country;
        }
      });

      setStatesOfCountry(countryData?.states);
    }
  }, [memoizedAllCountries, selectedCountry]);

  // ----------- Load cities of selected state ------- //
  useEffect(() => {
    if (selectedState) {
      const stateData = statesOfCountry?.find(
        (state: any) => state.name === selectedState,
      );
      setCitiesOfState(stateData?.cities);
    }
  }, [memoizedAllCountries, selectedState, statesOfCountry]);

  useEffect(() => {
    if (userAddress?.country) {
      setSelectedCountry(userAddress.country);
      setSelectedState(userAddress.state);
      setSelectedCity(userAddress.city);

      setValue("country", userAddress.country);
      setValue("state", userAddress.state);
      setValue("city", userAddress.city);
    }
  }, [userAddress?.country]);

  return (
    <div className="grid w-full grid-cols-2 gap-x-3 gap-y-3 lg:grid-cols-5">
      <div>
        <Controller
          name="country"
          control={control}
          defaultValue={selectedCountry}
          render={({ field }) => (
            <Select
              onValueChange={(countryName) => {
                field.onChange(countryName);
                setSelectedCountry(countryName);
              }}
              value={selectedCountry || ""}
            >
              <SelectTrigger className="border border-primary-black">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {memoizedAllCountries?.map((country: any) => (
                  <SelectItem key={country.name} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        {selectedCountry ? (
          <>
            {statesOfCountry?.length ? (
              <Controller
                name="state"
                control={control}
                defaultValue={selectedState}
                render={({ field }) => (
                  <Select
                    onValueChange={(stateName) => {
                      field.onChange(stateName);
                      setSelectedState(stateName);
                    }}
                    value={selectedState || ""}
                  >
                    <SelectTrigger className="border border-primary-black">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {statesOfCountry?.map((state: any) => (
                        <SelectItem key={state.name} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            ) : (
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no state found">
                    No state found!
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </>
        ) : (
          <Select>
            <SelectTrigger disabled>
              <SelectValue placeholder="Select a country first" />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
        )}
      </div>

      <div>
        {selectedState ? (
          <>
            <Controller
              name="city"
              control={control}
              defaultValue={selectedCity}
              render={({ field }) => (
                <>
                  {citiesOfState?.length ? (
                    <Select
                      onValueChange={(cityName) => {
                        field.onChange(cityName);
                        setSelectedCity(cityName);
                      }}
                      value={selectedCity || ""}
                    >
                      <SelectTrigger className="border border-primary-black">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {citiesOfState?.map((city: any) => (
                          <SelectItem key={city.name} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No city found">
                          No city found
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </>
              )}
            />
          </>
        ) : (
          <Select>
            <SelectTrigger disabled>
              <SelectValue placeholder="Select a state first" />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
        )}
      </div>

      <div>
        <Input
          type="text"
          defaultValue={userAddress?.area}
          id="area"
          placeholder="Type Area"
          className="border border-primary-black bg-transparent py-5 text-primary-black outline-none focus:outline-none"
          {...register("area")}
        />
      </div>

      <div>
        <Input
          defaultValue={userAddress?.house}
          type="text"
          id="house"
          placeholder="Type House No"
          className="border border-primary-black bg-transparent py-5 text-primary-black outline-none focus:outline-none"
          {...register("house")}
        />
      </div>
    </div>
  );
}
