"use client";
import { Address } from "@/lib/types/type";
import { useAddOrUpdateAddressMutation, useGetAddressQuery } from "@/store/api";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import BookLoader from "@/lib/BookLoader";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AddressResponse {
  success: boolean;
  message: string;
  data: {
    addresses: Address[];
  };
}

const addressFormSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits long"),
  addressLine1: z
    .string()
    .min(5, "Address Line 1 must be at least 5 characters long"),
  addressLine2: z.string().optional(),
  city: z.string().min(3, "City must be at least 3 characters long"),
  state: z.string().min(3, "State must be at least 3 characters long"),
  pinCode: z.string().min(6, "pinCode must be at least 6 digits long"),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

interface CheckoutAddressProps {
  onAddressSelect: (address: Address) => void;
  selectedAddressId?: string;
}

const CheckoutAddress = ({
  onAddressSelect,
  selectedAddressId,
}: CheckoutAddressProps) => {
  const { data: addressData, isLoading } = useGetAddressQuery() as {
    data: AddressResponse | undefined;
    isLoading: boolean;
  };

  const [addOrUpdateAddress] = useAddOrUpdateAddressMutation();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const addressess = addressData?.data?.addresses || [];

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pinCode: "",
    },
  });

  const onSubmit = async (data: AddressFormValues) => {
    try {
      let result;
      if (editingAddress) {
        const updateAddressData = {
          ...editingAddress,
          ...data,
          addressId: editingAddress._id,
        };
        result = await addOrUpdateAddress(updateAddressData).unwrap();
      } else {
        result = await addOrUpdateAddress(data).unwrap();
      }
      setShowAddressForm(false);
      setEditingAddress(null);
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "Failed to add address");
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    form.reset(address);
    setShowAddressForm(true);
  };

  if (isLoading) {
    return <BookLoader />;
  }

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {addressess.map((address: Address) => (
            <>
              <Card
                className={`relative overflow-hidden rounded-lg border transition-all duration-300 ${selectedAddressId === address._id ? "border-blue-500 shadow-lg" : "border-gray-200 hover:border-blue-300 hover:shadow-lg shadow-md"}`}
                key={address._id}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Checkbox
                      checked={selectedAddressId === address._id}
                      onCheckedChange={() => onAddressSelect(address)}
                      className="w-5 h-5"
                    />
                    <div className="flex items-center justify-between">
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => handleEditAddress(address)}
                      >
                        <Pencil className="h-5 w-5 text-gray-600 hover:text-blue-500" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>{address?.addressLine1}</p>
                    {address?.addressLine2 && <p>{address?.addressLine2}</p>}
                    <p>
                      {address?.city},{address?.state} {address?.pinCode}
                    </p>
                    <p className="mt-2 font-medium">
                      Phone: {address?.phoneNumber}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          ))}
        </div>

        <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
          <DialogTrigger asChild>
            <Button className="w-full" variant={"outline"}>
              <Plus className="mr-2 h-4 w-4" />{" "}
              {editingAddress ? "Update Address" : "Add New Address"}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Edit Address" : "Add New Address"}
              </DialogTitle>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Address Line 1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Address Line 2{" "}
                          <span className="text-gray-500 text-xs font-normal ml-1">
                            (Optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Address Line 2"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="pinCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>pinCode</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pinCode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full mt-4">
                    {editingAddress ? "Update Address" : "Add Address"}
                  </Button>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CheckoutAddress;
