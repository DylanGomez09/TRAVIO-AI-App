import Link from "next/link"

export default function Header({ userName }: { userName: string }) {
  const firstName = userName.split(" ")[0]
  return (
    <header className="flex items-center justify-between px-6 py-5">
      <button className="text-[#092634]">☰</button>
      <span className="text-[#092634] text-sm tracking-widest uppercase">
        Travio AI
      </span>
      <div className="w-8 h-8 rounded-full bg-[#092634] flex items-center justify-center">
        <span className="text-white text-xs font-medium">{firstName[0]}</span>
      </div>
    </header>
  )
}
