
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCog } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-headline">About Portify</CardTitle>
            <p className="text-muted-foreground pt-2">Portify Web Application Documentation (Firebase Edition)</p>
          </CardHeader>
          <CardContent className="space-y-8 text-muted-foreground leading-relaxed">

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">1. Overview</h2>
                <p>Portify is a portfolio builder web application powered by Firebase. It allows users to create, customize, and share professional portfolios with a unique public link. Firebase provides real-time sync, authentication, hosting, and secure data management for smooth scaling.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">2. Core Features</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-2"><Users className="w-5 h-5"/> User Features</h3>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li><strong>Authentication:</strong> Email/password signup & login, Social sign-in (Google, GitHub, Apple).</li>
                            <li><strong>Portfolio Builder:</strong> Add/Edit/Delete sections: Bio, Projects, Skills, Resume, Contact.</li>
                            <li><strong>Media Uploads:</strong> Upload images, documents (via Firebase Storage).</li>
                            <li><strong>Live Preview:</strong> See changes in real-time while editing.</li>
                            <li><strong>Templates:</strong> Choose from 12 professional portfolio templates with customization for color schemes, fonts, and layouts.</li>
                            <li><strong>Public Portfolio Link:</strong> Get a unique URL (e.g., portify.web.app/username) hosted on Firebase Hosting.</li>
                            <li><strong>Analytics:</strong> Track visits, clicks, and downloads (via Firebase + GA).</li>
                            <li><strong>Notifications:</strong> Optional email alerts for portfolio visits.</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-2"><UserCog className="w-5 h-5"/> Admin Features</h3>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li><strong>User Management:</strong> Suspend, verify, and manage users.</li>
                            <li><strong>Portfolio Moderation:</strong> Check uploaded content for compliance.</li>
                            <li><strong>Subscription Control:</strong> Manage free vs. premium tiers.</li>
                            <li><strong>Global Analytics:</strong> Access comprehensive analytics via the Firebase Console.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">3. UI/UX Design Principles</h2>
                 <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Mobile</h3>
                        <ul className="list-disc list-inside pl-4">
                            <li>Bottom navigation (Home, Create, Templates, Profile).</li>
                            <li>Card-based UI for portfolio sections.</li>
                            <li>Touch-friendly drag-and-drop reordering.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Desktop</h3>
                        <ul className="list-disc list-inside pl-4">
                             <li>Sidebar navigation (Dashboard, Portfolio, Templates, Analytics).</li>
                            <li>Dual-pane editor (Edit on left, Live Preview on right).</li>
                            <li>Data visualization (charts, graphs for analytics).</li>
                        </ul>
                    </div>
                </div>
            </section>

             <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">4. Tech Stack</h2>
                 <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Frontend</h3>
                        <ul className="list-disc list-inside pl-4">
                            <li>React.js (with Firebase SDKs)</li>
                            <li>TailwindCSS for styling</li>
                            <li>React Router for navigation</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Backend (Serverless)</h3>
                         <ul className="list-disc list-inside pl-4">
                           <li>Firebase Authentication</li>
                            <li>Firebase Firestore (NoSQL DB)</li>
                            <li>Firebase Storage (media uploads)</li>
                            <li>Firebase Hosting (deploy frontend)</li>
                            <li>Firebase Functions (for server logic like email, payments)</li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold text-foreground">Integrations</h3>
                         <ul className="list-disc list-inside pl-4">
                            <li><strong>Payments:</strong> Paystack/Stripe (via Firebase Functions)</li>
                            <li><strong>Analytics:</strong> Firebase Analytics + Google Analytics</li>
                            <li><strong>Email:</strong> Firebase Functions + Nodemailer/SendGrid</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">5. System Architecture</h2>
                <div className="p-4 bg-muted rounded-md font-mono text-sm">
                    <p>[ User ] → [ React Frontend ] → [ Firebase Auth ]</p>
                    <p className="pl-24">↓</p>
                    <p className="pl-16">[ Firestore DB ]</p>
                    <p className="pl-24">↓</p>
                    <p className="pl-16">[ Firebase Storage ]</p>
                    <p className="pl-24">↓</p>
                    <p className="pl-16">[ Firebase Hosting ]</p>
                    <p className="pl-24">↓</p>
                    <p className="pl-12">[ Firebase Cloud Functions ]</p>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">6. User Flow</h2>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li>Signup/Login (Firebase Auth).</li>
                    <li>Portfolio Creation (Firestore stores user sections).</li>
                    <li>Media Upload (Firebase Storage).</li>
                    <li>Template Selection & Customization.</li>
                    <li>Publish (Generate public link → Firebase Hosting dynamic route).</li>
                    <li>Share Portfolio.</li>
                    <li>Analytics Tracking.</li>
                </ol>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">7. Security & Compliance</h2>
                 <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Firestore Security Rules:</strong> Each user can only access their own data.</li>
                    <li><strong>Storage Rules:</strong> Only authenticated users can upload. Public access only for published portfolios.</li>
                    <li><strong>Authentication:</strong> OAuth + JWT tokens handled by Firebase.</li>
                    <li><strong>Encryption:</strong> All data encrypted at rest & in transit.</li>
                    <li><strong>Compliance:</strong> NDPR (Nigeria), GDPR (EU), CCPA (California).</li>
                </ul>
            </section>
            
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">8. Roadmap</h2>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Phase 1 (MVP):</strong> Firebase Auth + Firestore, Portfolio builder, Public links, Basic templates.</li>
                    <li><strong>Phase 2:</strong> Premium tier (custom domains, analytics), Advanced templates marketplace, AI portfolio auto-generator.</li>
                    <li><strong>Phase 3:</strong> Mobile apps with Firebase (React Native/Flutter), Team/Agency portfolios, Offline editing with Firestore caching.</li>
                </ul>
            </section>
            
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">9. Contact & Support</h2>
                <ul className="list-none space-y-1">
                    <li><strong>Email:</strong> sirius.portifty.help@gmail.com</li>
                    <li><strong>Phone:</strong> +2347067860584</li>
                    <li><strong>Location:</strong> Ilesa, Osun State, Nigeria</li>
                </ul>
            </section>

          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
