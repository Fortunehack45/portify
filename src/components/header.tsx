import Link from 'next/link';
import { Button } from './ui/button';
import { Logo } from './icons';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/#features" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Features
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Examples
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">
            About
          </Link>
        </nav>
        <div className="flex items-center justify-end ml-auto">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild className="rounded-full">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
