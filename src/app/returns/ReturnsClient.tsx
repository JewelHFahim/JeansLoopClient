'use client';

import { RotateCcw, CheckCircle2, AlertTriangle, Phone, Mail, Package, ShieldCheck } from 'lucide-react';
import { useCustomerCareLang } from '@/hooks/useCustomerCareLang';
import { CustomerCareHeader } from '@/components/customercare/CustomerCareHeader';

interface ReturnsClientProps {
  siteName: string;
  email: string;
  phone: string;
  businessHours: string;
  whatsappClean: string;
}

export function ReturnsClient({
  siteName,
  email,
  phone,
  businessHours,
  whatsappClean,
}: ReturnsClientProps) {
  const { lang, setLang } = useCustomerCareLang();
  const isBn = lang === 'bn';

  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <CustomerCareHeader
          badge={{
            en: 'Customer Satisfaction Guarantee',
            bn: 'গ্রাহক সন্তুষ্টি গ্যারান্টি',
          }}
          title={{
            en: 'Returns & Exchanges',
            bn: 'রিটার্ন ও এক্সচেঞ্জ পলিসি',
          }}
          description={{
            en: `We want you to love your fit. If your garments don't fit right or meet our high standards, our 7-day exchange and return policy has you covered.`,
            bn: `আপনার সঠিক ফিটিং আমাদের অগ্রাধিকার। পোশাকের সাইজ বা ফিটিং নিয়ে সন্তুষ্ট না হলে ৭ দিনের সহজ এক্সচেঞ্জ ও রিটার্ন সুবিধায় আপনি সম্পূর্ণ সুরক্ষিত।`,
          }}
          lang={lang}
          setLang={setLang}
        />

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <RotateCcw className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'এক্সচেঞ্জ সময়সীমা' : 'Exchange Window'}
              </h3>
              <p className="text-2xl font-black text-black mt-1">
                {isBn ? '৭ দিন' : '7 Days'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'পার্সেল হাতে পাওয়ার পর থেকে ৭ ক্যালেন্ডার দিনের মধ্যে প্রযোজ্য।'
                : 'Valid within 7 calendar days from package receipt.'}
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Package className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'ফিট গ্যারান্টি' : 'Fit Guarantee'}
              </h3>
              <p className="text-2xl font-black text-black mt-1">
                {isBn ? 'সহজ সোয়াপ' : 'Easy Swap'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'সঠিক কোমর ও সাইজের জন্য দ্রুত সাইজ পরিবর্তনের সুবিধা।'
                : 'Quick size adjustments to get your perfect waist & length.'}
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <ShieldCheck className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'ডিফেক্ট কাভারেজ' : 'Defect Cover'}
              </h3>
              <p className="text-2xl font-black text-black mt-1">
                {isBn ? '১০০% ফ্রি' : '100% Free'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? `পণ্যে উৎপাদনজনিত কোনো ত্রুটি থাকলে শিপিং খরচ ${siteName} বহন করবে।`
                : `${siteName} pays all shipping if item is damaged or defective.`}
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <CheckCircle2 className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'রিফান্ড সময়সীমা' : 'Refund Turnaround'}
              </h3>
              <p className="text-2xl font-black text-black mt-1">
                {isBn ? '৩–৫ দিন' : '3–5 Days'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'বিকাশ, নগদ বা মূল পেমেন্ট মেথডের মাধ্যমে সরাসরি রিফান্ড।'
                : 'Direct refund via bKash, Nagad, or original payment method.'}
            </p>
          </div>
        </div>

        {/* 3 Step Process */}
        <div className="border-2 border-black p-6 md:p-8 bg-neutral-50 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-6">
            {isBn ? 'সহজ ৩ ধাপে এক্সচেঞ্জ ও রিটার্ন প্রক্রিয়া' : 'How The Exchange & Return Process Works'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-black bg-white p-5 space-y-2">
              <span className="inline-block bg-black text-white px-2 py-0.5 text-xs font-black uppercase">
                {isBn ? 'ধাপ ০১' : 'Step 01'}
              </span>
              <h3 className="text-sm font-black uppercase text-black">
                {isBn ? 'সাপোর্ট টিমে জানান' : 'Notify Support'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {isBn
                  ? 'আপনার অর্ডার আইডি, পণ্যের ছবি এবং কাঙ্ক্ষিত সাইজ বা কারণ উল্লেখ করে হোয়াটসঅ্যাপ অথবা হটলাইনে যোগাযোগ করুন।'
                  : 'Contact our customer support team via WhatsApp or hotline with your Order ID, photo of the product, and desired size or issue reason.'}
              </p>
            </div>

            <div className="border-2 border-black bg-white p-5 space-y-2">
              <span className="inline-block bg-black text-white px-2 py-0.5 text-xs font-black uppercase">
                {isBn ? 'ধাপ ০২' : 'Step 02'}
              </span>
              <h3 className="text-sm font-black uppercase text-black">
                {isBn ? 'কুরিয়ার পিকআপ' : 'Courier Pickup'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {isBn
                  ? 'মূল ট্যাগ ও ইনভয়েস সহ পণ্যটি নিরাপদে প্যাক করুন। কুরিয়ার প্রতিনিধি পার্সেলটি সংগ্রহ করবেন অথবা আমাদের ঢাকা সেন্ট্রাল হাবে পাঠাতে পারেন।'
                  : 'Pack the garment with its original tags and invoice. Our courier will collect the package or you can dispatch it to our central Dhaka fulfillment hub.'}
              </p>
            </div>

            <div className="border-2 border-black bg-white p-5 space-y-2">
              <span className="inline-block bg-black text-white px-2 py-0.5 text-xs font-black uppercase">
                {isBn ? 'ধাপ ০৩' : 'Step 03'}
              </span>
              <h3 className="text-sm font-black uppercase text-black">
                {isBn ? 'নতুন সাইজ গ্রহণ / রিফান্ড' : 'Replacement / Refund'}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {isBn
                  ? 'আমাদের কোয়ালিটি টিমের যাচাইয়ের পর ২৪-৪৮ ঘণ্টার মধ্যে নতুন সাইজ পাঠিয়ে দেওয়া হয় অথবা তাৎক্ষণিক রিফান্ড সম্পন্ন হয়।'
                  : 'Once inspected at our facility, your replacement size is dispatched within 24-48 hours, or your refund is initiated immediately.'}
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
              {isBn ? '১. রিটার্ন ও এক্সচেঞ্জের যোগ্যতার শর্তাবলী' : '1. Eligibility Criteria for Returns & Exchanges'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                {isBn
                  ? 'একটি পণ্য সফলভাবে এক্সচেঞ্জ বা রিটার্ন করার জন্য নিম্নলিখিত শর্তগুলো পূরণ করা আবশ্যক:'
                  : 'To qualify for an exchange or return, your items must comply with all of the following requirements:'}
              </p>
              <ul className="list-disc pl-5 space-y-2 font-medium">
                <li>
                  <strong>{isBn ? 'অব্যবহৃত অবস্থা:' : 'Original Condition:'}</strong>{' '}
                  {isBn
                    ? 'পোশাকটি সম্পূর্ণ আনওয়াশড, অব্যবহৃত, দাগহীন এবং পারফিউম বা কোনো কৃত্রিম সুবাসমুক্ত হতে হবে।'
                    : 'The garment must be completely unwashed, unworn, unstained, and free of odors or perfumes.'}
                </li>
                <li>
                  <strong>{isBn ? 'ট্যাগ ও মূল প্যাকেজিং:' : 'Tags & Packaging:'}</strong>{' '}
                  {isBn
                    ? 'সকল মূল ব্র্যান্ড ট্যাগ, কোমরের সাইজ টিকিট এবং প্যাকেজিং অক্ষত অবস্থায় পণ্যের সাথে যুক্ত থাকতে হবে।'
                    : 'All original product tags, waist tickets, branded labels, and packaging must remain attached and intact.'}
                </li>
                <li>
                  <strong>{isBn ? 'ক্রয়ের প্রমাণ:' : 'Proof of Purchase:'}</strong>{' '}
                  {isBn
                    ? 'ডিজিটাল রসিদ, কাগজের ইনভয়েস স্লিপ অথবা অর্ডার নিশ্চিতকরণ এসএমএস প্রদর্শন করতে হবে।'
                    : 'The digital receipt, invoice paper slip, or SMS confirmation matching the order must be presented.'}
                </li>
                <li>
                  <strong>{isBn ? 'সময়সীমা:' : 'Timeframe:'}</strong>{' '}
                  {isBn
                    ? 'ডেলিভারি গ্রহণের তারিখ থেকে সর্বোচ্চ ৭ ক্যালেন্ডার দিনের মধ্যে এক্সচেঞ্জ অনুরোধ করতে হবে।'
                    : 'The exchange request must be initiated within 7 calendar days of receiving the delivery.'}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Non-Returnable Items */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '২. যেসকল ক্ষেত্রে এক্সচেঞ্জ বা রিটার্ন প্রযোজ্য নয়' : '2. Non-Returnable & Non-Exchangeable Items'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <div className="bg-red-50 border-2 border-black p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-black uppercase text-black block mb-1">
                    {isBn ? 'বিশেষ সতর্কতা:' : 'Please Note:'}
                  </span>
                  {isBn
                    ? 'ডেলিভারি নেওয়ার পর টেইলারিং করানো, অল্টারেশন বা সেলাই করা, ধোয়া হয়েছে বা পরিবর্তন করা হয়েছে এমন কোনো পোশাকের ক্ষেত্রে এক্সচেঞ্জ বা রিফান্ড প্রযোজ্য হবে না।'
                    : 'Items that have been tailored, hemmed, washed, or altered after delivery cannot be exchanged or refunded under any circumstances.'}
                </div>
              </div>
              <p>
                {isBn
                  ? 'নিম্নলিখিত পরিস্থিতিতে সাধারণ রিটার্ন বা এক্সচেঞ্জ গ্রহণযোগ্য নয়:'
                  : 'The following situations are not eligible for standard returns:'}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-medium">
                <li>
                  {isBn
                    ? 'বিশেষ প্রমোশনাল ইভেন্টে "ক্লিয়ারেন্স সেল" বা "ফাইনাল সেল" হিসেবে চিহ্নিত পণ্য।'
                    : 'Products marked as "Clearance Sale" or "Final Sale" during special promotional events.'}
                </li>
                <li>
                  {isBn
                    ? 'ডেলিভারির পর ব্যবহারের ফলে কাপড়ের স্বাভাবিক ক্ষয়ক্ষতি।'
                    : 'Normal wear and tear resulting from prolonged use after receipt.'}
                </li>
                <li>
                  {isBn
                    ? 'পোশাকের ওয়াশ কেয়ার লেবেলের নির্দেশিকা না মেনে ভুল পদ্ধতিতে ধোয়া বা শুকানোর কারণে ক্ষতিগ্রস্ত পণ্য।'
                    : 'Items damaged due to improper washing or drying that contradicts garment care label instructions.'}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Shipping Costs for Returns */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '৩. রিটার্ন ডেলিভারি চার্জ নীতিমালা' : '3. Return Delivery Charges Policy'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                <strong>{isBn ? 'আমাদের ভুল বা ত্রুটিপূর্ণ পণ্য:' : 'Fulfilment Error or Manufacturing Defect:'}</strong>{' '}
                {isBn
                  ? `আপনি যদি ভুল সাইজ, ভুল পোশাক বা উৎপাদনগত ত্রুটিযুক্ত কোনো পণ্য পেয়ে থাকেন, তবে আসা ও যাওয়ার কুরিয়ার চার্জের ১০০% খরচ ${siteName} বহন করবে।`
                  : `If you received the incorrect size, wrong item, or a garment with verified manufacturing damage, ${siteName} covers 100% of all reverse and forward courier charges.`}
              </p>
              <p>
                <strong>{isBn ? 'গ্রাহকের পছন্দ অনুযায়ী সাইজ পরিবর্তন:' : 'Customer Preference / Standard Size Exchange:'}</strong>{' '}
                {isBn
                  ? 'আপনার অর্ডারের সঠিক সাইজ পৌঁছানোর পরও যদি আপনি নিজের ইচ্ছায় ভিন্ন কোনো সাইজ বা ফিটিং নিতে চান, তবে কেবলমাত্র কুরিয়ারের ন্যূনতম ডেলিভারি ফি (ঢাকায় ৳৭০-৮০, ঢাকার বাইরে ৳১৩০-১৫০) প্রযোজ্য হবে।'
                  : 'If you ordered the correct size according to your order but wish to exchange for another size or design for personal comfort, the customer covers the nominal courier delivery fee (৳80 for Dhaka, ৳130-৳150 for outside Dhaka).'}
              </p>
            </div>
          </section>

          {/* Section 4: Refund Process */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '৪. রিফান্ড পদ্ধতি ও সময়সীমা' : '4. Refund Policy & Methods'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                {isBn
                  ? 'যদি কোনো এক্সচেঞ্জ আইটেম স্টকে না থাকে বা কোনো ক্ষেত্রে ক্যাশ রিফান্ড প্রযোজ্য হয়:'
                  : 'If an exchange item is out of stock or if you are entitled to a monetary refund:'}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-medium">
                <li>
                  <strong>{isBn ? 'মোবাইল ফিনান্সিয়াল সার্ভিস (বিকাশ / নগদ):' : 'Mobile Financial Services (bKash / Nagad):'}</strong>{' '}
                  {isBn
                    ? 'ফেরত আসা পোশাকটি কোয়ালিটি চেকে পাস করার ৩ থেকে ৫ কার্যদিবসের মধ্যে রিফান্ড পাঠানো হয়।'
                    : 'Credited within 3 to 5 business days after the returned garment passes quality inspection.'}
                </li>
                <li>
                  <strong>{isBn ? 'ব্যাংক কার্ড / ডিজিটাল গেটওয়ে:' : 'Bank Cards / Digital Gateway:'}</strong>{' '}
                  {isBn
                    ? 'সংশ্লিষ্ট ব্যাংকের ক্লিয়ারেন্স টাইমলাইন অনুযায়ী ৭ থেকে ১০ কার্যদিবসের মধ্যে মূল কার্ডে ফেরত যায়।'
                    : 'Reversed back to your original payment card within 7 to 10 working days (subject to bank clearance timelines).'}
                </li>
                <li>
                  <strong>{isBn ? 'স্টোর ক্রেডিট বিকল্প:' : 'Store Credit Option:'}</strong>{' '}
                  {isBn
                    ? 'কোনো প্রকার কর্তন ছাড়াই তাৎক্ষণিক ১ বছর মেয়াদী সমমূল্যের স্টোর ভাউচার কোড গ্রহণ করতে পারেন।'
                    : 'Instant store coupon voucher sent via SMS with zero deduction and valid for 1 full year.'}
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Box */}
          <section className="border-2 border-black p-6 md:p-8 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                {isBn ? 'কোনো এক্সচেঞ্জ অনুরোধ আছে?' : 'Have An Exchange Request?'}
              </span>
              <h3 className="text-2xl font-black uppercase italic tracking-tight leading-none text-white">
                {isBn ? 'আমাদের রিটার্নস ডেস্কে যোগাযোগ করুন' : 'Contact Our Returns Desk'}
              </h3>
              <p className="text-xs text-neutral-300 mt-2 max-w-md">
                {isBn
                  ? `আমাদের কাস্টমার কেয়ার টিম কার্যকালীন সময়ে (${businessHours}) সকল সাইজ ও এক্সচেঞ্জ সংক্রান্ত বিষয়ে দ্রুত সমাধান প্রদান করে।`
                  : `Our support team responds promptly to all size and return requests during business hours (${businessHours}).`}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${whatsappClean || '8801911209322'}?text=${encodeURIComponent(
                  isBn
                    ? 'হ্যালো, আমি আমার অর্ডারের জন্য সাইজ এক্সচেঞ্জের অনুরোধ করতে চাই।'
                    : 'Hi, I would like to request an exchange for my order.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black font-black uppercase text-xs px-5 py-3 hover:bg-neutral-200 transition-colors border-2 border-white"
              >
                <Phone className="w-4 h-4" />{' '}
                {isBn ? 'হোয়াটসঅ্যাপে জানান' : 'Message On WhatsApp'}
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 bg-transparent text-white font-black uppercase text-xs px-5 py-3 hover:bg-white hover:text-black transition-colors border-2 border-white"
              >
                <Mail className="w-4 h-4" />{' '}
                {isBn ? 'ইমেইল রিটার্ন ডেস্ক' : 'Email Returns Desk'}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
