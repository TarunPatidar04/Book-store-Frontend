"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BASE_URL,
  useForgotPasswordMutation,
  useLoginMutation,
  useRegisterMutation,
} from "@/store/api";
import {
  authStatus,
  toggleLoginDialog,
  setUser,
} from "@/store/slice/userSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface LoginProps {
  isLogginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

interface ForgotPasswordFormData {
  email: string;
}

const AuthPage = ({ isLogginOpen, setIsLoginOpen }: LoginProps) => {
  const [currentTab, setcurrentTab] = useState<"login" | "signup" | "forgot">(
    "login",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [forgetPasswordSuccess, setForgetPasswordSuccess] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginError },
  } = useForm<LoginFormData>();

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupError },
  } = useForm<SignupFormData>();

  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordError },
  } = useForm<ForgotPasswordFormData>();

  const onSubmitSignUp = async (data: SignupFormData) => {
    setSignupLoading(true);
    try {
      const { email, password, name } = data;
      const result = await register({ email, password, name }).unwrap();

      if (result.success) {
        toast.success("Verification mail sent to your email, Please Verify");
        dispatch(toggleLoginDialog());
      }
    } catch (error) {
      toast.error("Email already exists");
    } finally {
      setSignupLoading(false);
    }
  };

  const onSubmitLogin = async (data: LoginFormData) => {
    setLoginLoading(true);
    try {
      const result = await login(data).unwrap();

      if (result.success) {
        toast.success("User Login Successfully");
        dispatch(toggleLoginDialog());
        dispatch(setUser(result.user));
        dispatch(authStatus());
      }
    } catch (error) {
      toast.error("Invalid Email or Password");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      router.push(`${BASE_URL}/auth/google`);
      dispatch(authStatus());
      dispatch(toggleLoginDialog());

      setTimeout(() => {
        toast.success("User Login Successfully");
      }, 3000);
    } catch (error) {
      toast.error("Invalid Email or Password");
    } finally {
      setGoogleLoading(false);
    }
  };

  const onSubmitForgotPassword = async (data: ForgotPasswordFormData) => {
    setForgotPasswordLoading(true);
    try {
      const result = await forgotPassword(data.email).unwrap();
      if (result.success) {
        toast.success("Password Reset Link Sent to your Email successfully");
        setForgetPasswordSuccess(true);
      }
    } catch (error) {
      toast.error("Failed to send Password Reset Link");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <Dialog open={isLogginOpen} onOpenChange={setIsLoginOpen}>
      <DialogContent className="sm:max-w-[425px] p-6 ">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold mb-4">
            Welcome to BookKart
          </DialogTitle>
          <Tabs
            value={currentTab}
            onValueChange={(value) =>
              setcurrentTab(value as "login" | "signup" | "forgot")
            }
          >
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="login" className="">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="">
                Sign Up
              </TabsTrigger>
              <TabsTrigger value="forgot" className="">
                Forgot Password
              </TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="login" className="space-y-4">
                  <form
                    onSubmit={handleLoginSubmit(onSubmitLogin)}
                    action=""
                    className="space-y-4"
                  >
                    <div className="relative">
                      <Input
                        {...registerLogin("email", {
                          required: "Email is required",
                        })}
                        placeholder="Email"
                        type="email"
                        className="pl-10"
                      />
                      <Mail
                        className="absolute top-1/2 transform text-gray-500 -translate-y-1/2 left-3"
                        size={20}
                      />
                    </div>
                    {loginError.email && (
                      <p className="text-red-500 text-sm">
                        {loginError.email.message}
                      </p>
                    )}

                    <div className="relative">
                      <Input
                        {...registerLogin("password", {
                          required: "Password is required",
                        })}
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10"
                      />
                      <Lock
                        className="absolute top-1/2 transform text-gray-500 -translate-y-1/2 left-3"
                        size={20}
                      />
                      {showPassword ? (
                        <EyeOff
                          onClick={() => setShowPassword(false)}
                          className="absolute top-1/2 cursor-pointer transform text-gray-500 -translate-y-1/2 right-3"
                          size={20}
                        />
                      ) : (
                        <Eye
                          onClick={() => setShowPassword(true)}
                          className="absolute cursor-pointer top-1/2 transform text-gray-500 -translate-y-1/2 right-3"
                          size={20}
                        />
                      )}
                    </div>
                    {loginError.password && (
                      <p className="text-red-500 text-sm">
                        {loginError.password.message}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full font-bold cursor-pointer"
                      disabled={loginLoading}
                    >
                      {loginLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>
                  <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <p className="px-2 text-sm text-gray-500">or</p>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>
                  <Button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full flex items-center cursor-pointer justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-bold"
                    disabled={googleLoading}
                  >
                    {googleLoading ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" size={20} />
                        Login with Google...
                      </>
                    ) : (
                      <>
                        <Image
                          src="/icons/google.svg"
                          alt="google"
                          width={20}
                          height={20}
                        />
                        Login with Google
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form
                    onSubmit={handleSignupSubmit(onSubmitSignUp)}
                    action=""
                    className="space-y-4"
                  >
                    <div className="relative">
                      <Input
                        {...registerSignup("name", {
                          required: "Name is required",
                        })}
                        placeholder="Name"
                        type="text"
                        className="pl-10"
                      />
                      <User
                        className="absolute top-1/2 transform text-gray-500 -translate-y-1/2 left-3"
                        size={20}
                      />
                    </div>
                    {signupError.name && (
                      <p className="text-red-500 text-sm">
                        {signupError.name.message}
                      </p>
                    )}

                    <div className="relative">
                      <Input
                        {...registerSignup("email", {
                          required: "Email is required",
                        })}
                        placeholder="Email"
                        type="email"
                        className="pl-10"
                      />
                      <Mail
                        className="absolute top-1/2 transform text-gray-500 -translate-y-1/2 left-3"
                        size={20}
                      />
                    </div>
                    {signupError.email && (
                      <p className="text-red-500 text-sm">
                        {signupError.email.message}
                      </p>
                    )}

                    <div className="relative">
                      <Input
                        {...registerSignup("password", {
                          required: "Password is required",
                        })}
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10"
                      />
                      <Lock
                        className="absolute top-1/2 transform text-gray-500 -translate-y-1/2 left-3"
                        size={20}
                      />
                      {showPassword ? (
                        <EyeOff
                          onClick={() => setShowPassword(false)}
                          className="absolute top-1/2 cursor-pointer transform text-gray-500 -translate-y-1/2 right-3"
                          size={20}
                        />
                      ) : (
                        <Eye
                          onClick={() => setShowPassword(true)}
                          className="absolute cursor-pointer top-1/2 transform text-gray-500 -translate-y-1/2 right-3"
                          size={20}
                        />
                      )}
                    </div>
                    {signupError.password && (
                      <p className="text-red-500 text-sm">
                        {signupError.password.message}
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...registerSignup("agreeTerms", {
                          required: "Agree to terms and conditions is required",
                        })}
                        className="mr-2 cursor-pointer"
                      />
                      <label
                        htmlFor="agreeTerms"
                        className="text-sm text-gray-700"
                      >
                        Agree to terms & conditions
                      </label>
                    </div>
                    {signupError.agreeTerms && (
                      <p className="text-red-500 text-sm">
                        {signupError.agreeTerms.message}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full font-bold cursor-pointer"
                      disabled={signupLoading}
                    >
                      {signupLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </form>
                  <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <p className="px-2 text-sm text-gray-500">or</p>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>
                  <Button
                    type="button"
                    className="w-full flex items-center cursor-pointer justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-bold"
                    disabled={googleLoading}
                  >
                    <Image
                      src="/icons/google.svg"
                      alt="google"
                      width={20}
                      height={20}
                    />
                    Sign Up with Google
                  </Button>
                </TabsContent>

                <TabsContent value="forgot" className="space-y-4">
                  {!forgetPasswordSuccess ? (
                    <form
                      action=""
                      className="space-y-4"
                      onSubmit={handleForgotPasswordSubmit(
                        onSubmitForgotPassword,
                      )}
                    >
                      <div className="relative">
                        <Input
                          {...registerForgotPassword("email", {
                            required: "Email is required",
                          })}
                          placeholder="Email"
                          type="email"
                          className="pl-10"
                        />
                        <Mail
                          className="absolute top-1/2 transform text-gray-500 -translate-y-1/2 left-3"
                          size={20}
                        />
                      </div>
                      {forgotPasswordError.email && (
                        <p className="text-red-500 text-sm">
                          {forgotPasswordError.email.message}
                        </p>
                      )}

                      <Button
                        type="submit"
                        className="w-full font-bold cursor-pointer"
                        disabled={forgotPasswordLoading}
                      >
                        {forgotPasswordLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          "Send Resend Link"
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center space-y-4"
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                      <h3 className="text-gray-700 font-semibold text-lg text-center">
                        Reset Link Send
                      </h3>
                      <p className="text-gray-500">
                        We've sent a password reset link to your email. Please
                        check your inbox and follow the instructions to reset
                        your password.
                      </p>
                      <Button
                        onClick={() => setForgetPasswordSuccess(false)}
                        className="w-full"
                      >
                        Send Another Link To Email
                      </Button>
                    </motion.div>
                  )}
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
          <p className="text-sm text-center mt-2 text-gray-600">
            By Clicking "agree",you agree to our{" "}
            <Link href="/terms-of-use" className="text-blue-500 font-semibold">
              Terms of Use
            </Link>
            ,{" "}
            <Link
              href="/privacy-policy"
              className="text-blue-500 font-semibold"
            >
              Privacy Policy
            </Link>
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPage;
