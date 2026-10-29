'use client';

import Link from 'next/link';
import { Lock, Shield, Database, FileCheck, Mail, Phone } from 'lucide-react';
import { useCustomerCareLang } from '@/hooks/useCustomerCareLang';
import { CustomerCareHeader } from '@/components/customercare/CustomerCareHeader';

interface PrivacyClientProps {
  siteName: string;
  email: string;
  whatsappClean: string;
}

export function PrivacyClient({ siteName, email, whatsappClean }: PrivacyClientProps) {
  const { lang, setLang } = useCustomerCareLang();
  const isBn = lang === 'bn';

  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <CustomerCareHeader
          badge={{
            en: 'Trust & Security',
            bn: 'নিরাপত্তা ও গোপনীয়তা',
          }}
          title={{
            en: 'Privacy Policy',
            bn: 'গোপনীয়তা নীতিমালা',
          }}
          description={{
            en: `Your privacy is of utmost importance to us. This policy outlines how ${siteName} collects, uses, protects, and handles your personal information across our website and services.`,
            bn: `আপনার তথ্যের নিরাপত্তা আমাদের কাছে অত্যন্ত মূল্যবান। ${siteName} কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষিত রাখে তা এখানে বিস্তারিত বর্ণিত রয়েছে।`,
          }}
          lang={lang}
          setLang={setLang}
        />

        {/* Security Principles Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Shield className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'তথ্য বিক্রয়মুক্ত' : 'Zero Data Selling'}
              </h3>
              <p className="text-lg font-black text-black mt-1">
                {isBn ? '১০০% গোপনীয়' : '100% Private'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'আমরা কখনোই কোনো তৃতীয় পক্ষের কাছে আপনার তথ্য বিক্রি বা ভাড়া দিই না।'
                : 'We never sell or rent your personal details to third-party advertisers.'}
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Lock className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'এসএসএল এনক্রিপশন' : 'SSL Encryption'}
              </h3>
              <p className="text-lg font-black text-black mt-1">
                {isBn ? '২৫৬-বিট টিএলএস' : '256-Bit TLS'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'চেকআউট সেশন এবং সকল তথ্য শক্তিশালী আধুনিক এনক্রিপশন দ্বারা সুরক্ষিত।'
                : 'All checkout sessions and sensitive payloads are fully encrypted.'}
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Database className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'নিরাপদ ডেটাবেস' : 'Secure Storage'}
              </h3>
              <p className="text-lg font-black text-black mt-1">
                {isBn ? 'বিক্রিপ্ট হ্যাশ' : 'Bcrypt Hash'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'ব্যবহারকারীর পাসওয়ার্ড ক্রিপ্টোগ্রাফিকভাবে সুরক্ষিত হ্যাশ আকারে সংরক্ষিত হয়।'
                : 'User passwords are cryptographically salted and hashed.'}
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <FileCheck className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'গ্রাহকের নিয়ন্ত্রণ' : 'User Control'}
              </h3>
              <p className="text-lg font-black text-black mt-1">
                {isBn ? 'সম্পূর্ণ অধিকার' : 'Total Access'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'যেকোনো সময় আপনার অ্যাকাউন্টের তথ্য দেখা, পরিবর্তন বা মুছে ফেলার অধিকার আপনার।'
                : 'View, edit, or delete your account records anytime in settings.'}
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-neutral-700">
          {/* Section 1 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '১. যেসকল তথ্য আমরা সংগ্রহ করি' : '1. Information We Collect'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                {isBn
                  ? `আপনি যখন ${siteName} ব্যবহার করেন (পণ্য ব্রাউজ করা, অ্যাকাউন্ট তৈরি, অর্ডার প্রদান বা সাপোর্টে যোগাযোগ), তখন আমরা নিচের তথ্যগুলো সংগ্রহ করতে পারি:`
                  : `When you interact with ${siteName} (browse products, register an account, make a purchase, or contact support), we may collect the following categories of information:`}
              </p>
              <ul className="list-disc pl-5 space-y-2 font-medium">
                <li>
                  <strong>{isBn ? 'যোগাযোগ ও পরিচয় তথ্য:' : 'Contact & Identity Details:'}</strong>{' '}
                  {isBn
                    ? 'আপনার পুরো নাম, ইমেইল ঠিকানা, মোবাইল ফোন নম্বর এবং ডেলিভারির জন্য বিকল্প নম্বর।'
                    : 'Your full name, email address, phone number, and alternate contact numbers provided during account registration or checkout.'}
                </li>
                <li>
                  <strong>{isBn ? 'শিপিং ও ডেলিভারি ঠিকানা:' : 'Shipping & Delivery Details:'}</strong>{' '}
                  {isBn
                    ? 'সম্পূর্ণ ডেলিভারি ঠিকানা, জেলা, থানা এবং ডেলিভারি সংক্রান্ত বিশেষ কোনো দিকনির্দেশনা।'
                    : 'Physical delivery address, district, area landmarks, and specific delivery instructions.'}
                </li>
                <li>
                  <strong>{isBn ? 'অর্ডার হিস্ট্রি ও কার্ট বিবরণ:' : 'Order History & Cart Details:'}</strong>{' '}
                  {isBn
                    ? 'ক্রয়কৃত আইটেম, সাইজ, পরিমাণ, মোট টাকা, ব্যবহৃত ডিসকাউন্ট কুপন এবং ডেলিভারি স্ট্যাটাস।'
                    : 'Purchased items, sizes, quantities, order totals, discount coupons used, and delivery status.'}
                </li>
                <li>
                  <strong>{isBn ? 'অ্যাকাউন্ট সিকিউরিটি:' : 'Account Credentials:'}</strong>{' '}
                  {isBn
                    ? 'পাসওয়ার্ড কখনোই সাধারণ টেক্সটে রাখা হয় না; তা সুরক্ষিত ক্রিপ্টোগ্রাফিক অ্যালগরিদম (bcrypt) দিয়ে সংরক্ষিত থাকে।'
                    : 'Passwords are stored exclusively using secure one-way cryptographic hashing (bcrypt). We never store plain text passwords.'}
                </li>
                <li>
                  <strong>{isBn ? 'কারিগরি ও ব্যবহারের তথ্য:' : 'Technical & Usage Information:'}</strong>{' '}
                  {isBn
                    ? 'আপনার আইপি এড্রেস, ডিভাইসের ধরন, ব্রাউজারের বিবরণ এবং কার্ট সচল রাখার জন্য ব্রাউজার কুকিজ।'
                    : 'IP address, device type, browser specifications, and cookie session identifiers to keep your shopping cart synchronized.'}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '২. আমরা কীভাবে তথ্য ব্যবহার করি' : '2. How We Use Your Information'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                {isBn
                  ? 'আমরা শুধুমাত্র নির্ভরযোগ্য এবং প্রাসঙ্গিক ব্যবসায়িক প্রয়োজনে আপনার তথ্য ব্যবহার করি:'
                  : 'We use your personal data solely for legitimate business purposes:'}
              </p>
              <ul className="list-disc pl-5 space-y-2 font-medium">
                <li>
                  <strong>{isBn ? 'অর্ডার ডেলিভারি:' : 'Order Fulfillment:'}</strong>{' '}
                  {isBn
                    ? 'লেনদেন প্রক্রিয়া সম্পন্ন করা, পোশাক প্রস্তুত করা, প্যাকেজিং এবং আপনার দোরগোড়ায় পার্সেল পৌঁছানো।'
                    : 'Processing transactions, preparing items, generating packing slips, and delivering packages to your doorstep.'}
                </li>
                <li>
                  <strong>{isBn ? 'অর্ডার আপডেট ও নোটিফিকেশন:' : 'Order Updates & Communications:'}</strong>{' '}
                  {isBn
                    ? 'অর্ডার নিশ্চিতকরণ এসএমএস/ইমেইল, পার্সেল ট্র্যাকিং লিংক এবং ডেলিভারি স্ট্যাটাস বার্তা প্রেরণ।'
                    : 'Sending automated order confirmation SMS/emails, tracking links, and delivery notifications.'}
                </li>
                <li>
                  <strong>{isBn ? 'কাস্টমার সাপোর্ট:' : 'Customer Support:'}</strong>{' '}
                  {isBn
                    ? 'সাইজ গাইডেন্স, এক্সচেঞ্জ অনুরোধ, অর্ডার পরিবর্তন বা রিফান্ড সংক্রান্ত অনুসন্ধান সমাধান।'
                    : 'Assisting you with size guidance, exchange requests, order modifications, or refund queries.'}
                </li>
                <li>
                  <strong>{isBn ? 'নিরাপত্তা ও প্রতারণা প্রতিরোধ:' : 'Security & Fraud Prevention:'}</strong>{' '}
                  {isBn
                    ? 'ক্যাশ অন ডেলিভারি অর্ডারে জালিয়াতি রোধ এবং ডেলিভারি কার্যকারিতা নিশ্চিত করতে ফোন নম্বর যাচাইকরণ।'
                    : 'Validating phone numbers for Cash on Delivery orders to protect against fraudulent claims and failed dispatches.'}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '৩. তৃতীয় পক্ষের সাথে তথ্য শেয়ার' : '3. Data Sharing With Third Parties'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                {isBn
                  ? `আমরা কখনোই আপনার ব্যক্তিগত তথ্য কোনো বহিরাগত পক্ষের কাছে বিক্রয়, বাণিজ্য বা ভাড়া দিই না। কেবলমাত্র অর্ডার সফলভাবে সম্পূর্ণ করার জন্য বিশ্বস্ত অংশীদারদের সাথে প্রয়োজনীয় তথ্য প্রদান করা হয়:`
                  : `We do not sell, trade, or rent your personal identification information to outside parties. We only share essential details with trusted operational partners under strict confidentiality:`}
              </p>
              <ul className="list-disc pl-5 space-y-2 font-medium">
                <li>
                  <strong>{isBn ? 'কুরিয়ার ও লজিস্টিকস পার্টনার:' : 'Logistics & Courier Partners:'}</strong>{' '}
                  {isBn
                    ? 'পার্সেল পৌঁছে দেওয়ার স্বার্থে আপনার নাম, ঠিকানা ও ফোন নম্বর অনুমোদিত কুরিয়ার সার্ভিসের (যেমন: Steadfast, Pathao, RedX) সাথে শেয়ার করা হয়।'
                    : 'We share your recipient name, delivery address, and phone number with logistics partners solely for parcel delivery.'}
                </li>
                <li>
                  <strong>{isBn ? 'অনলাইন পেমেন্ট প্রসেসর:' : 'Payment Processors:'}</strong>{' '}
                  {isBn
                    ? `অনলাইন পেমেন্টগুলো (যেমন: বিকাশ, নগদ, মাস্টারকার্ড/ভিসা) অনুমোদিত পিসিআই-ডিএসএস কমপ্লায়েন্ট গেটওয়ের মাধ্যমে নিয়ন্ত্রিত হয়। ${siteName} কখনোই আপনার কার্ডের পিন বা সিভিভি নম্বর ধারণ বা সংরক্ষণ করে না।`
                    : `Online payment transactions (e.g. bKash, SSLCommerz, Nagad, Visa/Mastercard) are handled directly through accredited, PCI-DSS compliant payment gateways. ${siteName} does not capture or store your debit/credit card CVV or PIN numbers.`}
                </li>
                <li>
                  <strong>{isBn ? 'আইনি প্রয়োজনীয়তা:' : 'Legal Requirements:'}</strong>{' '}
                  {isBn
                    ? 'বাংলাদেশ সরকারের প্রযোজ্য আইন বা আদালতের নির্দেশনা অনুযায়ী বাধ্য হলে তথ্য প্রকাশ করা হতে পারে।'
                    : 'We may disclose information if required by applicable law, court order, or governmental authorities of Bangladesh.'}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '৪. কুকিজ ও ব্রাউজার স্টোরেজ' : '4. Cookies and Session Storage'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                {isBn
                  ? `${siteName} নিরবচ্ছিন্ন শপিং অভিজ্ঞতা দিতে ব্রাউজারের প্রয়োজনীয় কুকিজ ব্যবহার করে:`
                  : `${siteName} utilizes essential cookies and browser local storage to provide a smooth shopping experience:`}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-medium">
                <li>
                  {isBn
                    ? 'সাইট বন্ধ করলেও আপনার কার্টে যোগ করা পণ্য স্মরণ রাখা।'
                    : 'Remembering items placed in your shopping cart between visits.'}
                </li>
                <li>
                  {isBn
                    ? 'আপনি লগইন অবস্থায় থাকলে আপনার কাস্টমার সেশন কার্যকর রাখা।'
                    : 'Maintaining your authenticated session when you log into your customer account.'}
                </li>
                <li>
                  {isBn
                    ? 'দ্রুত নেভিগেশনের জন্য লেআউট ও ইউআই পছন্দসমূহ সংরক্ষণ করা।'
                    : 'Storing layout and UI preferences for fast navigation.'}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '৫. আপনার অধিকার ও নিয়ন্ত্রণ' : '5. Your Rights and Data Control'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                {isBn
                  ? 'আমাদের মূল্যবান গ্রাহক হিসেবে আপনার তথ্যের ওপর পূর্ণ নিয়ন্ত্রণ আপনার রয়েছে:'
                  : 'As a valued customer, you have full ownership of your data:'}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-medium">
                <li>
                  {isBn ? (
                    <>
                      আপনার{' '}
                      <Link href="/account" className="font-bold text-black underline underline-offset-2">
                        অ্যাকাউন্ট ড্যাশবোর্ড
                      </Link>{' '}
                      থেকে যেকোনো সময় আপনার নাম, ঠিকানা ও যোগাযোগের তথ্য পরিবর্তন করতে পারেন।
                    </>
                  ) : (
                    <>
                      You can access and update your profile details and saved shipping addresses at any time via your{' '}
                      <Link href="/account" className="font-bold text-black underline underline-offset-2">
                        Account Dashboard
                      </Link>.
                    </>
                  )}
                </li>
                <li>
                  {isBn
                    ? 'আমাদের ডাটাবেজে থাকা আপনার ব্যক্তিগত তথ্যের অনুলিপি পেতে অনুরোধ করতে পারেন।'
                    : 'You can request a complete export of your personal data stored on our servers.'}
                </li>
                <li>
                  {isBn
                    ? 'প্রয়োজনে আমাদের সাপোর্ট টিমে বার্তা পাঠিয়ে আপনার অ্যাকাউন্ট ও হিস্ট্রি মুছে ফেলার আবেদন জানাতে পারেন।'
                    : 'You can request the deletion of your account and associated contact history by writing to our privacy team.'}
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Box */}
          <section className="border-2 border-black p-6 md:p-8 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                {isBn ? 'ডাটা প্রাইভেসি টিম' : 'Data Privacy Officer'}
              </span>
              <h3 className="text-2xl font-black uppercase italic tracking-tight leading-none text-white">
                {isBn ? 'গোপনীয়তা সংক্রান্ত জিজ্ঞাসা?' : 'Questions Regarding Privacy?'}
              </h3>
              <p className="text-xs text-neutral-300 mt-2 max-w-md">
                {isBn
                  ? 'আপনার ব্যক্তিগত তথ্যের নিরাপত্তা বা আমাদের নীতিমালা সম্পর্কিত যেকোনো জিজ্ঞাসায় আমাদের লিখুন।'
                  : 'For questions, concerns, or requests regarding your personal information, reach out to our privacy desk.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${email}?subject=Privacy%20Inquiry`}
                className="inline-flex items-center gap-2 bg-white text-black font-black uppercase text-xs px-5 py-3 hover:bg-neutral-200 transition-colors border-2 border-white"
              >
                <Mail className="w-4 h-4" />{' '}
                {isBn ? 'ইমেইল প্রাইভেসি ডেস্ক' : 'Email Privacy Desk'}
              </a>
              <a
                href={`https://wa.me/${whatsappClean || '8801911209322'}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-transparent text-white font-black uppercase text-xs px-5 py-3 hover:bg-white hover:text-black transition-colors border-2 border-white"
              >
                <Phone className="w-4 h-4" />{' '}
                {isBn ? 'হোয়াটসঅ্যাপে যোগাযোগ' : 'WhatsApp Us'}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
