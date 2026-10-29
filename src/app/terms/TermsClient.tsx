'use client';

import Link from 'next/link';
import { FileText, CheckCircle2, ShieldCheck, Scale, ArrowRight, Mail } from 'lucide-react';
import { useCustomerCareLang } from '@/hooks/useCustomerCareLang';
import { CustomerCareHeader } from '@/components/customercare/CustomerCareHeader';

interface TermsClientProps {
  siteName: string;
  email: string;
}

export function TermsClient({ siteName, email }: TermsClientProps) {
  const { lang, setLang } = useCustomerCareLang();
  const isBn = lang === 'bn';

  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <CustomerCareHeader
          badge={{
            en: 'Legal Terms & Conditions',
            bn: 'আইনি শর্তাবলী ও নীতিমালা',
          }}
          title={{
            en: 'Terms of Service',
            bn: 'ব্যবহারের শর্তাবলী',
          }}
          description={{
            en: `Please read these Terms of Service carefully before purchasing or using the ${siteName} website and services.`,
            bn: `${siteName} ওয়েবসাইট ব্যবহার অথবা পণ্য ক্রয়ের পূর্বে অনুগ্রহ করে এই ব্যবহারের শর্তাবলী মনোযোগ সহকারে পড়ে নিন।`,
          }}
          lang={lang}
          setLang={setLang}
        />

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <ShieldCheck className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'আসল কোয়ালিটি' : 'Authentic Quality'}
              </h3>
              <p className="text-lg font-black text-black mt-1">
                {isBn ? '১০০% নিশ্চয়তা' : '100% Guaranteed'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'সকল পোশাক উন্নত ডেনিম ও টুইল ফেব্রিকে নিখুঁতভাবে তৈরি।'
                : 'All garments are engineered with high-grade denim and twill.'}
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <FileText className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'স্বচ্ছ মূল্য' : 'Fair Pricing'}
              </h3>
              <p className="text-lg font-black text-black mt-1">
                {isBn ? 'স্পষ্ট ও সৎ' : 'Clear & Honest'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'বাংলাদেশি টাকায় (BDT) নির্দিষ্ট মূল্য, কোনো গোপন ফি নেই।'
                : 'All prices shown in BDT with no surprise hidden fees.'}
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <CheckCircle2 className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'ফিট নিশ্চয়তা' : 'Fit Assurance'}
              </h3>
              <p className="text-lg font-black text-black mt-1">
                {isBn ? '৭ দিনের সোয়াপ' : '7-Day Swap'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'অব্যবহৃত পোশাকে দ্রুত ও সহজ সাইজ পরিবর্তনের সুবিধা।'
                : 'Straightforward size exchanges on unworn garments.'}
            </p>
          </div>

          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <Scale className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                {isBn ? 'প্রযোজ্য আইন' : 'Governing Law'}
              </h3>
              <p className="text-lg font-black text-black mt-1">
                {isBn ? 'বাংলাদেশ' : 'Bangladesh'}
              </p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              {isBn
                ? 'গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত ভোক্তা অধিকার আইন দ্বারা সুরক্ষিত।'
                : 'Protected under the consumer & commerce laws of Bangladesh.'}
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-neutral-700">
          {/* Section 1 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '১. শর্তাবলীর গ্রহণযোগ্যতা' : '1. Acceptance of Terms'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                {isBn
                  ? `আমাদের ওয়েবসাইট পরিদর্শন, অ্যাকাউন্ট খোলা বা ${siteName} থেকে যেকোনো পণ্য ক্রয়ের মাধ্যমে আপনি এই শর্তাবলী দ্বারা আবদ্ধ হতে সম্মত হচ্ছেন। আপনি যদি এই শর্তাবলীতে সম্মত না হন, তবে অনুগ্রহ করে আমাদের পরিষেবা বা অর্ডার প্রদান থেকে বিরত থাকুন।`
                  : `By visiting our website, creating an account, or placing an order with ${siteName}, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services or place orders.`}
              </p>
              <p>
                {isBn
                  ? 'আমরা যেকোনো সময় এই শর্তাবলী পরিমার্জন বা আপডেট করার অধিকার সংরক্ষণ করি। সংশোধিত শর্তাবলী এই পৃষ্ঠায় প্রকাশের সাথে সাথে কার্যকর হবে।'
                  : 'We reserve the right to revise and update these terms from time to time. Any changes will become effective immediately upon posting to this page.'}
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '২. পণ্য, সাইজিং ও ছবির যথার্থতা' : '2. Products, Sizing & Accuracy'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                <strong>{isBn ? 'পোশাকের ছবি ও রঙ:' : 'Garment Imagery:'}</strong>{' '}
                {isBn
                  ? 'আমরা পণ্যের আসল রঙ, ডেনিম ওয়াশ ও টেক্সচার ওয়েবসাইটে যতটা সম্ভব নিখুঁতভাবে দেখানোর সর্বোচ্চ চেষ্টা করি। তবে প্রাকৃতিক ওয়াশ ভ্যারিয়েশন এবং ব্যক্তিগত ডিভাইস মনিটরের কালার ক্যালিব্রেশনের পার্থক্যের কারণে সামান্য তারতম্য দেখা যেতে পারে।'
                  : 'We make every reasonable effort to display product colors, denim washes, whiskers, and textures as accurately as possible. However, due to natural denim wash variations and individual display monitor color calibrations, slight variations may occur.'}
              </p>
              <p>
                <strong>{isBn ? 'সাইজ নির্বাচন:' : 'Sizing:'}</strong>{' '}
                {isBn ? (
                  <>
                    অর্ডারের পূর্বে প্রতিটি পণ্য পৃষ্ঠায় উল্লেখিত বিস্তারিত সাইজ চার্ট দেখে নেওয়ার পরামর্শ দেওয়া হচ্ছে। ডেলিভারির পর সাইজে কোনো সমস্যা হলে আমাদের সহজ{' '}
                    <Link href="/returns" className="font-bold text-black underline underline-offset-2">
                      রিটার্ন ও এক্সচেঞ্জ নীতিমালা
                    </Link>{' '}
                    প্রযোজ্য হবে।
                  </>
                ) : (
                  <>
                    Please consult our detailed size guides on each product page prior to selecting your waist size. If you receive a size that does not fit as expected, our{' '}
                    <Link href="/returns" className="font-bold text-black underline underline-offset-2">
                      Returns & Exchanges Policy
                    </Link>{' '}
                    applies.
                  </>
                )}
              </p>
              <p>
                <strong>{isBn ? 'স্টক প্রাপ্যতা:' : 'Stock Availability:'}</strong>{' '}
                {isBn
                  ? 'সকল অর্ডার পণ্যের স্টক প্রাপ্যতার ওপর নির্ভরশীল। অর্ডার নিশ্চিতের পর কোনো বিরল কারণে আইটেমটি স্টক আউট হলে আমাদের টিম দ্রুত আপনাকে অবহিত করে পুরো টাকা ফেরত দেবে বা বিকল্প ব্যবস্থা করবে।'
                  : 'All orders are subject to product availability. In the rare event that an item becomes unavailable after order placement, our team will promptly notify you and process a full refund or suitable alternative.'}
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '৩. অর্ডার, মূল্য ও পেমেন্ট শর্ত' : '3. Orders, Pricing & Payment'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                <strong>{isBn ? 'মূল্য নির্ধারণ:' : 'Pricing:'}</strong>{' '}
                {isBn
                  ? 'সকল পণ্যের মূল্য বাংলাদেশি টাকায় (BDT) প্রদর্শিত হয়। পূর্ব নোটিশ ছাড়া মূল্য পরিবর্তনের অধিকার আমরা সংরক্ষণ করি, তবে ইতিপূর্বে কনফার্ম হওয়া অর্ডারের মূল্য কখনোই পরিবর্তন হবে না।'
                  : 'All prices are displayed in Bangladeshi Taka (BDT) and are inclusive of applicable taxes unless specified otherwise. We reserve the right to update prices without prior notice, but price changes will not affect orders that have already been confirmed.'}
              </p>
              <p>
                <strong>{isBn ? 'অর্ডার ভেরিফিকেশন ও বাতিলকরণ:' : 'Order Confirmation & Verification:'}</strong>{' '}
                {isBn
                  ? `ফোন কল বা সিস্টেম কনফার্মেশনের পর অর্ডার চূড়ান্ত বলে গণ্য হয়। সন্দেহজনক প্রতারণামূলক কার্যকলাপ, ভুল বা অস্তিত্বহীন যোগাযোগ নম্বর অথবা বারবার ডেলিভারি ব্যর্থতার পূর্ব ইতিহাস থাকলে যেকোনো অর্ডার বাতিল করার পূর্ণ অধিকার ${siteName} সংরক্ষণ করে।`
                  : `An order is deemed accepted once verified by phone or confirmed in our system. ${siteName} reserves the right to decline or cancel any order suspected of fraudulent activity, invalid contact information, or repeated failed delivery history.`}
              </p>
              <p>
                <strong>{isBn ? 'পেমেন্ট মাধ্যমসমূহ:' : 'Payment Methods:'}</strong>{' '}
                {isBn
                  ? 'আমরা ক্যাশ অন ডেলিভারি (COD), মোবাইল ব্যাংকিং (বিকাশ, নগদ) এবং ভিসা/মাস্টারকার্ড ডেবিট ও ক্রেডিট কার্ডের মাধ্যমে পেমেন্ট গ্রহণ করি।'
                  : 'We accept Cash on Delivery (COD), Mobile Financial Services (bKash, Nagad), and debit/credit cards through certified payment gateways.'}
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '৪. ডেলিভারি ও অর্ডার বাতিল' : '4. Shipping, Delivery & Cancellations'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                {isBn ? (
                  <>
                    ডেলিভারির আনুমানিক সময়সূচী আমাদের{' '}
                    <Link href="/shipping" className="font-bold text-black underline underline-offset-2">
                      শিপিং ও ডেলিভারি নীতিমালায়
                    </Link>{' '}
                    বিস্তারিত রয়েছে। পার্সেল কুরিয়ারে হস্তান্তরের পূর্ব পর্যন্ত কাস্টমার সাপোর্টে ফোন করে যেকেউ অর্ডার বাতিল করতে পারেন। তবে কুরিয়ারে হস্তান্তরের পর সরাসরি বাতিল সম্ভব নয়; সে ক্ষেত্রে ডেলিভারি প্রাপ্তির পর এক্সচেঞ্জ বা রিটার্ন প্রক্রিয়া অনুসরণ করতে হবে।
                  </>
                ) : (
                  <>
                    Delivery timelines are outlined in our{' '}
                    <Link href="/shipping" className="font-bold text-black underline underline-offset-2">
                      Shipping & Delivery Policy
                    </Link>. Customers may request cancellation of an order at any point before dispatch by calling our customer hotline. Once a parcel has been handed over to the courier partner, cancellations cannot be accepted until standard return procedures are followed.
                  </>
                )}
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-black inline-block"></span>
              {isBn ? '৫. মেধাস্বত্ব ও কপিরাইট সুরক্ষা' : '5. Intellectual Property'}
            </h2>
            <div className="space-y-4 text-xs md:text-sm leading-relaxed">
              <p>
                {isBn
                  ? `এই ওয়েবসাইটের সকল উপাদান, যার মধ্যে রয়েছে টেক্সট, ফটোগ্রাফি, ডেনিম লুকবুক গ্রাফিক্স, লোগো এবং কোড—${siteName} এর নিজস্ব মেধাস্বত্ব এবং বাংলাদেশের কপিরাইট ও বৌদ্ধিক সম্পত্তি আইন দ্বারা সুরক্ষিত। অনুমতি ছাড়া কোনো কনটেন্টের অনুলিপি বা বাণিজ্যিক ব্যবহার কঠোরভাবে নিষিদ্ধ।`
                  : `All content on this website, including but not limited to text, photographs, denim lookbook graphics, logos, icons, and software code, is the property of ${siteName} and protected by copyright and intellectual property laws of Bangladesh. Unauthorized reproduction or commercial use is strictly prohibited.`}
              </p>
            </div>
          </section>

          {/* Contact Box */}
          <section className="border-2 border-black p-6 md:p-8 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                {isBn ? 'আইনি পরামর্শ ডেস্ক' : 'Legal Desk'}
              </span>
              <h3 className="text-2xl font-black uppercase italic tracking-tight leading-none text-white">
                {isBn ? 'শর্তাবলী সংক্রান্ত জিজ্ঞাসা?' : 'Questions About Our Terms?'}
              </h3>
              <p className="text-xs text-neutral-300 mt-2 max-w-md">
                {isBn
                  ? 'আমাদের শর্তাবলী বা নীতিমালা সম্পর্কিত যেকোনো প্রশ্ন ও সহায়তার জন্য আমাদের লিগ্যাল ডেস্কে যোগাযোগ করুন।'
                  : 'Our team is happy to answer any questions or clarify our store policies.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 bg-white text-black font-black uppercase text-xs px-5 py-3 hover:bg-neutral-200 transition-colors border-2 border-white"
              >
                <Mail className="w-4 h-4" />{' '}
                {isBn ? 'ইমেইল লিগ্যাল ডেস্ক' : 'Email Legal Desk'}
              </a>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 bg-transparent text-white font-black uppercase text-xs px-5 py-3 hover:bg-white hover:text-black transition-colors border-2 border-white"
              >
                {isBn ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}{' '}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
