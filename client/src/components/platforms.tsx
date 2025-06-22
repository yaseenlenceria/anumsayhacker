import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { BarChart, Wallet, Coins, Mountain, Brain, GraduationCap } from "lucide-react";
import type { Platform } from "@/types/trading";

const platformIcons = {
  'quotex': BarChart,
  'pocket-option': Wallet,
  'binomo': Coins,
  'olymp': Mountain,
  'iq-option': Brain,
  'expert-option': GraduationCap,
};

const platformGradients = {
  'quotex': 'from-blue-500 to-purple-600',
  'pocket-option': 'from-green-500 to-blue-600',
  'binomo': 'from-yellow-500 to-orange-600',
  'olymp': 'from-red-500 to-pink-600',
  'iq-option': 'from-purple-500 to-indigo-600',
  'expert-option': 'from-teal-500 to-cyan-600',
};

export default function Platforms() {
  const { data: platforms } = useQuery<Platform[]>({
    queryKey: ['/api/platforms'],
  });

  return (
    <section id="platforms" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Supported Platforms</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms?.map((platform) => {
            const Icon = platformIcons[platform.name as keyof typeof platformIcons];
            const gradient = platformGradients[platform.name as keyof typeof platformGradients];
            
            return (
              <Link key={platform.id} href={`/platform/${platform.name}`}>
                <div className="bg-dark-secondary p-4 rounded-xl border border-gray-700 hover:border-blue-500 cursor-pointer transition-all group">
                  <div className="text-center">
                    <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {Icon && <Icon className="text-white h-6 w-6" />}
                    </div>
                    <h3 className="font-semibold text-white">{platform.displayName}</h3>
                    <p className="text-xs text-gray-400 mt-1">Click to Trade</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
