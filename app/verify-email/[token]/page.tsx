"use client";
import { useVerifyEmailMutation } from "@/store/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { authStatus, setIsEmailVerified } from "@/store/slice/userSlice";
import toast from "react-hot-toast";
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const VerifyEmailPage = () => {
  const { token } = useParams<{ token: string }>();

  const dispatch = useDispatch();
  const [verifyEmail] = useVerifyEmailMutation();
  const isVerifiedEmail = useSelector(
    (state: RootState) => state.user.isEmailVerified,
  );
  const [varificationStatus, setVarificationStatus] = useState<
    "loading" | "success" | "alreadyVerified" | "failed"
  >("loading");

  const verifiedToken = useRef<string | null>(null);

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
        setVarificationStatus("failed");
      }
    };
    if (token && verifiedToken.current !== token) {
      verifiedToken.current = token;
      verify();
    }
  }, [token, verifyEmail, dispatch, isVerifiedEmail]);

  const renderContent = () => {
    switch (varificationStatus) {
      case "loading":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <h2 className="text-xl font-semibold text-gray-700">
              Verifying your email...
            </h2>
            <p className="text-center text-gray-500 max-w-xs">
              Please wait while we verify your email address. This won't take
              long.
            </p>
          </div>
        );
      case "success":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center space-y-4 py-8"
          >
            <CheckCircle className="h-20 w-20 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              Email Verified!
            </h2>
            <p className="text-center text-gray-600 max-w-sm">
              Your email has been successfully verified. You now have full
              access to your account.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Redirecting to home page...
            </p>
          </motion.div>
        );
      case "alreadyVerified":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <CheckCircle className="h-20 w-20 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              Already Verified
            </h2>
            <p className="text-center text-gray-600 max-w-sm">
              Your email is already verified. You can continue using the
              application.
            </p>
            <Link href="/">
              <Button className="mt-4 gap-2">
                Go to Home <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        );
      case "failed":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <XCircle className="h-20 w-20 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              Verification Failed
            </h2>
            <p className="text-center text-gray-600 max-w-sm">
              We couldn't verify your email link. It may be invalid or expired.
            </p>
            <Link href="/">
              <Button variant="outline" className="mt-4">
                Return to Home
              </Button>
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 px-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary bg-white">
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
