import { Logo } from "./icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container max-w-screen-2xl flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Made by Fortune.
        </p>
        <div className="flex gap-4 sm:gap-6 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground">About</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
