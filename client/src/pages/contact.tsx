import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Clock, Shield } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-dark-primary">
      <Header />
      
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-300">
              Get in touch with our expert support team
            </p>
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg max-w-2xl mx-auto">
              <p className="text-red-300 font-semibold">
                ⚠️ Risk Warning: Trading binary options involves significant risk. Only use money you can afford to lose.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-dark-secondary p-8 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-dark-primary border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 bg-dark-primary border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Platform</label>
                  <select className="w-full p-3 bg-dark-primary border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white">
                    <option value="">Select your platform</option>
                    <option value="quotex">Quotex</option>
                    <option value="pocket-option">Pocket Option</option>
                    <option value="binomo">Binomo</option>
                    <option value="olymp">Olymp Trade</option>
                    <option value="iq-option">IQ Option</option>
                    <option value="expert-option">Expert Option</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select className="w-full p-3 bg-dark-primary border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white">
                    <option value="">Select a topic</option>
                    <option value="signals">Signal Quality</option>
                    <option value="technical">Technical Support</option>
                    <option value="account">Account Issues</option>
                    <option value="billing">Billing Questions</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full p-3 bg-dark-primary border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                    placeholder="Describe your question or issue..."
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-dark-secondary p-8 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold mb-6">Why choose AnumSayHackerBOT?</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-400">Proven Success Rate</h3>
                      <p className="text-gray-300 text-sm">85-92% accuracy across all supported platforms</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-400">Real-Time Signals</h3>
                      <p className="text-gray-300 text-sm">Live updates every few seconds with instant notifications</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="h-6 w-6 text-purple-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-purple-400">Expert Support</h3>
                      <p className="text-gray-300 text-sm">Professional guidance for your trading journey</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-dark-secondary p-8 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Contact Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-gray-400 text-sm">support@anumsayhackerbot.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-gray-400 text-sm">Available 24/7 for instant help</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-gray-400 text-sm">Within 2-4 hours during business days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-yellow-300 mb-2">Important Reminder</h3>
                <p className="text-gray-300 text-sm">
                  We are here to provide the best trading signals and support, but remember: 
                  trading involves risk and you should never invest more than you can afford to lose. 
                  Our signals are for educational purposes and should not be considered financial advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}