
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-headline">Terms and Conditions of Service</CardTitle>
            <p className="text-muted-foreground pt-2">Effective Date: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-8 text-muted-foreground leading-relaxed">
              
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">1. INTRODUCTION AND ACCEPTANCE OF TERMS</h2>
                <p>Welcome to Portify (the “Platform,” “Service,” or “Application”), a professional web-based solution developed and operated by Sirius (“Company,” “We,” “Our,” or “Us”), headquartered in Ilesa, Osun State, Nigeria. Portify enables Users (“Users,” “You,” or “Your”) to create, customize, and publish professional digital portfolios.</p>
                <p>By accessing or using the Platform, You expressly acknowledge, represent, and warrant that:</p>
                <ul className="list-decimal list-inside space-y-2 pl-4">
                  <li>You have read, understood, and agreed to be bound by these Terms.</li>
                  <li>You are legally capable of entering into binding contracts under the Constitution of the Federal Republic of Nigeria (1999, as amended), as well as any applicable international law and treaties to which Nigeria is a signatory.</li>
                  <li>If You do not agree with these Terms, You must immediately discontinue use of the Platform.</li>
                </ul>
                <p>This Agreement applies to all visitors, registered Users, and other individuals accessing the Platform globally.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">2. DEFINITIONS AND INTERPRETATIONS</h2>
                <p><strong>“Portify”</strong> means the digital portfolio-making service provided by Sirius.</p>
                <p><strong>“User”</strong> refers to any individual or entity who registers for or accesses the Platform.</p>
                <p><strong>“Portfolio”</strong> means the digital profile, projects, or creative works generated through the Platform.</p>
                <p><strong>“Account”</strong> refers to the unique digital identity established by a User on Portify.</p>
                <p><strong>“Intellectual Property”</strong> includes trademarks, copyrights, patents, design rights, and all other proprietary rights recognized under Nigerian law and international conventions.</p>
                <p><strong>“Applicable Law”</strong> means the Constitution of the Federal Republic of Nigeria (1999, as amended), the Nigerian Data Protection Regulation (NDPR 2019), the Cybercrime (Prohibition, Prevention, etc.) Act 2015, UN Conventions, the General Data Protection Regulation (GDPR – EU 2016/679), and all other laws, rules, or regulations deemed binding.</p>
                <p>Interpretation of this Agreement shall be consistent with the principle of good faith under Nigerian contract law and relevant international treaties.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">3. ELIGIBILITY AND JURISDICTION</h2>
                 <ul className="list-decimal list-inside space-y-2 pl-4">
                    <li>You must be at least 18 years of age to use the Platform. Minors under the age of 18 may only use the Platform with parental consent.</li>
                    <li>For Users located in Nigeria, this Agreement is governed by Nigerian law.</li>
                    <li>For international Users, relevant treaties and conventions may supplement national laws.</li>
                    <li>Any disputes arising shall be resolved under Nigerian law, with jurisdiction vested in Nigerian courts or arbitration panels unless otherwise required by applicable international treaties.</li>
                 </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">4. USER OBLIGATIONS</h2>
                <p>You agree to:</p>
                 <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Provide accurate and lawful information during registration.</li>
                    <li>Use the Platform in compliance with Nigerian law, international digital rights standards, and UN conventions.</li>
                    <li>Refrain from uploading unlawful, defamatory, obscene, fraudulent, or infringing content.</li>
                    <li>Not engage in hacking, data scraping, or prohibited conduct under the Nigerian Cybercrime Act.</li>
                 </ul>
              </section>

               <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">5. INTELLECTUAL PROPERTY RIGHTS</h2>
                 <ul className="list-decimal list-inside space-y-2 pl-4">
                    <li>Portify and all associated software, source code, designs, and trademarks are the exclusive property of Sirius.</li>
                    <li>Users retain ownership of their portfolios but grant Sirius a limited license to host and display them for the operation of the Service.</li>
                    <li>Unauthorized reproduction or modification of Portify’s intellectual property may result in civil and criminal penalties under Nigerian law and international conventions.</li>
                 </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">6. PRIVACY AND DATA PROTECTION</h2>
                 <ul className="list-decimal list-inside space-y-2 pl-4">
                    <li>Sirius processes User data in compliance with the NDPR 2019, Cybercrime Act 2015, and, where applicable, the GDPR.</li>
                    <li>Data shall not be transferred outside Nigeria without adequate safeguards.</li>
                    <li>Portify respects the right to privacy under Section 37 of the Nigerian Constitution and Article 17 of the ICCPR.</li>
                    <li>Users have the right to request access, correction, or deletion of their data, subject to legal requirements.</li>
                 </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">7. USER CONTENT AND LICENSING</h2>
                 <ul className="list-decimal list-inside space-y-2 pl-4">
                    <li>Users retain ownership of all content uploaded.</li>
                    <li>By publishing portfolios, Users grant Sirius a limited license to store, host, and display their content via public portfolio links.</li>
                    <li>Sirius reserves the right to remove content deemed unlawful under Nigerian or international law.</li>
                 </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">8. PAYMENT, TRANSACTIONS, AND VIRTUAL ASSETS</h2>
                 <ul className="list-decimal list-inside space-y-2 pl-4">
                    <li>If premium services are introduced, payments shall comply with CBN guidelines and international anti-money laundering (AML) standards.</li>
                    <li>Use of cryptocurrencies or virtual assets must comply with current CBN regulations.</li>
                 </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">9. LIMITATION OF LIABILITY AND INDEMNIFICATION</h2>
                 <ul className="list-decimal list-inside space-y-2 pl-4">
                    <li>Sirius shall not be liable for indirect, incidental, or consequential damages.</li>
                    <li>Liability shall not exceed subscription fees (if any) paid in the past 12 months.</li>
                    <li>Users agree to indemnify Sirius against claims arising from misuse of the Platform.</li>
                 </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">10. TERMINATION AND SUSPENSION</h2>
                <p>Sirius may suspend or terminate accounts without notice for:</p>
                 <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Violation of these Terms,</li>
                    <li>Unlawful conduct,</li>
                    <li>Non-compliance with Applicable Law.</li>
                 </ul>
                 <p>Users may close accounts voluntarily at any time.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">11. GOVERNING LAW AND DISPUTE RESOLUTION</h2>
                 <ul className="list-decimal list-inside space-y-2 pl-4">
                    <li>These Terms are governed by the laws of the Federal Republic of Nigeria.</li>
                    <li>Disputes shall first be resolved through negotiation; if unsuccessful, arbitration shall follow under the Arbitration and Conciliation Act of Nigeria, in line with UNCITRAL rules.</li>
                    <li>International Users may agree to arbitration under the Permanent Court of Arbitration at The Hague.</li>
                 </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">12. FORCE MAJEURE</h2>
                <p>Sirius shall not be liable for failure to perform obligations due to circumstances beyond its reasonable control, including natural disasters, war, cyberattacks, or government restrictions.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">13. AMENDMENTS</h2>
                <p>Sirius reserves the right to amend these Terms at any time. Updates will be posted on Portify and become effective immediately upon publication.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">14. MISCELLANEOUS</h2>
                 <ul className="list-decimal list-inside spacey-y-2 pl-4">
                    <li><strong>Severability</strong>: If any provision is invalid, the remaining provisions remain enforceable.</li>
                    <li><strong>Entire Agreement</strong>: These Terms constitute the full agreement between You and Sirius.</li>
                    <li><strong>Waiver</strong>: No waiver of rights shall be valid unless made in writing.</li>
                 </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">15. CONTACT INFORMATION</h2>
                <p>For inquiries, complaints, or exercise of rights under this Agreement, contact:</p>
                <div className="pl-4 space-y-2">
                    <p>Sirius (Portify Legal Department)</p>
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
