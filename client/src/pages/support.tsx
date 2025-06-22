import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, Video, Users, TrendingUp, AlertTriangle } from "lucide-react";

export default function Support() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-dark-primary">
      <Header />
      
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Support & Learning Center</h1>
            <p className="text-xl text-gray-300 mb-6">
              Master binary options trading with AnumSayHackerBOT - The best signals provider
            </p>
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg max-w-2xl mx-auto">
              <p className="text-red-300 font-semibold">
                ⚠️ Risk Warning: Only use money you can afford to lose. Trading involves significant risk.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Getting Started */}
            <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Getting Started Guide</h3>
              <p className="text-gray-300 mb-4">
                Learn how to use our signals effectively and start your trading journey safely
              </p>
              <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                Read Guide
              </Button>
            </div>

            {/* Video Tutorials */}
            <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Video Tutorials</h3>
              <p className="text-gray-300 mb-4">
                Watch step-by-step videos on how to copy and use our trading signals
              </p>
              <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white">
                Watch Videos
              </Button>
            </div>

            {/* Live Chat */}
            <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Live Support</h3>
              <p className="text-gray-300 mb-4">
                Get instant help from our expert team anytime you need assistance
              </p>
              <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                Start Chat
              </Button>
            </div>
          </div>

          {/* Why We Are The Best */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-blue-500/30 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Why AnumSayHackerBOT is the Best Choice</h2>
              <p className="text-xl text-gray-300">
                Leading the industry with proven results and exceptional service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">92% Success Rate</h3>
                <p className="text-gray-300 text-sm">Consistently high winning percentage across all platforms</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Real-Time Signals</h3>
                <p className="text-gray-300 text-sm">Live updates every few seconds with instant notifications</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Expert Team</h3>
                <p className="text-gray-300 text-sm">Professional traders with years of market experience</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Complete Support</h3>
                <p className="text-gray-300 text-sm">Guides, tutorials, and 24/7 assistance for your success</p>
              </div>
            </div>
          </div>

          {/* Trading Journey Steps */}
          <div className="bg-dark-secondary rounded-xl p-8 border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Your Trading Journey with Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-bold text-lg mb-2">Choose Your Platform</h3>
                <p className="text-gray-300 text-sm">Select from Quotex, Pocket Option, Binomo, IQ Option, Expert Option, or Olymp Trade</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-bold text-lg mb-2">Follow Our Signals</h3>
                <p className="text-gray-300 text-sm">Copy our real-time CALL/PUT signals with confidence levels and time frames</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-bold text-lg mb-2">Trade Responsibly</h3>
                <p className="text-gray-300 text-sm">Start small, use only money you can afford to lose, and grow gradually</p>
              </div>
            </div>
          </div>

          {/* Risk Warning */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-300 mb-2">Important Risk Disclaimer</h3>
            <p className="text-gray-300 mb-4">
              Binary options trading carries significant financial risk. While we provide high-quality signals with proven success rates, 
              trading results can vary and losses are possible. Never invest money you cannot afford to lose.
            </p>
            <p className="text-gray-400 text-sm">
              Our signals are for educational and informational purposes only and should not be considered as financial advice. 
              Please consult with a financial advisor before making any investment decisions.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}