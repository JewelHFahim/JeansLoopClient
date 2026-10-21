import type { Metadata } from 'next';
import Link from 'next/link';
import { Truck, Clock, ShieldCheck, MapPin, PackageCheck, AlertCircle, Phone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Delivery | JeansLoop',
  description: 'JeansLoop nationwide delivery coverage across Bangladesh, delivery fees, timelines, courier partners, and parcel tracking.',
};

export default function ShippingPage() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black">Shipping & Delivery</span>
        </nav>

        {/* Page Header */}
        <div className="border-b-4 border-black pb-8 mb-12">
          <span className="inline-block bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
            Logistics & Fulfillment
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
            Shipping & Delivery
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 font-medium mt-3 max-w-2xl leading-relaxed">
            Fast, secure, nationwide delivery across all 64 districts of Bangladesh. Every parcel is packed with care and handled by trusted logistics partners.
          </p>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Clock className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Dhaka Metro</h3>
              <p className="text-2xl font-black text-black mt-1">24–48 Hrs</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              Inside Dhaka city quick turnaround delivery.
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Truck className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Outside Dhaka</h3>
              <p className="text-2xl font-black text-black mt-1">2–4 Days</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              All 64 districts & sub-district upazilas.
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <ShieldCheck className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Cash on Delivery</h3>
              <p className="text-2xl font-black text-black mt-1">Available</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              Pay in cash directly to the courier rider upon delivery.
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <PackageCheck className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Live Tracking</h3>
              <p className="text-2xl font-black text-black mt-1">SMS & Web</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              Courier consignment ID sent via SMS upon dispatch.
            </p>
          </div>
        </div>

        {/* Policy Details */}
        <div className="space-y-10 text-neutral-700">
          {/* Section 1: Rates & Coverage */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              1. Delivery Coverage & Shipping Rates
            </h2>
            <p className="text-xs md:text-sm leading-relaxed mb-6">
              JeansLoop delivers nationwide across Bangladesh. Delivery charges are calculated dynamically at checkout based on your delivery district:
            </p>

            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full text-left text-xs uppercase font-medium">
                <thead className="bg-black text-white text-[11px] font-black tracking-wider">
                  <tr>
                    <th className="p-3 border-r border-neutral-700">Delivery Zone</th>
                    <th className="p-3 border-r border-neutral-700">Estimated Transit Time</th>
                    <th className="p-3">Standard Delivery Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  <tr className="bg-neutral-50">
                    <td className="p-3 font-bold border-r-2 border-black">Inside Dhaka City</td>
                    <td className="p-3 border-r-2 border-black">24 – 48 Hours</td>
                    <td className="p-3 font-black text-black">৳80</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r-2 border-black">Dhaka Suburbs (Gazipur, Savar, Keraniganj, Narayanganj)</td>
                    <td className="p-3 border-r-2 border-black">48 – 72 Hours</td>
                    <td className="p-3 font-black text-black">৳100 – ৳120</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="p-3 font-bold border-r-2 border-black">Outside Dhaka (All Other Districts)</td>
                    <td className="p-3 border-r-2 border-black">2 – 4 Business Days</td>
                    <td className="p-3 font-black text-black">৳130 – ৳150</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-neutral-500 font-bold uppercase mt-3">
              * Note: During festival campaigns (e.g., Eid sales, Black Friday) or severe weather conditions, logistics transit times may experience minor delays.
            </p>
          </section>

          {/* Section 2: Order Processing */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              2. Order Verification & Dispatch Schedule
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                <strong>Phone Verification:</strong> For Cash on Delivery (COD) orders, our customer support team may place a brief phone call to verify your shipping address and size selections before dispatching the parcel.
              </p>
              <p>
                <strong>Same-Day Handover:</strong> Orders placed and confirmed before <strong>2:00 PM (Saturday through Thursday)</strong> are handed over to our courier partner the exact same day. Orders received on Fridays or public holidays will be dispatched on the following business day.
              </p>
              <p>
                <strong>Order Tracking:</strong> Once your order has been packaged and handed over to the courier, you will receive an SMS containing your tracking number and direct link. You can also view real-time status updates in your <Link href="/account" className="font-bold text-black underline underline-offset-2">Account Dashboard</Link>.
              </p>
            </div>
          </section>

          {/* Section 3: Package Inspection */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              3. Parcel Inspection & Delivery Guidelines
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <div className="bg-amber-50 border-2 border-black p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-black uppercase text-black block mb-1">Important Safety Instruction:</span>
                  Please inspect the external packaging before accepting the parcel. If the package appears torn, unsealed, or visibly tampered with, refuse acceptance and notify our hotline immediately.
                </div>
              </div>
              <p>
                <strong>Open Box Policy:</strong> In accordance with standard courier policies in Bangladesh, riders cannot permit customers to unpack, try on clothing, or alter the package before completing payment. However, if there are any size mismatches or defects once opened, our hassle-free <Link href="/returns" className="font-bold text-black underline underline-offset-2">7-Day Return & Exchange Policy</Link> covers you completely!
              </p>
              <p>
                <strong>Delivery Attempts:</strong> Couriers will make up to two delivery attempts. Please ensure your contact phone number is reachable so the delivery executive can contact you upon arrival.
              </p>
            </div>
          </section>

          {/* Section 4: Contact & Support */}
          <section className="border-2 border-black p-6 md:p-8 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                Need Help With A Delivery?
              </span>
              <h3 className="text-2xl font-black uppercase italic tracking-tight leading-none text-white">
                Our Support Team Is Standing By
              </h3>
              <p className="text-xs text-neutral-300 mt-2 max-w-md">
                Have questions regarding your parcel tracking, delivery address changes, or special requests? Reach out to our customer care team.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/account"
                className="inline-flex items-center gap-2 bg-white text-black font-black uppercase text-xs px-5 py-3 hover:bg-neutral-200 transition-colors border-2 border-white"
              >
                Track In Account <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/8801911209322"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-transparent text-white font-black uppercase text-xs px-5 py-3 hover:bg-white hover:text-black transition-colors border-2 border-white"
              >
                <Phone className="w-4 h-4" /> WhatsApp Support
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
