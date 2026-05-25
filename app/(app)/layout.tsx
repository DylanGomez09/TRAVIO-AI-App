import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import Header from "@/app/components/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      {children}
    </SessionProvider>
  );
}
