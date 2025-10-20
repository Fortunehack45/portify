import Footer from "@/components/footer";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-headline">Terms and Conditions</CardTitle>
            <p className="text-muted-foreground pt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
              <p>Please read these terms and conditions carefully before using Our Service.</p>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">1. Acknowledgment</h2>
                <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
                <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">2. User Accounts</h2>
                <p>When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.</p>
                <p>You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a Third-Party Social Media Service.</p>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">3. Termination</h2>
                <p>We may terminate or suspend Your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
              </div>

               <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">4. Governing Law</h2>
                <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
              </div>

               <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">5. Changes to These Terms and Conditions</h2>
                <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
              </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
