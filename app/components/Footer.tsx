import {
  Clock,
  Facebook,
  HeadphonesIcon,
  Instagram,
  Shield,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">ABOUT US</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-white cursor-pointer hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-white cursor-pointer hover:underline"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              USEFUL LINKS
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-white cursor-pointer hover:underline"
                >
                  How it Works ?
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-white cursor-pointer hover:underline"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">POLICIES</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms-of-use"
                  className="hover:text-white cursor-pointer hover:underline"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white cursor-pointer hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              STAY CONNECTED
            </h3>
            <div className="mb-4 flex space-x-4">
              <Link href={"#"} className="hover:text-white">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href={"#"} className="hover:text-white">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href={"#"} className="hover:text-white">
                <Youtube className="h-6 w-6" />
              </Link>
              <Link href={"#"} className="hover:text-white">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
            <p className="text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
              maiores, officia debitis nihil cupiditate quaerat, earum fugit,
              voluptatibus commodi minus non deserunt nulla laudantium delectus
              quis quam placeat atque aperiam totam nisi omnis eaque illo
              laborum excepturi? A eveniet quia similique maiores vel aliquid
              minus?
            </p>
          </div>
        </div>
        {/* fetaure section  */}
        <section className="py-6">
          <div className="container mx-auto px-4 ">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex items-center gap-4  rounded-xl p-6 shadow-sm">
                <div className="rounded-full p-3">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Secure Payment
                  </h3>
                  <p className="text-sm text-gray-500 ">
                    {" "}
                    100% Secure Online Transcation
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4  rounded-xl p-6 shadow-sm">
                <div className="rounded-full p-3">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    BookKart Trust
                  </h3>
                  <p className="text-sm text-gray-500 ">
                    {" "}
                    Money Transfer safely and securely
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4  rounded-xl p-6 shadow-sm">
                <div className="rounded-full p-3">
                  <HeadphonesIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Customer Support
                  </h3>
                  <p className="text-sm text-gray-500 ">
                    {" "}
                    24/7 Dedicated Customer Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BookKart. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Image
              src={"/icons/visa.svg"}
              alt="Visa"
              width={50}
              height={30}
              // className="filter brightness-20 invert"
            />
            <Image
              src={"/icons/rupay.svg"}
              alt="Rupay"
              width={50}
              height={30}
              // className="filter brightness-20 invert"
            />
            <Image
              src={"/icons/paytm.svg"}
              alt="Paytm"
              width={50}
              height={30}
            />
            <Image
              src={"/icons/upi.svg"}
              alt="UPI"
              width={50}
              height={30}
              // className="filter brightness-20 invert"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
