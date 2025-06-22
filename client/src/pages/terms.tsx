import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Terms() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-dark-primary">
      <Header />
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-300">
              Please read these terms carefully before using our service
            </p>
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 font-semibold">
                ⚠️ Risk Warning: Trading involves significant risk. Only use money you can afford to lose.
              </p>
            </div>
          </div>

          <div className="bg-dark-secondary rounded-xl p-8 border border-gray-700 space-y-8">
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using AnumSayHackerBOT trading signals service, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                AnumSayHackerBOT provides trading signals for binary options platforms including Quotex, Pocket Option, Binomo, 
                Olymp Trade, IQ Option, and Expert Option. Our service includes:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Real-time trading signals with CALL/PUT directions</li>
                <li>Signal strength indicators and confidence levels</li>
                <li>Platform-specific signal filtering</li>
                <li>Educational content and support materials</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Risk Disclaimer</h2>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                <p className="text-red-300 font-semibold mb-4">
                  IMPORTANT RISK WARNING: Trading binary options involves substantial risk and may result in the loss of your entire investment.
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>You should never invest money that you cannot afford to lose</li>
                  <li>Past performance does not guarantee future results</li>
                  <li>Our signals are for educational purposes only and not financial advice</li>
                  <li>You are solely responsible for your trading decisions</li>
                  <li>Success rates mentioned are historical and may not reflect future performance</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. User Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>You must be at least 18 years old to use this service</li>
                <li>You are responsible for complying with local laws and regulations</li>
                <li>You must not share your account credentials with others</li>
                <li>You agree to use the service only for lawful purposes</li>
                <li>You understand that trading involves personal financial risk</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Payment Terms</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Subscription fees are charged monthly in advance. Available plans:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Starter Plan: ₨5,000 per month</li>
                <li>Pro Trader Plan: ₨10,000 per month</li>
                <li>VIP Elite Plan: ₨15,000 per month</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Payments are non-refundable except where required by law. You may cancel your subscription at any time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                AnumSayHackerBOT shall not be liable for any direct, indirect, incidental, special, or consequential damages 
                resulting from the use or inability to use our service, including but not limited to trading losses, 
                lost profits, or business interruption.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Service Availability</h2>
              <p className="text-gray-300 leading-relaxed">
                While we strive to provide continuous service, we do not guarantee uninterrupted access. 
                We reserve the right to modify, suspend, or discontinue the service at any time without notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed">
                All content, signals, algorithms, and materials provided through our service are proprietary to AnumSayHackerBOT 
                and are protected by intellectual property laws. Users may not reproduce, distribute, or create derivative works 
                without explicit written permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. Modifications to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. Users will be notified of significant changes. 
                Continued use of the service after modifications constitutes acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                For questions about these terms, please contact us through our support channels or email support@anumsayhackerbot.com
              </p>
            </div>

            <div className="border-t border-gray-600 pt-6">
              <p className="text-gray-400 text-sm text-center">
                Last updated: December 2024<br />
                By using our service, you acknowledge that you have read, understood, and agree to these terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}