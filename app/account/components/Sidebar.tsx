"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { User, Package, PiggyBank, Heart, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slice/userSlice";
import { useLogoutMutation } from "@/store/api";
import toast from "react-hot-toast";

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation({}).unwrap();
      dispatch(logout());
      toast.success("Logout Successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  const menuItems = [
    {
      href: "/account/profile",
      label: "My Profile",
      icon: User,
    },
    {
      href: "/account/orders",
      label: "My Orders",
      icon: Package,
    },
    {
      href: "/account/selling-products",
      label: "My Selling Orders",
      icon: PiggyBank,
    },
    {
      href: "/account/wishlist",
      label: "My Wishlist",
      icon: Heart,
    },
  ];

  return (
    <div className="w-full md:w-64 bg-card text-card-foreground rounded-lg shadow-md h-fit">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-foreground">My Account</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
