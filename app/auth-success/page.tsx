"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookLoader from "@/lib/BookLoader";

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // Save token to localStorage for mobile fallback
      localStorage.setItem("access_token", token);

      // Since RTK Query re-hydrates or needs a ping to set user state we could trigger verifyAuth
      // Or simply redirect to home where AuthCheck will verify and store the user
      setTimeout(() => {
        router.push("/");
      }, 500);
    } else {
      router.push("/login");
    }
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Completing Sign In...</h2>
      <BookLoader />
    </div>
  );
}
