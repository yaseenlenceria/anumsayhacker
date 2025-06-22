import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-dark-primary">
      <Header />
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-300">
              Your privacy is important to us. This policy explains how we collect and use your information.
            </p>
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 font-semibold">
                ⚠️ Risk Warning: Trading involves significant risk. Only use money you can afford to lose.
              </p>
            </div>
          </div>

          <div className="bg-dark-secondary rounded-xl p-8 border border-gray-700 space-y-8">
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Create an account or subscribe to our service</li>
                <li>Contact us for customer support</li>
                <li>Use our trading signals platform</li>
                <li>Subscribe to our newsletters or communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Types of Data Collected</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Personal Information:</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Name and email address</li>
                    <li>Payment information (processed securely by third-party providers)</li>
                    <li>Contact preferences and communication history</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Usage Information:</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Platform usage patterns and preferences</li>
                    <li>Signal interaction and success tracking</li>
                    <li>Device information and IP addresses</li>
                    <li>Browser type and operating system</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Provide and improve our trading signals service</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send important service updates and notifications</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share information only in these situations:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>With payment processors to handle subscription payments</li>
                <li>With service providers who assist in platform operations</li>
                <li>When required by law or to protect our legal rights</li>
                <li>In case of a business merger or acquisition (with prior notice)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure server infrastructure with regular monitoring</li>
                  <li>Access controls limiting employee data access</li>
                  <li>Regular security audits and updates</li>
                  <li>Encrypted data storage and backup systems</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Remember your login status and preferences</li>
                <li>Analyze platform usage and performance</li>
                <li>Improve user experience and functionality</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                You can control cookie settings through your browser preferences.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Privacy Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate data</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability in standard formats</li>
                <li>Object to certain data processing activities</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
              <p className="text-gray-300 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. 
                Account data is typically retained for the duration of your subscription plus up to 2 years for record-keeping purposes. 
                You may request earlier deletion of your data by contacting our support team.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be processed and stored in countries other than your own. We ensure appropriate safeguards 
                are in place to protect your data according to this privacy policy and applicable laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our service is not intended for individuals under 18 years of age. We do not knowingly collect personal information 
                from children. If you believe a child has provided us with personal information, please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">11. Policy Updates</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this privacy policy periodically to reflect changes in our practices or legal requirements. 
                We will notify users of significant changes via email or platform notifications.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="mt-4 bg-dark-primary p-4 rounded-lg">
                <p className="text-gray-300">
                  Email: privacy@anumsayhackerbot.com<br />
                  Support: <a href="/contact" className="text-blue-400 hover:text-blue-300">Contact Form</a><br />
                  Address: Our data protection officer can be reached through our support channels
                </p>
              </div>
            </div>

            <div className="border-t border-gray-600 pt-6">
              <p className="text-gray-400 text-sm text-center">
                Last updated: December 2024<br />
                This policy is effective immediately and applies to all users of our service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}