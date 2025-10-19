import { Logo } from "./icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Docs</Link>
            <Link href="#" className="hover:text-foreground">About</Link>
            <Link href="/login" className="hover:text-foreground">Login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
