import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Star } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-dark-primary">
      <Header />
      
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🔥 EXPLOSIVE PROFITS AWAIT! 🔥
            </h1>
            <p className="text-2xl text-white font-bold mb-4">
              Join 5000+ Pakistani Traders Making MILLIONS!
            </p>
            <p className="text-xl text-yellow-300 mb-6">
              Don't Miss Out - Limited Time Offer!
            </p>
            <div className="p-6 bg-red-900/30 border border-red-500/50 rounded-lg max-w-2xl mx-auto">
              <p className="text-red-300 font-bold text-lg">
                ⚠️ RISK WARNING: Trading involves risk. Only use money you can afford to lose!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Basic Plan */}
            <div className="bg-dark-secondary rounded-xl border border-gray-700 p-8 relative">
              <div className="text-center mb-6">
                <Star className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">STARTER</h3>
                <p className="text-gray-400">Perfect for Beginners</p>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-blue-400 mb-2">₨5,000</div>
                <div className="text-gray-400">per month</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">Basic Trading Signals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">2 Platforms Access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">85% Success Rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">Email Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">Basic Tutorial Access</span>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-bold">
                START EARNING NOW!
              </Button>
            </div>

            {/* Pro Plan - Most Popular */}
            <div className="bg-gradient-to-b from-yellow-600/20 to-orange-600/20 rounded-xl border-2 border-yellow-500 p-8 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                  🔥 MOST POPULAR 🔥
                </div>
              </div>
              
              <div className="text-center mb-6 mt-4">
                <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">PRO TRADER</h3>
                <p className="text-yellow-300">For Serious Earners</p>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-yellow-400 mb-2">₨10,000</div>
                <div className="text-gray-300">per month</div>
                <div className="text-green-400 font-bold mt-1">SAVE 20%!</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-white font-medium">Premium Trading Signals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-white font-medium">All 6 Platforms Access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-white font-medium">90%+ Success Rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-white font-medium">Priority Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-white font-medium">Advanced Tutorials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-white font-medium">Live Chat Support</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black py-3 text-lg font-bold">
                MAKE MILLIONS NOW! 💰
              </Button>
            </div>

            {/* VIP Plan */}
            <div className="bg-gradient-to-b from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500 p-8 relative">
              <div className="text-center mb-6">
                <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">VIP ELITE</h3>
                <p className="text-purple-300">Maximum Profits</p>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-purple-400 mb-2">₨15,000</div>
                <div className="text-gray-400">per month</div>
                <div className="text-green-400 font-bold mt-1">ULTIMATE PACKAGE!</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">VIP Exclusive Signals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">All Platforms + Future Ones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">92%+ Success Rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">24/7 VIP Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">Personal Trading Coach</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">Private Telegram Group</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">Exclusive Market Analysis</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg font-bold">
                BECOME A MILLIONAIRE! 🚀
              </Button>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mt-16 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-8 border border-green-500/30">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-400">
              🏆 TOP EARNERS THIS MONTH 🏆
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-dark-secondary p-6 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">Fatima K.</div>
                <div className="text-xl text-white mb-1">₨2,847,000</div>
                <div className="text-sm text-gray-400">Lahore, Pakistan</div>
                <div className="text-xs text-green-300 mt-2">VIP Member since Jan 2024</div>
              </div>
              <div className="bg-dark-secondary p-6 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">Ahmed M.</div>
                <div className="text-xl text-white mb-1">₨1,956,000</div>
                <div className="text-sm text-gray-400">Karachi, Pakistan</div>
                <div className="text-xs text-green-300 mt-2">Pro Member since Feb 2024</div>
              </div>
              <div className="bg-dark-secondary p-6 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">Ayesha S.</div>
                <div className="text-xl text-white mb-1">₨1,634,000</div>
                <div className="text-sm text-gray-400">Islamabad, Pakistan</div>
                <div className="text-xs text-green-300 mt-2">VIP Member since Mar 2024</div>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-yellow-300 font-bold text-lg">
                💪 YOU CAN BE NEXT! JOIN THE WINNING TEAM! 💪
              </p>
            </div>
          </div>

          {/* Free Trial */}
          <div className="mt-12 bg-yellow-900/20 border border-yellow-500/50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">🎯 FREE TRIAL AVAILABLE!</h3>
            <p className="text-white text-lg mb-4">
              Get 20 minutes of FREE signals to see the magic yourself!
            </p>
            <p className="text-gray-300 mb-6">
              Limited to one trial per IP address. No credit card required!
            </p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 text-lg font-bold">
              START FREE TRIAL NOW!
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}