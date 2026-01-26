"use client";
import { useVerifyEmailMutation } from "@/store/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { authStatus, setIsEmailVerified } from "@/store/slice/userSlice";
import toast from "react-hot-toast";
const page = () => {
  const { token } = useParams<{ token: string }>();
  console.log(token);
  const dispatch = useDispatch();
  const [verifyEmail] = useVerifyEmailMutation();
  const isVerifiedEmail = useSelector(
    (state: RootState) => state.user.isEmailVerified,
  );
  const [varificationStatus, setVarificationStatus] = useState<
    "loading" | "success" | "alreadyVerified" | "failed"
  >("loading");

  useEffect(() => {
    const verify = async () => {
      if (isVerifiedEmail) {
        setVarificationStatus("alreadyVerified");
        return;
      }
      try {
        const result = await verifyEmail(token).unwrap();
        if (result.success) {
          dispatch(setIsEmailVerified(true));
          setVarificationStatus("success");
          dispatch(authStatus());
          toast.success("Email Verified Successfully");
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else {
          throw new Error(result.message || "Failed to verify email");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      verify();
    }
  }, [token, verifyEmail, dispatch, isVerifiedEmail]);
  return <div>page</div>;
};

export default page;
