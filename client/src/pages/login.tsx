import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Shield, Key, AlertTriangle } from "lucide-react";

export default function Login() {
  const [accessKey, setAccessKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessKey }),
      });

      if (response.ok) {
        // Store the key in localStorage for session management
        localStorage.setItem('accessKey', accessKey);
        // Redirect to main app
        window.location.href = '/';
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid access key');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">anumsayhackerBOT</h1>
          <p className="text-gray-400">Premium Trading Signals Platform</p>
        </div>

        {/* Access Notice */}
        <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Lock className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-yellow-300 font-semibold mb-1">Premium Access Required</h3>
              <p className="text-yellow-200 text-sm">
                This platform is exclusively for paid subscribers. Enter your access key to continue.
              </p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-dark-secondary rounded-xl border border-gray-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="accessKey" className="block text-sm font-medium text-gray-300 mb-2">
                Access Key
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="accessKey"
                  type="text"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="Enter your access key"
                  className="pl-10 bg-dark-primary border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !accessKey.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Validating...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Access Platform
                </>
              )}
            </Button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-gray-600">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                Don't have an access key?
              </p>
              <div className="space-y-2">
                <p className="text-blue-400 font-semibold">Contact us to purchase:</p>
                <div className="space-y-1 text-sm text-gray-300">
                  <p>📧 Email: sales@anumsayhackerbot.com</p>
                  <p>📞 WhatsApp: +92-XXX-XXXXXXX</p>
                  <p>💬 Telegram: @anumsayhackerbot</p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Warning */}
          <div className="mt-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
            <p className="text-red-300 text-xs text-center">
              ⚠️ Risk Warning: Trading involves significant risk. Only use money you can afford to lose.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2024 anumsayhackerBOT. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}