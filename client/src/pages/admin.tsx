import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Plus, Key, Trash2, Copy, Eye, EyeOff } from "lucide-react";
import type { AccessKey } from "@shared/auth-schema";

export default function Admin() {
  const [accessKeys, setAccessKeys] = useState<AccessKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [showKeys, setShowKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    fetchAccessKeys();
  }, []);

  const fetchAccessKeys = async () => {
    try {
      const response = await fetch('/api/admin/keys');
      if (response.ok) {
        const keys = await response.json();
        setAccessKeys(keys);
      }
    } catch (error) {
      console.error('Failed to fetch keys:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateKey = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/admin/keys/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description || undefined,
          expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
        }),
      });

      if (response.ok) {
        await fetchAccessKeys();
        setDescription("");
        setExpiresAt("");
      }
    } catch (error) {
      console.error('Failed to generate key:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const deactivateKey = async (key: string) => {
    try {
      const response = await fetch('/api/admin/keys/deactivate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });

      if (response.ok) {
        await fetchAccessKeys();
      }
    } catch (error) {
      console.error('Failed to deactivate key:', error);
    }
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const toggleShowKey = (keyId: string) => {
    const newShowKeys = new Set(showKeys);
    if (newShowKeys.has(keyId)) {
      newShowKeys.delete(keyId);
    } else {
      newShowKeys.add(keyId);
    }
    setShowKeys(newShowKeys);
  };

  const formatKey = (key: string, keyId: string) => {
    if (showKeys.has(keyId)) {
      return key;
    }
    return key.substring(0, 8) + '••••••••••••••••••••••••••••••••••••••••••••••••••••••••';
  };

  return (
    <div className="min-h-screen bg-dark-primary">
      <Header />
      
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">🔐 Secret Admin Panel</h1>
            <p className="text-xl text-gray-300">
              Manage access keys for premium users
            </p>
            <p className="text-sm text-yellow-400 mt-2">
              ⚠️ This is a hidden admin interface - keep the URL secret!
            </p>
          </div>

          {/* Generate New Key */}
          <div className="bg-dark-secondary rounded-xl p-8 border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Plus className="mr-2 h-6 w-6 text-green-400" />
              Generate New Access Key
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., John Doe - Premium Plan"
                  className="bg-dark-primary border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expires At (Optional)
                </label>
                <Input
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="bg-dark-primary border-gray-600 text-white"
                />
              </div>
            </div>

            <Button
              onClick={generateKey}
              disabled={isGenerating}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Key className="mr-2 h-4 w-4" />
                  Generate Access Key
                </>
              )}
            </Button>
          </div>

          {/* Access Keys List */}
          <div className="bg-dark-secondary rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Key className="mr-2 h-6 w-6 text-blue-400" />
              Access Keys ({accessKeys.length})
            </h2>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading access keys...</p>
              </div>
            ) : accessKeys.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No access keys generated yet.</p>
            ) : (
              <div className="space-y-4">
                {accessKeys.map((accessKey) => (
                  <div
                    key={accessKey.id}
                    className={`p-4 rounded-lg border ${
                      accessKey.isActive
                        ? 'border-green-500/30 bg-green-900/10'
                        : 'border-red-500/30 bg-red-900/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span
                            className={`inline-block w-3 h-3 rounded-full ${
                              accessKey.isActive ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          ></span>
                          <span className="text-white font-medium">
                            {accessKey.description || 'No description'}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              accessKey.isActive
                                ? 'bg-green-600 text-white'
                                : 'bg-red-600 text-white'
                            }`}
                          >
                            {accessKey.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <div className="font-mono text-sm bg-dark-primary p-3 rounded border border-gray-600 mb-2">
                          <span className="text-gray-300">{formatKey(accessKey.key, accessKey.id)}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
                          <div>
                            <span className="block font-medium">Created:</span>
                            {new Date(accessKey.createdAt).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="block font-medium">Expires:</span>
                            {accessKey.expiresAt
                              ? new Date(accessKey.expiresAt).toLocaleDateString()
                              : 'Never'}
                          </div>
                          <div>
                            <span className="block font-medium">Last Used:</span>
                            {accessKey.usedAt
                              ? new Date(accessKey.usedAt).toLocaleDateString()
                              : 'Never'}
                          </div>
                          <div>
                            <span className="block font-medium">IP:</span>
                            {accessKey.ipAddress || 'Not used'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleShowKey(accessKey.id)}
                          className="border-gray-600"
                        >
                          {showKeys.has(accessKey.id) ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyKey(accessKey.key)}
                          className="border-gray-600"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        {accessKey.isActive && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deactivateKey(accessKey.key)}
                            className="border-red-600 text-red-400 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}