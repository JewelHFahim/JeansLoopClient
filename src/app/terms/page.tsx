import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, CheckCircle2, ShieldCheck, Scale, ArrowRight, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | JeansLoop',
  description: 'JeansLoop terms of service and purchasing conditions. Review the terms governing orders, deliveries, and use of our platform.',
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black">Terms of Service</span>
        </nav>

        {/* Page Header */}
        <div className="border-b border-black/15 pb-8 mb-12">
          <span className="inline-block bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
            Legal Terms & Conditions
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
            Terms of Service
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 font-medium mt-3 max-w-2xl leading-relaxed">
            Please read these Terms of Service carefully before purchasing or using the JeansLoop website and services.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <ShieldCheck className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Authentic Quality</h3>
              <p className="text-lg font-black text-black mt-1">100% Guaranteed</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              All garments are engineered with high-grade denim and twill.
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <FileText className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Fair Pricing</h3>
              <p className="text-lg font-black text-black mt-1">Clear & Honest</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              All prices shown in BDT with no surprise hidden fees.
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <CheckCircle2 className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Fit Assurance</h3>
              <p className="text-lg font-black text-black mt-1">7-Day Swap</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              Straightforward size exchanges on unworn garments.
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Scale className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Governing Law</h3>
              <p className="text-lg font-black text-black mt-1">Bangladesh</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              Protected under the consumer & commerce laws of Bangladesh.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-neutral-700">
          {/* Section 1 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              1. Acceptance of Terms
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                By visiting our website, creating an account, or placing an order with JeansLoop, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services or place orders.
              </p>
              <p>
                We reserve the right to revise and update these terms from time to time. Any changes will become effective immediately upon posting to this page.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              2. Products, Sizing & Accuracy
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                <strong>Garment Imagery:</strong> We make every reasonable effort to display product colors, denim washes, whiskers, and textures as accurately as possible. However, due to natural denim wash variations and individual display monitor color calibrations, slight variations may occur.
              </p>
              <p>
                <strong>Sizing:</strong> Please consult our detailed size guides on each product page prior to selecting your waist size. If you receive a size that does not fit as expected, our <Link href="/returns" className="font-bold text-black underline underline-offset-2">Returns & Exchanges Policy</Link> applies.
              </p>
              <p>
                <strong>Stock Availability:</strong> All orders are subject to product availability. In the rare event that an item becomes unavailable after order placement, our team will promptly notify you and process a full refund or suitable alternative.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              3. Orders, Pricing & Payment
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                <strong>Pricing:</strong> All prices are displayed in Bangladeshi Taka (BDT) and are inclusive of applicable taxes unless specified otherwise. We reserve the right to update prices without prior notice, but price changes will not affect orders that have already been confirmed.
              </p>
              <p>
                <strong>Order Confirmation & Verification:</strong> An order is deemed accepted once verified by phone or confirmed in our system. JeansLoop reserves the right to decline or cancel any order suspected of fraudulent activity, invalid contact information, or repeated failed delivery history.
              </p>
              <p>
                <strong>Payment Methods:</strong> We accept Cash on Delivery (COD), Mobile Financial Services (bKash, Nagad), and debit/credit cards through certified payment gateways.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              4. Shipping, Delivery & Cancellations
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                Delivery timelines are outlined in our <Link href="/shipping" className="font-bold text-black underline underline-offset-2">Shipping & Delivery Policy</Link>. Customers may request cancellation of an order at any point before dispatch by calling our customer hotline. Once a parcel has been handed over to the courier partner, cancellations cannot be accepted until standard return procedures are followed.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              5. Intellectual Property
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                All content on this website, including but not limited to text, photographs, denim lookbook graphics, logos, icons, and software code, is the property of JeansLoop and protected by copyright and intellectual property laws of Bangladesh. Unauthorized reproduction or commercial use is strictly prohibited.
              </p>
            </div>
          </section>

          {/* Contact Box */}
          <section className="border-2 border-black p-6 md:p-8 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                Legal Desk
              </span>
              <h3 className="text-2xl font-black uppercase italic tracking-tight leading-none text-white">
                Questions About Our Terms?
              </h3>
              <p className="text-xs text-neutral-300 mt-2 max-w-md">
                Our team is happy to answer any questions or clarify our store policies.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@jeansloop.com"
                className="inline-flex items-center gap-2 bg-white text-black font-black uppercase text-xs px-5 py-3 hover:bg-neutral-200 transition-colors border-2 border-white"
              >
                <Mail className="w-4 h-4" /> Email Legal Desk
              </a>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 bg-transparent text-white font-black uppercase text-xs px-5 py-3 hover:bg-white hover:text-black transition-colors border-2 border-white"
              >
                Privacy Policy <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
