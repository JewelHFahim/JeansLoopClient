'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('Your message has been received! Our support team will get back to you shortly.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="bg-white min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black">Contact Us</span>
        </nav>

        {/* Page Header */}
        <div className="border-b border-black/15 pb-8 mb-12">
          <span className="inline-block bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
            Customer Support & Inquiries
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
            Get In Touch
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 font-medium mt-3 max-w-2xl leading-relaxed">
            Have questions about sizes, your order dispatch, returns, or wholesale collaborations? We&apos;re here to help you 7 days a week.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {/* Card 1: WhatsApp */}
          <a
            href="https://wa.me/8801911209322"
            target="_blank"
            rel="noreferrer"
            className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col justify-between group"
          >
            <div>
              <MessageCircle className="w-8 h-8 text-black group-hover:text-green-600 transition-colors mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">WhatsApp Chat</h3>
              <p className="text-base font-black text-black mt-1">+880 1911-209322</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2 flex items-center justify-between">
              <span>Instant response</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </p>
          </a>

          {/* Card 2: Phone */}
          <a
            href="tel:+8801911209322"
            className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col justify-between group"
          >
            <div>
              <Phone className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Customer Hotline</h3>
              <p className="text-base font-black text-black mt-1">+880 1911-209322</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              Sat – Thu, 10 AM – 8 PM
            </p>
          </a>

          {/* Card 3: Email */}
          <a
            href="mailto:info@jeansloop.com"
            className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col justify-between group"
          >
            <div>
              <Mail className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Email Support</h3>
              <p className="text-base font-black text-black mt-1 break-all">info@jeansloop.com</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2">
              Replies within 12 hours
            </p>
          </a>

          {/* Card 4: Location */}
          <div className="border-2 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <MapPin className="w-8 h-8 text-black mb-3" />
              <h3 className="text-xs font-black uppercase tracking-wider text-black">Hub Address</h3>
              <p className="text-base font-black text-black mt-1">Dhaka, Bangladesh</p>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium mt-3 border-t border-neutral-200 pt-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> 10:00 AM – 08:00 PM
            </p>
          </div>
        </div>

        {/* Contact Form & Side Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 border-2 border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-black mb-2">
              Send Us A Direct Message
            </h2>
            <p className="text-xs text-neutral-500 font-medium mb-6">
              Fill out the form below and our customer support team will get in touch with you right away.
            </p>

            {submitted ? (
              <div className="border-2 border-black bg-neutral-50 p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-black mx-auto" />
                <h3 className="text-lg font-black uppercase tracking-tight text-black">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto">
                  Thank you for reaching out to JeansLoop. A customer service representative will respond to your inquiry shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name">Your Full Name *</Label>
                    <Input
                      id="contact-name"
                      placeholder="e.g. Tanvir Ahmed"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-phone">Phone Number *</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-email">Email Address *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-subject">Inquiry Subject *</Label>
                  <Input
                    id="contact-subject"
                    placeholder="e.g. Size exchange for Order #10492"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-message">Your Message *</Label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Please include relevant order numbers or details so we can best assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full rounded-none border-2 border-black bg-white px-4 py-3 text-xs font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black resize-y"
                  />
                </div>

                <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto gap-2">
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending Message...' : 'Submit Message'}
                </Button>
              </form>
            )}
          </div>

          {/* Quick Help Column */}
          <div className="space-y-6">
            <div className="border-2 border-black p-6 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                Quick Answers
              </span>
              <h3 className="text-xl font-black uppercase italic tracking-tight leading-tight">
                Looking For Quick Information?
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Check our self-service guides for immediate answers to common questions:
              </p>

              <div className="space-y-2 pt-2">
                <Link
                  href="/shipping"
                  className="flex items-center justify-between p-3 border-2 border-white hover:bg-white hover:text-black transition-colors text-xs font-bold uppercase"
                >
                  <span>Shipping Rates & Times</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/returns"
                  className="flex items-center justify-between p-3 border-2 border-white hover:bg-white hover:text-black transition-colors text-xs font-bold uppercase"
                >
                  <span>7-Day Return & Fit Swap</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/account"
                  className="flex items-center justify-between p-3 border-2 border-white hover:bg-white hover:text-black transition-colors text-xs font-bold uppercase"
                >
                  <span>Track Order Status</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/privacy"
                  className="flex items-center justify-between p-3 border-2 border-white hover:bg-white hover:text-black transition-colors text-xs font-bold uppercase"
                >
                  <span>Privacy Policy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="border-2 border-black p-6 bg-neutral-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-black">
                Operational Hours
              </h4>
              <p className="text-xs text-neutral-600 font-medium">
                Our customer care phone & WhatsApp support desk is active every day:
              </p>
              <div className="border-t border-neutral-200 pt-2 text-xs font-black text-black">
                Saturday – Friday: 10:00 AM – 08:00 PM (BST)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
