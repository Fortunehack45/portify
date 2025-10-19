import Link from "next/link";
import { Logo } from "@/components/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-secondary/50 p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
      </div>
      {children}
    </div>
  );
}
