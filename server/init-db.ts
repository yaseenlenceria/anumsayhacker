import { db } from "./db";
import { platforms } from "@shared/schema";

async function initializeDatabase() {
  try {
    // Check if platforms already exist
    const existingPlatforms = await db.select().from(platforms);
    
    if (existingPlatforms.length === 0) {
      console.log('Initializing database with platform data...');
      
      const platformData = [
        { name: 'quotex', displayName: 'Quotex', successRate: '89.3', isActive: true },
        { name: 'pocket-option', displayName: 'Pocket Option', successRate: '90.1', isActive: true },
        { name: 'binomo', displayName: 'Binomo', successRate: '85.4', isActive: true },
        { name: 'olymp', displayName: 'Olymp', successRate: '87.8', isActive: true },
        { name: 'iq-option', displayName: 'IQ Option', successRate: '91.7', isActive: true },
        { name: 'expert-option', displayName: 'Expert Option', successRate: '88.6', isActive: true },
      ];

      await db.insert(platforms).values(platformData);
      console.log('Database initialized successfully with platforms');
    } else {
      console.log('Database already initialized with platforms');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

export { initializeDatabase };