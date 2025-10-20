
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

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
          <CardContent className="space-y-8 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. INTRODUCTION</h2>
              <p>This Privacy Policy describes how Sirius (“Company,” “We,” “Our,” or “Us”), operator of Portify (“Platform” or “Service”), collects, uses, discloses, and protects personal information provided by Users (“You” or “Your”).</p>
              <p>Sirius is committed to safeguarding privacy in line with:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>The Constitution of the Federal Republic of Nigeria (1999, as amended),</li>
                <li>The Nigerian Data Protection Regulation (NDPR 2019),</li>
                <li>The Cybercrime (Prohibition, Prevention, etc.) Act 2015,</li>
                <li>The General Data Protection Regulation (GDPR – EU 2016/679),</li>
                <li>The United Nations Declaration of Human Rights (Article 12), and</li>
                <li>Other applicable global privacy and data protection laws.</li>
              </ul>
              <p>By using Portify, You consent to the practices described herein.</p>
            </section>
            
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">2. INFORMATION WE COLLECT</h2>
                <p>We collect the following categories of information:</p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li><strong>Account Information</strong> – Name, email address, phone number, and password.</li>
                  <li><strong>Portfolio Content</strong> – Information, text, links, and projects You upload.</li>
                  <li><strong>Usage Data</strong> – Device information, browser type, IP address, and interaction logs.</li>
                  <li><strong>Transaction Data (if premium services apply)</strong> – Payment method details, billing information, and transaction history.</li>
                  <li><strong>Communications</strong> – Emails, inquiries, and support requests.</li>
                </ol>
            </section>
            
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">3. LEGAL BASIS FOR PROCESSING</h2>
                <p>We process personal data under the following legal bases:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Consent (NDPR Regulation 2.1(a), GDPR Article 6(1)(a))</strong> – where You give explicit permission.</li>
                    <li><strong>Contractual necessity</strong> – where processing is required to provide You with the Platform.</li>
                    <li><strong>Legal compliance</strong> – where processing is necessary to comply with Nigerian, EU, or international law.</li>
                    <li><strong>Legitimate interests</strong> – where processing is required to maintain Platform security, prevent fraud, and improve services.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">4. HOW WE USE YOUR INFORMATION</h2>
                <p>We use personal data to:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Provide and maintain Portify services.</li>
                    <li>Generate and host User portfolios.</li>
                    <li>Personalize User experiences and recommend features.</li>
                    <li>Process payments and financial transactions (if applicable).</li>
                    <li>Respond to User inquiries and support requests.</li>
                    <li>Comply with legal obligations under Nigerian law and international treaties.</li>
                </ul>
            </section>
            
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">5. DATA SHARING AND DISCLOSURE</h2>
                <p>Sirius will not sell or rent Your personal data. We may share data only in these cases:</p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li><strong>Service Providers</strong> – With third-party partners (e.g., hosting, analytics, payment processors) who are bound by confidentiality agreements.</li>
                    <li><strong>Legal Authorities</strong> – To comply with obligations under Nigerian law, court orders, or law enforcement requests.</li>
                    <li><strong>Corporate Transactions</strong> – In case of mergers, acquisitions, or restructuring.</li>
                    <li><strong>User Consent</strong> – Where You explicitly authorize data sharing.</li>
                </ol>
            </section>
            
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">6. INTERNATIONAL DATA TRANSFERS</h2>
                <p>Personal data may be transferred outside Nigeria. Sirius ensures such transfers comply with:</p>
                 <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>NDPR Regulation 2.11,</li>
                    <li>GDPR Articles 44–50, and</li>
                    <li>Malabo Convention on Cyber Security and Data Protection.</li>
                 </ul>
                 <p>Adequate safeguards, such as standard contractual clauses or equivalent protections, will be applied.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">7. DATA SECURITY</h2>
                <p>We implement organizational, technical, and administrative measures to protect data against unauthorized access, alteration, disclosure, or destruction, consistent with:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Section 37 of the Nigerian Constitution,</li>
                    <li>NDPR 2019, and</li>
                    <li>Article 32 of GDPR.</li>
                </ul>
                <p>Measures include encryption, secure servers, firewalls, and access control.</p>
            </section>
            
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">8. DATA RETENTION</h2>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li>We retain personal data only for as long as necessary to provide services or as required by law.</li>
                    <li>Portfolios remain active until the User deletes them or terminates the Account.</li>
                    <li>Transaction records may be retained longer in compliance with Nigerian tax and financial reporting laws.</li>
                </ol>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">9. USER RIGHTS</h2>
                <p>In line with NDPR, GDPR, and UN privacy standards, You have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Right to Access</strong> – Obtain a copy of personal data held about You.</li>
                    <li><strong>Right to Rectification</strong> – Request correction of inaccurate data.</li>
                    <li><strong>Right to Erasure</strong> – Request deletion of personal data (“right to be forgotten”).</li>
                    <li><strong>Right to Restriction</strong> – Limit processing of personal data.</li>
                    <li><strong>Right to Data Portability</strong> – Request transfer of data to another platform.</li>
                    <li><strong>Right to Object</strong> – Object to processing for direct marketing or profiling.</li>
                    <li><strong>Right to Lodge a Complaint</strong> – File a complaint with Nigeria’s National Information Technology Development Agency (NITDA) or relevant supervisory authority.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">10. CHILDREN’S PRIVACY</h2>
                <p>Portify is not intended for children under 18 years of age without parental consent. Sirius does not knowingly collect data from minors. Parents or guardians may contact us to request deletion of such information.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">11. COOKIES AND TRACKING</h2>
                <p>Portify may use cookies, tracking pixels, and analytics tools to enhance User experience. Users can disable cookies through browser settings, but some features may not function correctly.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">12. THIRD-PARTY LINKS</h2>
                <p>Portify may contain links to third-party websites. Sirius is not responsible for the privacy practices or content of external sites. Users are encouraged to review external privacy policies.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">13. CHANGES TO PRIVACY POLICY</h2>
                <p>Sirius reserves the right to amend this Privacy Policy at any time. Updates will be posted on Portify and become effective immediately upon publication. Continued use of the Platform constitutes acceptance of such changes.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">14. CONTACT INFORMATION</h2>
              <p>For privacy-related inquiries, complaints, or requests regarding this Privacy Policy, contact:</p>
              <div className="pl-4 space-y-2">
                  <p>Sirius (Portify Privacy Office)</p>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /> Address: Ilesa, Osun State, Nigeria</p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground" /> Email: sirius.portifty.help@gmail.com</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-muted-foreground" /> Phone: +2347067860584</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
