import { BookDetails } from "@/lib/types/type";
import { useAddProductsMutation } from "@/store/api";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
    formState: { errors },
  } = useForm<BookDetails>();
  return <div>page</div>;
};

export default page;
