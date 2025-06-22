// Netlify serverless function - no external dependencies needed
const app = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname.replace('/.netlify/functions/server', '');

  // Mock data
  const platforms = [
    { id: 1, name: "quotex", displayName: "Quotex", successRate: 89.2, isActive: true },
    { id: 2, name: "pocket-option", displayName: "Pocket Option", successRate: 87.1, isActive: true },
    { id: 3, name: "binomo", displayName: "Binomo", successRate: 85.9, isActive: true },
    { id: 4, name: "olymp", displayName: "Olymp Trade", successRate: 88.4, isActive: true },
    { id: 5, name: "iq-option", displayName: "IQ Option", successRate: 90.2, isActive: true },
    { id: 6, name: "expert-option", displayName: "Expert Option", successRate: 86.7, isActive: true }
  ];

  const currencyPairs = ["EUR/USD", "USD/JPY", "GBP/USD", "USD/CHF", "AUD/USD", "USD/CAD", "USD/PKR", "USD/BRL", "USD/INR"];
  
  const generateSignal = () => {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const pair = currencyPairs[Math.floor(Math.random() * currencyPairs.length)];
    const direction = Math.random() > 0.5 ? "CALL" : "PUT";
    const strength = Math.floor(Math.random() * 41) + 60;
    const timeFrame = ["5s", "15s", "30s", "1m", "2m", "5m"][Math.floor(Math.random() * 6)];
    
    return {
      id: Math.floor(Math.random() * 1000),
      pair,
      platform: platform.name,
      direction,
      strength,
      timeFrame,
      timestamp: new Date().toISOString(),
      price: (Math.random() * 2 + 1).toFixed(5)
    };
  };

  // Generate some signals
  const signals = Array.from({ length: 5 }, generateSignal);

  // Route handling
  if (path === '/platforms') {
    res.statusCode = 200;
    res.end(JSON.stringify(platforms));
  } else if (path === '/signals') {
    res.statusCode = 200;
    res.end(JSON.stringify(signals));
  } else if (path === '/stats') {
    const stats = {
      successRate: "89.3%",
      activeSignals: signals.length,
      platforms: platforms.length,
      totalTrades: Math.floor(Math.random() * 1000) + 500
    };
    res.statusCode = 200;
    res.end(JSON.stringify(stats));
  } else if (path === '/auth/free-trial' && req.method === 'POST') {
    const accessKey = Math.random().toString(36).substring(2, 15);
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, accessKey, expiresAt: Date.now() + 20 * 60 * 1000 }));
  } else if (path === '/auth/validate' && req.method === 'POST') {
    res.statusCode = 401;
    res.end(JSON.stringify({ success: false, message: "Invalid or expired access key" }));
  } else if (path === '/auth/verify' && req.method === 'POST') {
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  }
};

exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    const req = {
      method: event.httpMethod,
      url: event.path + (event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters).toString() : ''),
      headers: event.headers,
      body: event.body
    };

    const res = {
      statusCode: 200,
      headers: {},
      body: '',
      setHeader: function(name, value) {
        this.headers[name] = value;
      },
      end: function(data) {
        this.body = data;
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: this.body
        });
      }
    };

    app(req, res);
  });
};