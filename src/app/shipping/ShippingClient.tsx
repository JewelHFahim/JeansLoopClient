'use client';

import Link from 'next/link';
import { Truck, Clock, ShieldCheck, PackageCheck, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { useCustomerCareLang } from '@/hooks/useCustomerCareLang';
import { CustomerCareHeader } from '@/components/customercare/CustomerCareHeader';

interface ShippingClientProps {
  siteName: string;
  phone: string;
  whatsappClean: string;
}

export function ShippingClient({ siteName, phone, whatsappClean }: ShippingClientProps) {
  const { lang, setLang } = useCustomerCareLang();

  const isBn = lang === 'bn';

  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <CustomerCareHeader
          badge={{
            en: 'Logistics & Fulfillment',
            bn: 'লজিস্টিকস ও ডেলিভারি সেবা',
          }}
          title={{
            en: 'Shipping & Delivery',
            bn: 'শিপিং ও ডেলিভারি নীতিমালা',
          }}
          description={{
            en: `Fast, secure, nationwide delivery across all 64 districts of Bangladesh. Every parcel is packed with care and handled by trusted logistics partners.`,
            bn: `সারা বাংলাদেশে ৬৪ জেলায় দ্রুত ও নিরাপদ ডেলিভারি। প্রতিটি পার্সেল পরম যত্নে প্যাক করা হয় এবং বিশ্বস্ত ডেলিভারি পার্টনারদের মাধ্যমে পৌঁছে দেওয়া হয়।`,
          }}
          lang={lang}
          setLang={setLang}
        />

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Clock className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'ঢাকা মেট্রো' : 'Dhaka Metro'}
              </h3>
              <p className="text-2xl font-black text-black mt-1">
                {isBn ? '২৪–৪৮ ঘণ্টা' : '24–48 Hrs'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'ঢাকা শহরের ভেতরে দ্রুত টার্নঅ্যারাউন্ড ডেলিভারি।'
                : 'Inside Dhaka city quick turnaround delivery.'}
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Truck className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'ঢাকার বাইরে' : 'Outside Dhaka'}
              </h3>
              <p className="text-2xl font-black text-black mt-1">
                {isBn ? '২–৪ দিন' : '2–4 Days'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'সকল ৬৪ জেলা এবং থানা বা উপজেলা পর্যায়ে।'
                : 'All 64 districts & sub-district upazilas.'}
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <ShieldCheck className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}
              </h3>
              <p className="text-2xl font-black text-black mt-1">
                {isBn ? 'উপলব্ধ' : 'Available'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'পণ্য হাতে পেয়ে ডেলিভারি রাইডারের নিকট মূল্য পরিশোধ করুন।'
                : 'Pay in cash directly to the courier rider upon delivery.'}
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <PackageCheck className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'লাইভ ট্র্যাকিং' : 'Live Tracking'}
              </h3>
              <p className="text-2xl font-black text-black mt-1">
                {isBn ? 'এসএমএস ও ওয়েব' : 'SMS & Web'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'পার্সেল ছাড়ার পর এসএমএসের মাধ্যমে ট্র্যাকিং আইডি দেওয়া হয়।'
                : 'Courier consignment ID sent via SMS upon dispatch.'}
            </p>
          </div>
        </div>

        {/* Policy Details */}
        <div className="space-y-10 text-neutral-700">
          {/* Section 1: Rates & Coverage */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '১. ডেলিভারি এলাকা ও শিপিং চার্জ' : '1. Delivery Coverage & Shipping Rates'}
            </h2>
            <p className="text-xs md:text-sm leading-relaxed mb-6">
              {isBn
                ? `${siteName} সারা বাংলাদেশে দ্রুত হোম ডেলিভারি সুবিধা প্রদান করে। চেকআউটের সময় আপনার জেলার উপর ভিত্তি করে চার্জ স্বয়ংক্রিয়ভাবে যুক্ত হয়:`
                : `${siteName} delivers nationwide across Bangladesh. Delivery charges are calculated dynamically at checkout based on your delivery district:`}
            </p>

            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full text-left text-xs uppercase font-medium">
                <thead className="bg-black text-white text-[11px] font-black tracking-wider">
                  <tr>
                    <th className="p-3 border-r border-neutral-700">
                      {isBn ? 'ডেলিভারি এলাকা' : 'Delivery Zone'}
                    </th>
                    <th className="p-3 border-r border-neutral-700">
                      {isBn ? 'আনুমানিক সময়সীমা' : 'Estimated Transit Time'}
                    </th>
                    <th className="p-3">
                      {isBn ? 'স্ট্যান্ডার্ড ডেলিভারি ফি' : 'Standard Delivery Fee'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  <tr className="bg-neutral-50">
                    <td className="p-3 font-bold border-r-2 border-black">
                      {isBn ? 'ঢাকার ভেতরে (Dhaka City)' : 'Inside Dhaka'}
                    </td>
                    <td className="p-3 border-r-2 border-black">
                      {isBn ? '২৪ – ৪৮ ঘণ্টা' : '24 – 48 Hours'}
                    </td>
                    <td className="p-3 font-black text-black">৳70</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="p-3 font-bold border-r-2 border-black">
                      {isBn ? 'সাব ঢাকা (সাভার, কেরানীগঞ্জ, টঙ্গী, গাজীপুর)' : 'Sub Dhaka'}
                    </td>
                    <td className="p-3 border-r-2 border-black">
                      {isBn ? '২৪ – ৪৮ ঘণ্টা' : '24 – 48 Hours'}
                    </td>
                    <td className="p-3 font-black text-black">৳120</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r-2 border-black">
                      {isBn ? 'ঢাকার বাইরে (অন্যান্য সকল ৬৪ জেলা)' : 'Outside Dhaka (All Other Districts)'}
                    </td>
                    <td className="p-3 border-r-2 border-black">
                      {isBn ? '২ – ৪ কার্যদিবস' : '2 – 4 Business Days'}
                    </td>
                    <td className="p-3 font-black text-black">৳140</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-neutral-500 font-bold uppercase mt-3">
              {isBn
                ? '* বিশেষ দ্রষ্টব্য: উৎসবের মৌসুমে (যেমন: ঈদ ক্যাম্পেইন, ব্ল্যাক ফ্রাইডে) বা প্রাকৃতিক দুর্যোগ/খারাপ আবহাওয়ার কারণে ডেলিভারিতে সাময়িক কিছুটা বিলম্ব হতে পারে।'
                : '* Note: During festival campaigns (e.g., Eid sales, Black Friday) or severe weather conditions, logistics transit times may experience minor delays.'}
            </p>
          </section>

          {/* Section 2: Order Processing */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '২. অর্ডার ভেরিফিকেশন ও ডিসপ্যাচ সময়সূচী' : '2. Order Verification & Dispatch Schedule'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                <strong>{isBn ? 'ফোন ভেরিফিকেশন:' : 'Phone Verification:'}</strong>{' '}
                {isBn
                  ? 'ক্যাশ অন ডেলিভারি (COD) অর্ডারের ক্ষেত্রে পার্সেল পাঠানোর পূর্বে আমাদের কাস্টমার সাপোর্ট টিম ঠিকানা ও সাইজ নির্বাচন নিশ্চিত করার জন্য সংক্ষিপ্ত ফোন কল করতে পারেন।'
                  : 'For Cash on Delivery (COD) orders, our customer support team may place a brief phone call to verify your shipping address and size selections before dispatching the parcel.'}
              </p>
              <p>
                <strong>{isBn ? 'একই দিনে কুরিয়ারে হস্তান্তর:' : 'Same-Day Handover:'}</strong>{' '}
                {isBn ? (
                  <>
                    শুক্রবার থেকে বুধবার <strong>বেলা ১১:৫৯ এর পূর্বে</strong> নিশ্চিত হওয়া অর্ডারগুলো একই দিনে কুরিয়ার পার্টনারের কাছে বুঝিয়ে দেওয়া হয়। বৃহস্পতিবার বা সরকারি ছুটির দিনে প্রাপ্ত অর্ডার পরবর্তী কার্যদিবসে পাঠানো হবে।
                  </>
                ) : (
                  <>
                    Orders placed and confirmed before <strong>11:59 AM (Friday through Wednesday)</strong> are handed over to our courier partner the exact same day. Orders received on Thursday or public holidays will be dispatched on the following business day.
                  </>
                )}
              </p>
              <p>
                <strong>{isBn ? 'অর্ডার ট্র্যাকিং:' : 'Order Tracking:'}</strong>{' '}
                {isBn ? (
                  <>
                    আপনার অর্ডার প্যাকেজিং শেষে কুরিয়ার পার্টনারে হস্তান্তর করা মাত্রই আপনি ট্র্যাকিং নম্বর ও লিংক সহ একটি এসএমএস পাবেন। এছাড়াও আপনার{' '}
                    <Link href="/account" className="font-bold text-black underline underline-offset-2">
                      অ্যাকাউন্ট ড্যাশবোর্ডে
                    </Link>{' '}
                    রিয়েল-টাইম স্ট্যাটাস দেখা যাবে।
                  </>
                ) : (
                  <>
                    Once your order has been packaged and handed over to the courier, you will receive an SMS containing your tracking number and direct link. You can also view real-time status updates in your{' '}
                    <Link href="/account" className="font-bold text-black underline underline-offset-2">
                      Account Dashboard
                    </Link>.
                  </>
                )}
              </p>
            </div>
          </section>

          {/* Section 3: Package Inspection */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '৩. পার্সেল গ্রহণ ও পরিদর্শন নির্দেশিকা' : '3. Parcel Inspection & Delivery Guidelines'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <div className="bg-amber-50 border-2 border-black p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-black uppercase text-black block mb-1">
                    {isBn ? 'জরুরি নিরাপত্তা নির্দেশিকা:' : 'Important Safety Instruction:'}
                  </span>
                  {isBn
                    ? 'পার্সেল গ্রহণের পূর্বে বাইরের প্যাকেজিং ভালো করে পর্যবেক্ষণ করুন। প্যাকেট ছেঁড়া, সিল কাটা বা কোনো অসঙ্গতি চোখে পড়লে পার্সেল গ্রহণ করা থেকে বিরত থাকুন এবং অবিলম্বে আমাদের চ্যাটবক্স বা হটলাইনে অবহিত করুন।'
                    : 'Please inspect the external packaging before accepting the parcel. If the package appears torn, unsealed, or visibly tampered with, refuse acceptance and notify our chatbox or hotline immediately.'}
                </div>
              </div>
              <p>
                <strong>{isBn ? 'ওপেন বক্স পলিসি:' : 'Open Box Policy:'}</strong>{' '}
                {isBn ? (
                  <>
                    বাংলাদেশে প্রচলিত স্ট্যান্ডার্ড কুরিয়ার নীতি অনুযায়ী, রাইডারের সামনে প্যাকেট খুলে ট্রায়াল করা বা পণ্যে কোনো পরিবর্তন করার সুযোগ থাকে না। তবে প্যাকেট খোলার পর সাইজে কোনো অমিল বা ত্রুটি থাকলে আমাদের সহজ{' '}
                    <Link href="/returns" className="font-bold text-black underline underline-offset-2">
                      ৭ দিনের এক্সচেঞ্জ পলিসি
                    </Link>{' '}
                    রয়েছে যাতে আপনি সম্পূর্ণ সুরক্ষিত!
                  </>
                ) : (
                  <>
                    In accordance with standard courier policies in Bangladesh, riders cannot permit customers to unpack, try on clothing, or alter the package before completing payment. However, if there are any size mismatches or defects once opened, our hassle-free{' '}
                    <Link href="/returns" className="font-bold text-black underline underline-offset-2">
                      7-Day Exchange Policy
                    </Link>{' '}
                    covers you completely!
                  </>
                )}
              </p>
              <p>
                <strong>{isBn ? 'ডেলিভারি চেষ্টা:' : 'Delivery Attempts:'}</strong>{' '}
                {isBn
                  ? 'কুরিয়ার প্রতিনিধি ডেলিভারির জন্য সর্বোচ্চ ৩ বার পর্যন্ত চেষ্টা করবেন। প্রতিনিধি পৌঁছানোর সময় যোগাযোগ করার সুবিধার্থে অনুগ্রহ করে আপনার ফোন নম্বরটি সবসময় সচল ও পৌঁছানোযোগ্য রাখুন।'
                  : 'Couriers will make up to three delivery attempts. Please ensure your contact phone number is reachable so the delivery executive can contact you upon arrival.'}
              </p>
            </div>
          </section>

          {/* Section 4: Contact & Support */}
          <section className="border-2 border-black p-6 md:p-8 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                {isBn ? 'ডেলিভারি সংক্রান্ত সাহায্য চান?' : 'Need Help With A Delivery?'}
              </span>
              <h3 className="text-2xl font-black uppercase italic tracking-tight leading-none text-white">
                {isBn ? 'আমাদের সাপোর্ট টিম সার্বক্ষণিক প্রস্তুত' : 'Our Support Team Is Standing By'}
              </h3>
              <p className="text-xs text-neutral-300 mt-2 max-w-md">
                {isBn
                  ? 'পার্সেল ট্র্যাকিং, ডেলিভারি ঠিকানা পরিবর্তন বা যেকোনো তথ্যের জন্য আমাদের কাস্টমার কেয়ার প্রতিনিধির সাথে যোগাযোগ করুন।'
                  : 'Have questions regarding your parcel tracking, delivery address changes, or special requests? Reach out to our customer care team.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/account"
                className="inline-flex items-center gap-2 bg-white text-black font-black uppercase text-xs px-5 py-3 hover:bg-neutral-200 transition-colors border-2 border-white"
              >
                {isBn ? 'অ্যাকাউন্টে ট্র্যাক করুন' : 'Track In Account'}{' '}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${whatsappClean || '8801911209322'}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-transparent text-white font-black uppercase text-xs px-5 py-3 hover:bg-white hover:text-black transition-colors border-2 border-white"
              >
                <Phone className="w-4 h-4" />{' '}
                {isBn ? 'হোয়াটসঅ্যাপ সাপোর্ট' : 'WhatsApp Support'}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
