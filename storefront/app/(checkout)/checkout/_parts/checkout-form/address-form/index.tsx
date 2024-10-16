"use client";
import type {StoreCart, StoreCartAddress} from "@medusajs/types";

import {setCheckoutAddresses} from "@/actions/medusa/order";
import {Cta} from "@/components/shared/button";
import Checkbox from "@/components/shared/checkbox";
import Input from "@/components/shared/input";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {useEffect, useState} from "react";
import {useFormState} from "react-dom";

export default function AddressForm({
  active,
  cart,
  setNextStep,
}: {
  active: boolean;
  cart: StoreCart;
  setNextStep: () => void;
}) {
  const [checked, setChecked] = useState(true);

  const [{status}, action] = useFormState(setCheckoutAddresses, {
    error: null,
    status: "idle",
  });

  useEffect(() => {
    if (status === "success") setNextStep();
  }, [status, setNextStep]);

  const isFilled = !active && !!cart.shipping_address?.address_1;

  return (
    <form
      action={action}
      className="flex flex-col gap-8 border-t border-accent py-8"
    >
      <div className="flex items-center justify-between">
        <Heading desktopSize="xs" font="sans" mobileSize="xs" tag="h6">
          Shipping Address
        </Heading>
        {isFilled && (
          <Cta size="sm" variant="outline">
            Edit
          </Cta>
        )}
      </div>
      {isFilled && (
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <Body className="font-semibold" font="sans">
              Shipping address
            </Body>
            <div className="flex flex-col gap-[6px]">
              <Body font="sans">
                {cart.shipping_address?.first_name}{" "}
                {cart.shipping_address?.last_name}
              </Body>
              <Body font="sans">{cart.shipping_address?.address_1}</Body>
              <Body font="sans">
                {cart.shipping_address?.postal_code},{" "}
                {cart.shipping_address?.city}
              </Body>
              <Body font="sans">{cart.shipping_address?.country_code}</Body>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <Body className="font-semibold" font="sans">
              Contact
            </Body>
            <Body font="sans">{cart.email}</Body>
          </div>
        </div>
      )}
      {active && (
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <AddressInputs
              address={cart.shipping_address}
              addressName="shipping_address"
            />
          </div>
          <Checkbox
            checked={checked}
            onCheckedChange={(v) =>
              setChecked(v === "indeterminate" ? false : v)
            }
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <Input
              defaultValue={cart.email}
              name="email"
              placeholder="Email"
              required
            />
            {cart.shipping_address?.phone}
            <Input
              defaultValue={cart.shipping_address?.phone}
              name="phone"
              placeholder="Phone"
            />
          </div>

          {!checked && (
            <>
              <Heading desktopSize="xs" font="sans" mobileSize="xs" tag="h6">
                Billing address
              </Heading>
              <div className="grid gap-4 lg:grid-cols-2">
                <AddressInputs
                  address={cart.billing_address}
                  addressName="billing_address"
                />
                <Input
                  defaultValue={cart.billing_address?.phone}
                  name="billing_address.phone"
                  placeholder="Phone"
                />
              </div>
            </>
          )}
          <Cta size="sm" type="submit">
            Continue to delivery
          </Cta>
        </div>
      )}
    </form>
  );
}

function AddressInputs({
  address,
  addressName,
}: {
  address?: StoreCartAddress;
  addressName: string;
}) {
  const inputName = (name: string) => addressName + "." + name;
  return (
    <>
      <Input
        defaultValue={address?.first_name}
        name={inputName("first_name")}
        placeholder="First name"
        required
      />
      <Input
        defaultValue={address?.last_name}
        name={inputName("last_name")}
        placeholder="Last name"
        required
      />
      <Input
        defaultValue={address?.address_1}
        name={inputName("address_1")}
        placeholder="Address"
        required
      />
      <Input
        defaultValue={address?.company}
        name={inputName("company")}
        placeholder="Company"
      />
      <Input
        defaultValue={address?.postal_code}
        name={inputName("postal_code")}
        placeholder="Postal code"
        required
      />
      <Input
        defaultValue={address?.city}
        name={inputName("city")}
        placeholder="City"
        required
      />
      <Input
        defaultValue={address?.country_code}
        name={inputName("country_code")}
        placeholder="Country"
        required
      />
      <Input
        defaultValue={address?.province}
        name={inputName("province")}
        placeholder="State/Province"
        required
      />
    </>
  );
}
