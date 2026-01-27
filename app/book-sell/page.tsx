"use client";
import { BookDetails } from "@/lib/types/type";
import { useAddProductsMutation } from "@/store/api";
import { toggleLoginDialog } from "@/store/slice/userSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../components/NoData";
import Link from "next/link";
import {
  Book,
  Camera,
  ChevronRight,
  CreditCard,
  DollarSign,
  HelpCircle,
  Loader2,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filters } from "@/lib/Constant";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const page = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [addProducts, { isLoading }] = useAddProductsMutation();

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<BookDetails>({
    defaultValues: {
      images: [],
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const currentFiles = watch("images") || [];
      setUploadedImages((prevImages) =>
        [
          ...prevImages,
          ...newFiles.map((file) => URL.createObjectURL(file)),
        ].slice(0, 4),
      );
      setValue(
        "images",
        [...currentFiles, ...newFiles].slice(0, 4) as string[],
      );
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    const currentFiles = watch("images") || [];
    const uploadFiles = currentFiles.filter((_, i) => i !== index);
    setValue("images", uploadFiles);
  };

  const onSubmit = async (data: BookDetails) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "images") {
          formData.append(key, value as string);
        }
      });

      if (data.paymentMode === "UPI") {
        formData.set(
          "paymentDetails",
          JSON.stringify({
            upiId: data.paymentDetails?.upiId,
          }),
        );
      } else if (data.paymentMode === "Bank Account") {
        formData.set(
          "paymentDetails",
          JSON.stringify({
            bankDetails: data.paymentDetails?.bankDetails,
          }),
        );
      }

      if (Array.isArray(data.images) && data.images.length > 0) {
        data.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const result = await addProducts(formData).unwrap();
      console.log(result);
      if (result.success) {
        router.push(`books/${result.data._id}`);
        toast.success("Book Added Successfully");
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add Book, Please Try Again later");
    }
  };
  const paymentMode = watch("paymentMode");

  const handleOpenLogin = () => {
    dispatch(toggleLoginDialog());
  };

  if (!user) {
    return (
      <NoData
        message="Please log in to access your cart."
        description="You need to be logged in to view your cart and checkout."
        buttonText="Login"
        imageUrl="/images/login.jpg"
        onClick={handleOpenLogin}
      />
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">
            Sell Your Used Books
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            submit free classified add to sell your used book for cash in India
          </p>
          <Link
            href="#"
            className="text-blue-500 hover:underline inline-flex items-center"
          >
            Learn how it Works
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Card className="shadow-lg border-t-4 border-t-blue-500">
            <CardHeader className="bg-linear-to-r from-blue-50 to-blue-50">
              <CardTitle className="text-2xl flex items-center text-blue-700">
                <Book className="mr-2 h-6 w-6" />
                Book Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <Label
                  htmlFor="title"
                  className="md:w-1/4 font-medium text-gray-700"
                >
                  Ad Title
                </Label>
                <div className="md:w-3/4">
                  <Input
                    type="text"
                    {...register("title", {
                      required: "Title is required",
                    })}
                    placeholder="Enter your ad  Title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <Label
                  htmlFor="category"
                  className="md:w-1/4 font-medium text-gray-700"
                >
                  Book Type
                </Label>
                <div className="md:w-3/4">
                  <Controller
                    name="category"
                    control={control}
                    rules={{
                      required: "Category is required",
                    }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please Select book type" />
                        </SelectTrigger>
                        <SelectContent>
                          {filters.category.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <Label
                  htmlFor="category"
                  className="md:w-1/4 font-medium text-gray-700"
                >
                  Book Condition
                </Label>
                <div className="md:w-3/4">
                  <Controller
                    name="condition"
                    control={control}
                    rules={{
                      required: "Book Condition is required",
                    }}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-4 w-full"
                      >
                        {filters.condition.map((condition) => (
                          <div
                            key={condition}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={condition.toLowerCase()}
                              id={condition.toLowerCase()}
                            />
                            <Label htmlFor={condition.toLowerCase()}>
                              {condition}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  />
                  {errors.condition && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.condition.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <Label
                  htmlFor="classType"
                  className="md:w-1/4 font-medium text-gray-700"
                >
                  For Class
                </Label>
                <div className="md:w-3/4">
                  <Controller
                    name="classType"
                    control={control}
                    rules={{
                      required: "classType is required",
                    }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please Select book type" />
                        </SelectTrigger>
                        <SelectContent>
                          {filters.classType.map((classType) => (
                            <SelectItem key={classType} value={classType}>
                              {classType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.classType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.classType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <Label
                  htmlFor="subject"
                  className="md:w-1/4 font-medium text-gray-700"
                >
                  Book Subject
                </Label>
                <div className="md:w-3/4">
                  <Input
                    type="text"
                    {...register("subject", {
                      required: "subject is required",
                    })}
                    placeholder="Enter your book subject"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className=" block mb-2 font-medium text-gray-700">
                  Upload Photos
                </Label>
                <div className="border-2 border-dashed border-blue-300 p-4 rounded-lg bg-blue-50">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-blue-500" />
                    <Label
                      htmlFor="images"
                      className=" cursor-pointer font-medium text-blue-700 hover:underline"
                    >
                      click here to upload up to 4 images (size:15MB max,each)
                    </Label>
                    <Input
                      type="file"
                      id="images"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 mt-4">
                      {uploadedImages.map((image, index) => (
                        <div className="relative" key={index}>
                          <Image
                            src={image}
                            alt={`book image -${index + 1}`}
                            width={200}
                            height={200}
                            className="w-full border-gray-200 h-32 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            onClick={() => removeImage(index)}
                            size="icon"
                            className="absolute -top-2 -right-2 cursor-pointer"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OPTIONAL DETAILS */}
          <Card className="shadow-lg border-t-4 border-t-green-500">
            <CardHeader className="bg-linear-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-2xl text-green-700 flex items-center">
                <HelpCircle className="mr-2 h-6 w-6" />
                Optional Details
              </CardTitle>
              <CardDescription>(Description,MRP,Author,etc...)</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 ">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Book Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        <Label
                          htmlFor="price"
                          className="md:w-1/4 font-medium text-gray-700"
                        >
                          MRP
                        </Label>

                        <Input
                          type="text"
                          {...register("price")}
                          placeholder="Enter Book MRP"
                          className="md:w-3/4"
                        />
                        {/* {errors.price && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.price.message}
                          </p>
                        )} */}
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        <Label
                          htmlFor="author"
                          className="md:w-1/4 font-medium text-gray-700"
                        >
                          Author
                        </Label>

                        <Input
                          type="text"
                          {...register("author")}
                          placeholder="Enter Book MRP"
                          className="md:w-3/4"
                        />
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        <Label
                          htmlFor="edition"
                          className="md:w-1/4 font-medium text-gray-700"
                        >
                          Edition (year)
                        </Label>

                        <Input
                          type="text"
                          {...register("edition")}
                          placeholder="Enter Book Edition"
                          className="md:w-3/4"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Add Description</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        <Label
                          htmlFor="description"
                          className="md:w-1/4 font-medium text-gray-700"
                        >
                          Description
                        </Label>

                        <Textarea
                          id="discription"
                          {...register("description")}
                          placeholder="Enter Book Description"
                          className="md:w-3/4"
                          rows={4}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* PRICE DETAILS */}
          <Card className="shadow-lg border-t-4 border-t-yellow-500">
            <CardHeader className="bg-linear-to-r from-yellow-50 to-amber-50">
              <CardTitle className="text-2xl flex items-center text-yellow-700">
                <DollarSign className="mr-2 h-6 w-6" />
                Price Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <Label
                  htmlFor="title"
                  className="md:w-1/4 font-medium text-gray-700"
                >
                  Your Price (in Rs.)
                </Label>
                <div className="md:w-3/4">
                  <Input
                    id="finalPrice"
                    type="text"
                    {...register("finalPrice", {
                      required: "Final Price is required",
                    })}
                    placeholder="Enter your price"
                  />
                  {errors.finalPrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.finalPrice.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-start space-y-2 md:space-y-0 md:space-x-4">
                <Label
                  htmlFor="category"
                  className="md:w-1/4  mt-2 font-medium text-gray-700"
                >
                  Shipping Charges
                </Label>
                <div className="space-y-4   md:w-3/4">
                  <div className="flex items-center gap-4">
                    <Input
                      id="shippingCharge"
                      type="text"
                      {...register("shippingCharge")}
                      placeholder="Enter shipping charges"
                      className="w-full md:w-1/2"
                      disabled={watch("shippingCharge") === "free"}
                    />
                    <span className="text-sm">Or</span>
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="shippingCharge"
                        control={control}
                        rules={{
                          required: "Shipping Charge is required",
                        }}
                        render={({ field }) => (
                          <Checkbox
                            className="cursor-pointer"
                            id="freeShipping"
                            checked={field.value === "free"}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? "free" : "");
                            }}
                          />
                        )}
                      />
                      <Label htmlFor="freeShipping" className="cursor-pointer">
                        Free Shipping
                      </Label>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-1">
                    Buyers prefer free shipping or low shipping charges
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BANK DETAILS */}
          <Card className="shadow-lg border-t-4 border-t-blue-500">
            <CardHeader className="bg-linear-to-r from-blue-50 to-blue-50">
              <CardTitle className="text-2xl flex items-center text-yellow-700">
                <CreditCard className="mr-2 h-6 w-6" />
                Bank Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <Label className="md:w-1/4 font-medium text-gray-700">
                  Payment Mode
                </Label>
                <div className="md:w-3/4 space-y-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    After your Book is sold ,is what mode you like to receive
                    the payment
                  </p>
                  <Controller
                    name="paymentMode"
                    control={control}
                    rules={{
                      required: "Payment Mode is required",
                    }}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-4 w-full"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="UPI"
                            id="UPI"
                            {...register("paymentMode")}
                            className="cursor-pointer"
                          />
                          <Label htmlFor="UPI" className="cursor-pointer">
                            UPI ID/Number
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Bank Account"
                            id="bank account"
                            {...register("paymentMode")}
                            className="cursor-pointer"
                          />
                          <Label
                            htmlFor="bank account"
                            className="cursor-pointer"
                          >
                            Bank Account
                          </Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {errors.paymentMode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.paymentMode.message}
                    </p>
                  )}
                </div>
              </div>

              {paymentMode === "UPI" && (
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                  <Label
                    htmlFor="upiId"
                    className="md:w-1/4 font-medium text-gray-700"
                  >
                    UPI ID
                  </Label>
                  <div className="md:w-3/4">
                    <Input
                      type="text"
                      {...register("paymentDetails.upiId", {
                        required: "UPI ID is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid UPI ID for format",
                        },
                      })}
                      placeholder="Enter your UPI ID"
                    />
                    {errors.paymentDetails?.upiId && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.paymentDetails?.upiId.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {paymentMode === "Bank Account" && (
                <>
                  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                    <Label
                      htmlFor="accountNumber"
                      className="md:w-1/4 font-medium text-gray-700"
                    >
                      Account Number
                    </Label>
                    <div className="md:w-3/4">
                      <Input
                        type="text"
                        {...register(
                          "paymentDetails.bankDetails.accountNumber",
                          {
                            required: "Account Number is required",
                            pattern: {
                              value: /^[0-9]{9-18}$/,
                              message: "Invalid Account Number",
                            },
                          },
                        )}
                        placeholder="Enter your Account Number"
                      />
                      {errors.paymentDetails?.bankDetails?.accountNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {
                            errors.paymentDetails?.bankDetails?.accountNumber
                              .message
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                    <Label
                      htmlFor="ifscCode"
                      className="md:w-1/4 font-medium text-gray-700"
                    >
                      Ifsc Code
                    </Label>
                    <div className="md:w-3/4">
                      <Input
                        type="text"
                        {...register("paymentDetails.bankDetails.ifscCode", {
                          required: "Ifsc Code is required",
                          pattern: {
                            value: /^[A-Z]{4}0[A-z0-9]{6}$/,
                            message: "Invalid ifsc Code",
                          },
                        })}
                        placeholder="Enter your ifsc Code"
                      />
                      {errors.paymentDetails?.bankDetails?.ifscCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.paymentDetails?.bankDetails?.ifscCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                    <Label
                      htmlFor="bank Name"
                      className="md:w-1/4 font-medium text-gray-700"
                    >
                      Bank Name
                    </Label>
                    <div className="md:w-3/4">
                      <Input
                        type="text"
                        {...register("paymentDetails.bankDetails.bankName", {
                          required: "Bank Name is required",
                        })}
                        placeholder="Enter your Bank Name"
                      />
                      {errors.paymentDetails?.bankDetails?.bankName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.paymentDetails?.bankDetails?.bankName.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-60 text-md bg-linear-to-r from-blue-500 to-indigo-600 text-white hover:from-orange-600  hover:to-orange-700 font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" /> Saving...
              </>
            ) : (
              "Post Your Book"
            )}
          </Button>
          <p className="text-sm text-center text-gray-500">
            By clicking Post Your Book, you agree to our{" "}
            <a href="/terms-of-use" target="_blank" className="text-blue-500">
              Terms of Service
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default page;
