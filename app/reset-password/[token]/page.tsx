"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "@/store/api";

interface ResetPasswordFormData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
const page: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  console.log(token);
  const dispatch = useDispatch();
  const [resetPassword] = useResetPasswordMutation();

  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword({
        token: token,
        newPassword: data.newPassword,
      }).unwrap();
      setResetPasswordSuccess(true);
      toast.success("Password reset successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to reset password");
    }
  };
  return <div>Page</div>;
};

export default page;
