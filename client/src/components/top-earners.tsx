import { TrendingUp, Crown, Star } from "lucide-react";

const topEarners = [
  { name: "Fatima K.", city: "Lahore", earnings: "₨2,847,000", rank: 1, plan: "VIP" },
  { name: "Ahmed M.", city: "Karachi", earnings: "₨1,956,000", rank: 2, plan: "Pro" },
  { name: "Ayesha S.", city: "Islamabad", earnings: "₨1,634,000", rank: 3, plan: "VIP" },
  { name: "Hassan R.", city: "Faisalabad", earnings: "₨1,423,000", rank: 4, plan: "Pro" },
  { name: "Zainab A.", city: "Rawalpindi", earnings: "₨1,287,000", rank: 5, plan: "VIP" }
];

export default function TopEarners() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-green-900/20 to-blue-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🏆 TOP EARNERS THIS MONTH 🏆
          </h2>
          <p className="text-2xl text-white font-bold mb-2">
            PAKISTANI TRADERS MAKING MILLIONS WITH OUR SIGNALS!
          </p>
          <p className="text-xl text-green-400 font-semibold">
            💰 YOU CAN BE NEXT! JOIN THE WINNING TEAM! 💰
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {topEarners.slice(0, 3).map((earner, index) => (
            <div 
              key={earner.rank}
              className={`relative p-6 rounded-xl border-2 transform transition-all hover:scale-105 ${
                index === 0 
                  ? 'bg-gradient-to-b from-yellow-600/20 to-orange-600/20 border-yellow-500' 
                  : index === 1
                  ? 'bg-gradient-to-b from-gray-600/20 to-gray-500/20 border-gray-400'
                  : 'bg-gradient-to-b from-orange-600/20 to-red-600/20 border-orange-500'
              }`}
            >
              {index === 0 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center">
                    <Crown className="h-4 w-4 mr-1" />
                    #1 CHAMPION
                  </div>
                </div>
              )}
              
              <div className="text-center mt-2">
                <div className="flex justify-center mb-4">
                  {index === 0 ? (
                    <Crown className="h-12 w-12 text-yellow-400" />
                  ) : (
                    <TrendingUp className="h-12 w-12 text-green-400" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{earner.name}</h3>
                <p className="text-gray-300 mb-1">{earner.city}, Pakistan</p>
                
                <div className="text-3xl font-bold text-green-400 mb-2">{earner.earnings}</div>
                <div className="text-sm text-gray-400 mb-3">This Month's Profit</div>
                
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  earner.plan === 'VIP' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-blue-600 text-white'
                }`}>
                  {earner.plan} Member
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Earners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {topEarners.slice(3).map((earner) => (
            <div 
              key={earner.rank}
              className="bg-dark-secondary p-4 rounded-lg border border-gray-700 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {earner.rank}
                </div>
                <div>
                  <h4 className="font-bold text-white">{earner.name}</h4>
                  <p className="text-sm text-gray-400">{earner.city}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-400">{earner.earnings}</div>
                <div className="text-xs text-gray-400">{earner.plan} Plan</div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggressive CTA */}
        <div className="text-center bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-8 border border-red-500/50">
          <h3 className="text-3xl font-bold text-white mb-4">
            🔥 DON'T MISS OUT! 🔥
          </h3>
          <p className="text-xl text-yellow-300 mb-6">
            These Pakistani traders are making MILLIONS every month!<br />
            <span className="text-2xl font-bold text-green-400">YOUR TURN IS NOW!</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/pricing" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105">
              💰 START EARNING TODAY! 💰
            </a>
            <a href="/contact" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105">
              📞 CONTACT US NOW!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}