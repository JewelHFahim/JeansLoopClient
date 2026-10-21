import type { Metadata } from 'next';
import Link from 'next/link';
import { RotateCcw, CheckCircle2, AlertTriangle, ArrowRight, Phone, Mail, Package, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Returns & Exchanges | JeansLoop',
  description: 'JeansLoop 7-day hassle-free return and exchange policy. Size exchange assistance, return conditions, and refund procedures.',
};

export default function ReturnsPage() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black">Returns & Exchanges</span>
        </nav>

        {/* Page Header */}
        <div className="border-b-4 border-black pb-8 mb-12">
          <span className="inline-block bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
            Customer Satisfaction Guarantee
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
            Returns & Exchanges
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 font-medium mt-3 max-w-2xl leading-relaxed">
            We want you to love your fit. If your jeans or trousers don&apos;t fit right or meet our high standards, our 7-day exchange and return policy has you covered.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <RotateCcw className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Exchange Window</h3>
              <p className="text-2xl font-black text-black mt-1">7 Days</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              Valid within 7 calendar days from package receipt.
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Package className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Fit Guarantee</h3>
              <p className="text-2xl font-black text-black mt-1">Easy Swap</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              Quick size adjustments to get your perfect waist & length.
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <ShieldCheck className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Defect Cover</h3>
              <p className="text-2xl font-black text-black mt-1">100% Free</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              JeansLoop pays all shipping if item is damaged or defective.
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <CheckCircle2 className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Refund Turnaround</h3>
              <p className="text-2xl font-black text-black mt-1">3–5 Days</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              Direct refund via bKash, Nagad, or original payment method.
            </p>
          </div>
        </div>

        {/* 3 Step Process */}
        <div className="border-2 border-black p-6 md:p-8 bg-neutral-50 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-6">
            How The Exchange & Return Process Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-black bg-white p-5 space-y-2">
              <span className="inline-block bg-black text-white px-2 py-0.5 text-xs font-black uppercase">
                Step 01
              </span>
              <h3 className="text-sm font-black uppercase text-black">Notify Support</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Contact our customer support team via WhatsApp or hotline with your <strong>Order ID</strong>, photo of the product, and desired size or issue reason.
              </p>
            </div>

            <div className="border-2 border-black bg-white p-5 space-y-2">
              <span className="inline-block bg-black text-white px-2 py-0.5 text-xs font-black uppercase">
                Step 02
              </span>
              <h3 className="text-sm font-black uppercase text-black">Courier Pickup</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Pack the garment with its original tags and invoice. Our courier will collect the package or you can dispatch it to our central Dhaka fulfillment hub.
              </p>
            </div>

            <div className="border-2 border-black bg-white p-5 space-y-2">
              <span className="inline-block bg-black text-white px-2 py-0.5 text-xs font-black uppercase">
                Step 03
              </span>
              <h3 className="text-sm font-black uppercase text-black">Replacement / Refund</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Once inspected at our facility, your replacement size is dispatched within 24-48 hours, or your refund is initiated immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="space-y-10 text-neutral-700">
          {/* Section 1: Eligibility */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              1. Eligibility Criteria for Returns & Exchanges
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                To qualify for an exchange or return, your items must comply with all of the following requirements:
              </p>
              <ul className="list-disc pl-5 space-y-2 font-medium">
                <li>
                  <strong>Original Condition:</strong> The garment must be completely unwashed, unworn, unstained, and free of odors or perfumes.
                </li>
                <li>
                  <strong>Tags & Packaging:</strong> All original product tags, waist tickets, branded labels, and packaging must remain attached and intact.
                </li>
                <li>
                  <strong>Proof of Purchase:</strong> The digital receipt, invoice paper slip, or SMS confirmation matching the order must be presented.
                </li>
                <li>
                  <strong>Timeframe:</strong> The exchange request must be initiated within <strong>7 calendar days</strong> of receiving the delivery.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Non-Returnable Items */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              2. Non-Returnable & Non-Exchangeable Items
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <div className="bg-red-50 border-2 border-black p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-black uppercase text-black block mb-1">Please Note:</span>
                  Items that have been tailored, hemmed, washed, or altered after delivery cannot be exchanged or refunded under any circumstances.
                </div>
              </div>
              <p>
                The following situations are not eligible for standard returns:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-medium">
                <li>Products marked as &quot;Clearance Sale&quot; or &quot;Final Sale&quot; during special promotional events.</li>
                <li>Normal wear and tear resulting from prolonged use after receipt.</li>
                <li>Items damaged due to improper washing or drying that contradicts garment care label instructions.</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Shipping Costs for Returns */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              3. Return Delivery Charges Policy
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                <strong>Fulfilment Error or Manufacturing Defect:</strong> If you received the incorrect size, wrong item, or a garment with verified manufacturing damage, JeansLoop covers <strong>100% of all reverse and forward courier charges</strong>.
              </p>
              <p>
                <strong>Customer Preference / Standard Size Exchange:</strong> If you ordered the correct size according to your order but wish to exchange for another size or design for personal comfort, the customer covers the nominal courier delivery fee (৳80 for Dhaka, ৳130-৳150 for outside Dhaka).
              </p>
            </div>
          </section>

          {/* Section 4: Refund Process */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              4. Refund Policy & Methods
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                If an exchange item is out of stock or if you are entitled to a monetary refund:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-medium">
                <li><strong>Mobile Financial Services (bKash / Nagad):</strong> Credited within <strong>3 to 5 business days</strong> after the returned garment passes quality inspection.</li>
                <li><strong>Bank Cards / Digital Gateway:</strong> Reversed back to your original payment card within <strong>7 to 10 working days</strong> (subject to bank clearance timelines).</li>
                <li><strong>Store Credit Option:</strong> Instant store coupon voucher sent via SMS with zero deduction and valid for 1 full year.</li>
              </ul>
            </div>
          </section>

          {/* Contact Box */}
          <section className="border-2 border-black p-6 md:p-8 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                Have An Exchange Request?
              </span>
              <h3 className="text-2xl font-black uppercase italic tracking-tight leading-none text-white">
                Contact Our Returns Desk
              </h3>
              <p className="text-xs text-neutral-300 mt-2 max-w-md">
                Our support team responds promptly to all size and return requests during business hours (10:00 AM – 8:00 PM).
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/8801911209322?text=Hi%2C%20I%20would%20like%20to%20request%20an%20exchange%20for%20my%20order."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black font-black uppercase text-xs px-5 py-3 hover:bg-neutral-200 transition-colors border-2 border-white"
              >
                <Phone className="w-4 h-4" /> Message On WhatsApp
              </a>
              <a
                href="mailto:info@jeansloop.com"
                className="inline-flex items-center gap-2 bg-transparent text-white font-black uppercase text-xs px-5 py-3 hover:bg-white hover:text-black transition-colors border-2 border-white"
              >
                <Mail className="w-4 h-4" /> Email Returns Desk
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
