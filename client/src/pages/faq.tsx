import Header from "@/components/header";
import Footer from "@/components/footer";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

const faqs = [
  {
    question: "What are binary options trading signals?",
    answer: "Trading signals are indicators that suggest when to buy or sell a particular asset. Our signals provide CALL/PUT recommendations with strength percentages and time frames to help guide your trading decisions."
  },
  {
    question: "How accurate are your signals?",
    answer: "Our signals have shown success rates of 85-92% across different platforms. However, trading involves risk and past performance doesn't guarantee future results. Only use money you can afford to lose."
  },
  {
    question: "Which platforms do you support?",
    answer: "We provide signals for Quotex, Pocket Option, Binomo, Olymp Trade, IQ Option, and Expert Option. Each platform has dedicated pages with filtered signals."
  },
  {
    question: "How do I use the signals?",
    answer: "Simply copy the signal information (pair, direction, time frame) and place your trade on your chosen platform. Our signals include entry prices and confidence levels to help you make informed decisions."
  },
  {
    question: "Are the signals real-time?",
    answer: "Yes, our signals are generated in real-time and updated every few seconds. You'll see live notifications and fresh signals appearing throughout your trading session."
  },
  {
    question: "Can I lose money trading?",
    answer: "Yes, trading binary options involves significant risk. You can lose your entire investment. Never trade with money you cannot afford to lose. Our signals are for educational purposes and should not be considered financial advice."
  },
  {
    question: "How do I get started?",
    answer: "Choose your preferred platform from our supported list, create an account with them, fund your account with money you can afford to lose, and start following our signals with small amounts initially."
  },
  {
    question: "Do you provide trading advice?",
    answer: "We provide signals and educational content only. This is not financial advice. You should conduct your own research and consider your financial situation before trading."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-dark-primary">
      <Header />
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-300">
              Find answers to common questions about our trading signals service
            </p>
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 font-semibold">
                ⚠️ Risk Warning: Trading involves significant risk. Only use money you can afford to lose.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-dark-secondary rounded-lg border border-gray-700">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-dark-tertiary transition-colors"
                >
                  <h3 className="font-semibold text-lg text-white">{faq.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Still have questions?</h3>
              <p className="text-gray-300 mb-4">
                Contact our support team for personalized assistance
              </p>
              <a 
                href="/contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}