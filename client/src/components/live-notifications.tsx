import { useState, useEffect } from "react";
import { CheckCircle, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface WinNotification {
  id: number;
  user: string;
  amount: string;
  pair: string;
  platform: string;
  timestamp: Date;
}

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<WinNotification[]>([]);

  const users = [
    "Fatima K.", "Ahmed M.", "Ayesha S.", "Hassan R.", "Zainab A.", "Ali H.", 
    "Sana B.", "Usman K.", "Hira F.", "Bilal S.", "Aisha M.", "Hamza T.",
    "Noor J.", "Asad R.", "Farah L.", "Imran A.", "Mariam S.", "Faisal K."
  ];

  const platforms = ["Quotex", "Pocket Option", "Binomo", "IQ Option", "Expert Option"];
  const pairs = ["USD/BRL", "EUR/USD", "USD/JPY", "GBP/USD", "USD/CAD"];
  const amounts = ["₨25,000", "₨18,500", "₨35,000", "₨12,000", "₨45,000", "₨28,000", "₨38,500", "₨22,000", "₨50,000", "₨31,000"];

  useEffect(() => {
    const generateNotification = () => {
      // Randomize all elements
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      
      const newNotification: WinNotification = {
        id: Date.now() + Math.random(), // More unique IDs
        user: randomUser,
        amount: randomAmount,
        pair: randomPair,
        platform: randomPlatform,
        timestamp: new Date()
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    };

    // Generate initial notification after random delay
    const initialDelay = Math.random() * 3000 + 2000; // 2-5 seconds
    setTimeout(() => generateNotification(), initialDelay);

    // Generate new notification every 6-12 seconds with random intervals
    const interval = setInterval(() => {
      generateNotification();
    }, Math.random() * 6000 + 6000); // 6-12 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-1 max-w-xs">
      {notifications.slice(0, 2).map((notification, index) => (
        <div
          key={notification.id}
          className={`bg-green-600/90 backdrop-blur-sm text-white p-2 rounded-md shadow-lg border border-green-500/50 transform transition-all duration-300 ${
            index === 0 ? 'animate-slide-in-right' : ''
          }`}
          style={{ opacity: 1 - (index * 0.3) }}
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-3 w-3 text-green-200 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-xs truncate">{notification.user}</span>
                <span className="font-bold text-xs text-green-200">{notification.amount}</span>
              </div>
              <div className="text-xs text-green-100 opacity-80 truncate">
                {notification.pair}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}