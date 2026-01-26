import { BookDetails } from "@/lib/types/type";
import { useAddProductsMutation } from "@/store/api";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [addProducts] = useAddProductsMutation();

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
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

  return <div>page</div>;
};

export default page;
