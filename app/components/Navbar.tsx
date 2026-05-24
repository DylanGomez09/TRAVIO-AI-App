"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { icon: "⊕", label: "Explore", href: "/" },
  { icon: "✈", label: "Trips", href: "/dashboard" },
  { icon: "♡", label: "Saved", href: "/saved" },
  { icon: "◎", label: "Profile", href: "/profile" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-8 shadow-lg border border-gray-100 z-50">
      {items.map((item) => {
        const active = pathname === item.href
        return (
          <Link key={item.label} href={item.href}
            className="flex flex-col items-center gap-1">
            <span className={`text-lg ${active ? "text-[#FF6E42]" : "text-gray-400"}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] ${active ? "text-[#FF6E42] font-medium" : "text-gray-400"}`}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
