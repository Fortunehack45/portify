import Footer from "@/components/footer";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-headline">Privacy Policy</CardTitle>
            <p className="text-muted-foreground pt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
              <p>Your privacy is important to us. It is Portify's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
                <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
                <p>We use the information we collect in various ways, including to provide, operate, and maintain our website, improve, personalize, and expand our website, and develop new products, services, features, and functionality.</p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">3. Security</h2>
                <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">4. Links to Other Sites</h2>
                <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
              </div>

               <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">5. Your Consent</h2>
                <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
              </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
