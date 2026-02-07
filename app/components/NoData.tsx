import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

interface NoDataProps {
  message: string;
  imageUrl: string;
  description: string;
  onClick: () => void;
  buttonText: string;
}
const NoData = ({
  message,
  imageUrl,
  description,
  onClick,
  buttonText,
}: NoDataProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-background overflow-x-hidden space-y-6">
      <div className="relative w-60 md:w-80">
        <Image
          src={imageUrl}
          alt={"noData"}
          width={320}
          height={320}
          className="shadow-md hover:shadow-lg transition duration-300"
        />
      </div>
      <div className="text-center max-w-md space-y-2">
        <p className="text-2xl font-bold text-foreground tracking-wide">
          {message}
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      {onClick && (
        <button
          onClick={onClick}
          className="px-6 w-60 py-3 bg-linear-to-r rounded-xl shadow-lg hover:shadow-xl hover:scale-105 font-medium from-blue-500 via-indigo-500 to-purple-300 text-white transform transition duration-300 ease-in-out"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default NoData;
