import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock, Shield, Eye, Database, FileCheck, Mail, Phone, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | JeansLoop',
  description: 'JeansLoop privacy policy. Learn how we collect, protect, and handle your personal data when you shop on our platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black">Privacy Policy</span>
        </nav>

        {/* Page Header */}
        <div className="border-b-4 border-black pb-8 mb-12">
          <span className="inline-block bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
            Trust & Security
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
            Privacy Policy
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 font-medium mt-3 max-w-2xl leading-relaxed">
            Your privacy is of utmost importance to us. This policy outlines how JeansLoop collects, uses, protects, and handles your personal information across our website and services.
          </p>
        </div>

        {/* Security Principles Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Shield className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Zero Data Selling</h3>
              <p className="text-lg font-black text-black mt-1">100% Private</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              We never sell or rent your personal details to third-party advertisers.
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Lock className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">SSL Encryption</h3>
              <p className="text-lg font-black text-black mt-1">256-Bit TLS</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              All checkout sessions and sensitive payloads are fully encrypted.
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Database className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Secure Storage</h3>
              <p className="text-lg font-black text-black mt-1">Bcrypt Hash</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              User passwords are cryptographically salted and hashed.
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <FileCheck className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">User Control</h3>
              <p className="text-lg font-black text-black mt-1">Total Access</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              View, edit, or delete your account records anytime in settings.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-neutral-700">
          {/* Section 1 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              1. Information We Collect
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                When you interact with JeansLoop (browse products, register an account, make a purchase, or contact support), we may collect the following categories of information:
              </p>
              <ul className="list-disc pl-5 space-y-2 font-medium">
                <li>
                  <strong>Contact & Identity Details:</strong> Your full name, email address, phone number, and alternate contact numbers provided during account registration or checkout.
                </li>
                <li>
                  <strong>Shipping & Delivery Details:</strong> Physical delivery address, district, area landmarks, and specific delivery instructions.
                </li>
                <li>
                  <strong>Order History & Cart Details:</strong> Purchased items, sizes, quantities, order totals, discount coupons used, and delivery status.
                </li>
                <li>
                  <strong>Account Credentials:</strong> Passwords are stored exclusively using secure one-way cryptographic hashing (bcrypt). We never store plain text passwords.
                </li>
                <li>
                  <strong>Technical & Usage Information:</strong> IP address, device type, browser specifications, and cookie session identifiers to keep your shopping cart synchronized.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              2. How We Use Your Information
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>We use your personal data solely for legitimate business purposes:</p>
              <ul className="list-disc pl-5 space-y-2 font-medium">
                <li><strong>Order Fulfillment:</strong> Processing transactions, preparing denim items, generating packing slips, and delivering packages to your doorstep.</li>
                <li><strong>Order Updates & Communications:</strong> Sending automated order confirmation SMS/emails, tracking links, and delivery notifications.</li>
                <li><strong>Customer Support:</strong> Assisting you with size guidance, exchange requests, order modifications, or refund queries.</li>
                <li><strong>Security & Fraud Prevention:</strong> Validating phone numbers for Cash on Delivery orders to protect against fraudulent claims and failed dispatches.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              3. Data Sharing With Third Parties
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                We do not sell, trade, or rent your personal identification information to outside parties. We only share essential details with trusted operational partners under strict confidentiality:
              </p>
              <ul className="list-disc pl-5 space-y-2 font-medium">
                <li>
                  <strong>Logistics & Courier Partners:</strong> We share your recipient name, delivery address, and phone number with logistics partners (e.g., Steadfast, Pathao, RedX) solely for parcel delivery.
                </li>
                <li>
                  <strong>Payment Processors:</strong> Online payment transactions (e.g. bKash, SSLCommerz, Nagad, Visa/Mastercard) are handled directly through accredited, PCI-DSS compliant payment gateways. JeansLoop does not capture or store your debit/credit card CVV or PIN numbers.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose information if required by applicable law, court order, or governmental authorities of Bangladesh.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              4. Cookies and Session Storage
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                JeansLoop utilizes essential cookies and browser local storage to provide a smooth shopping experience:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-medium">
                <li>Remembering items placed in your shopping cart between visits.</li>
                <li>Maintaining your authenticated session when you log into your customer account.</li>
                <li>Storing layout and UI preferences for fast navigation.</li>
              </ul>
              <p>
                You can choose to disable cookies through your browser settings, though doing so may prevent adding items to your cart or completing online checkout.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              5. Your Rights and Data Control
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                As a valued customer, you have full ownership of your data:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-medium">
                <li>You can access and update your profile details and saved shipping addresses at any time via your <Link href="/account" className="font-bold text-black underline underline-offset-2">Account Dashboard</Link>.</li>
                <li>You can request a complete export of your personal data stored on our servers.</li>
                <li>You can request the deletion of your account and associated contact history by writing to our privacy team.</li>
              </ul>
            </div>
          </section>

          {/* Contact Box */}
          <section className="border-2 border-black p-6 md:p-8 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                Data Privacy Officer
              </span>
              <h3 className="text-2xl font-black uppercase italic tracking-tight leading-none text-white">
                Questions Regarding Privacy?
              </h3>
              <p className="text-xs text-neutral-300 mt-2 max-w-md">
                For questions, concerns, or requests regarding your personal information, reach out to our privacy desk.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@jeansloop.com?subject=Privacy%20Inquiry"
                className="inline-flex items-center gap-2 bg-white text-black font-black uppercase text-xs px-5 py-3 hover:bg-neutral-200 transition-colors border-2 border-white"
              >
                <Mail className="w-4 h-4" /> Email Privacy Desk
              </a>
              <a
                href="https://wa.me/8801911209322"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-transparent text-white font-black uppercase text-xs px-5 py-3 hover:bg-white hover:text-black transition-colors border-2 border-white"
              >
                <Phone className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
