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
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              ABOUT US
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-foreground cursor-pointer hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-foreground cursor-pointer hover:underline"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              USEFUL LINKS
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-foreground cursor-pointer hover:underline"
                >
                  How it Works ?
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-foreground cursor-pointer hover:underline"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              POLICIES
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms-of-use"
                  className="hover:text-foreground cursor-pointer hover:underline"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-foreground cursor-pointer hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              STAY CONNECTED
            </h3>
            <div className="mb-4 flex space-x-4">
              <Link href={"#"} className="hover:text-foreground">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href={"#"} className="hover:text-foreground">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href={"#"} className="hover:text-foreground">
                <Youtube className="h-6 w-6" />
              </Link>
              <Link href={"#"} className="hover:text-foreground">
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
                  <h3 className="text-lg font-semibold text-foreground">
                    Secure Payment
                  </h3>
                  <p className="text-sm text-muted-foreground ">
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
                  <h3 className="text-lg font-semibold text-foreground">
                    BookKart Trust
                  </h3>
                  <p className="text-sm text-muted-foreground ">
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
                  <h3 className="text-lg font-semibold text-foreground">
                    Customer Support
                  </h3>
                  <p className="text-sm text-muted-foreground ">
                    {" "}
                    24/7 Dedicated Customer Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
          <p className="text-sm text-muted-foreground">
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
              // style={{ width: "auto" }}
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
