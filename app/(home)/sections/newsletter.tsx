"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-24 bg-amber-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-amber-600 font-semibold mb-4">
          Stay in the loop
        </p>
        <h2
          className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Get 15% off your first order
        </h2>
        <p className="text-stone-500 text-lg mb-10 max-w-lg mx-auto">
          Subscribe to our newsletter for exclusive offers, new arrivals, and
          style inspiration.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-emerald-700 font-semibold text-lg">
            <CheckCircle size={24} className="text-emerald-500" />
            Welcome! Check your inbox for your discount code.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-4 rounded-full border border-stone-200 bg-white text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-7 py-4 rounded-full text-sm font-semibold hover:bg-stone-700 transition-all duration-300 whitespace-nowrap"
            >
              Subscribe
              <ArrowRight size={15} />
            </button>
          </form>
        )}

        <p className="text-stone-400 text-xs mt-5">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
