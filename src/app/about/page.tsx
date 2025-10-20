import Footer from "@/components/footer";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-headline">About Portify</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Portify is a streamlined platform designed to empower developers to create and share professional portfolios with unparalleled ease. In a world where your digital presence is your resume, Portify provides the tools to build a stunning showcase of your work in minutes, not hours.
            </p>
            <p>
              Our mission is to remove the friction from portfolio creation. We believe that developers should spend their time building amazing things, not wrestling with web design. With our intuitive editor, a rich library of beautiful templates, and instant hosting, you can go from sign-up to a published portfolio with a unique URL in record time.
            </p>
            <p>
              Whether you're a student just starting out, a seasoned professional looking to rebrand, or a freelancer aiming to attract clients, Portify is built for you. Just bring your talent, your projects, and your unique story—we'll handle the rest.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
