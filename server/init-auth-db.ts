import { db } from "./db";
import { authStorage } from "./auth-storage";

async function initializeAuthDatabase() {
  try {
    console.log("Initializing authentication system...");
    
    // Check if we already have some access keys
    const existingKeys = await authStorage.getAllAccessKeys();
    
    if (existingKeys.length === 0) {
      // Generate a default admin key for initial setup
      const adminKey = await authStorage.generateAccessKey(
        "Admin Demo Key - Replace with real keys",
        // Set expiry to 7 days from now
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      );
      
      console.log("=".repeat(60));
      console.log("🔑 DEMO ACCESS KEY GENERATED:");
      console.log("Key:", adminKey.key);
      console.log("Description:", adminKey.description);
      console.log("Expires:", adminKey.expiresAt?.toLocaleDateString());
      console.log("=".repeat(60));
      console.log("🔒 Save this key - you'll need it to access the platform!");
      console.log("=".repeat(60));
    }
    
    console.log("Authentication system initialized successfully");
  } catch (error) {
    console.error("Failed to initialize authentication system:", error);
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeAuthDatabase();
}

export { initializeAuthDatabase };