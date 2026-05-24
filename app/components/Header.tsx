"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";

const navItems = [
  { label: "Explore", href: "/explore" },
  { label: "Trips", href: "/dashboard" },
  { label: "Concierge", href: "/concierge" },
  { label: "Saved", href: "/saved" },
];

export default function Header({ userName }: { userName: string }) {
  const firstName = userName.split(" ")[0];
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-[#092634] text-base font-semibold tracking-wider">
            Travio AI
          </span>

          <nav className="hidden md:flex items-center gap-1 relative">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 z-10 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-[#092634]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#FF6E42] rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/new-trip"
              className="hidden md:block border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-400 hover:text-[#092634] hover:border-[#FF6E42] transition-colors"
            >
              Plan Trip
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#092634] flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {firstName[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile — bottom bar */}
      </header>
      <Navbar />
    </>
  );
}
