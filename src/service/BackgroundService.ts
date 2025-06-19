import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import EventSource from 'react-native-sse';

const BACKGROUND_FETCH_TASK = 'background-sse-check';

interface BackgroundSSEData {
  products: Record<string, number>;
  totalCount: number;
}

// Define the background task
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    console.log('Background task running...');
    
    // This task will be executed when the app is backgrounded
    // In a real implementation, you might want to:
    // 1. Check for missed SSE events
    // 2. Send periodic notifications
    // 3. Update app badge counts
    
    const now = Date.now();
    console.log(`Background fetch executed at ${new Date(now).toISOString()}`);
    
    // Return success status
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Background task error:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export class BackgroundService {
  private static eventSource: EventSource | null = null;
  private static products: Record<string, number> = {};
  private static totalCount: number = 0;

  static async registerBackgroundFetch() {
    try {
      await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 15 * 60, // 15 minutes minimum interval
        stopOnTerminate: false,
        startOnBoot: true,
      });
      console.log('Background fetch registered successfully');
    } catch (error) {
      console.error('Failed to register background fetch:', error);
    }
  }

  static async unregisterBackgroundFetch() {
    try {
      await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
      console.log('Background fetch unregistered');
    } catch (error) {
      console.error('Failed to unregister background fetch:', error);
    }
  }

  static async setupBackgroundSSE() {
    try {
      // This ensures SSE connection is maintained even when app is backgrounded
      if (this.eventSource) {
        this.eventSource.close();
      }

      this.eventSource = new EventSource('https://storeyes.io/api/sse?clientId=123');
      
      this.eventSource.addEventListener("message", async (event) => {
        const { productCode } = JSON.parse(event.data!);
        console.log('Background SSE message:', productCode);

        // Update counts
        if (this.products[productCode]) {
          this.products[productCode] += 1;
        } else {
          this.products[productCode] = 1;
        }
        this.totalCount += 1;

        // Send background notification
        await this.sendBackgroundNotification(productCode, this.products[productCode]);
      });

      this.eventSource.addEventListener("error", (event) => {
        console.error('Background SSE error:', event);
      });

      console.log('Background SSE connection established');
    } catch (error) {
      console.error('Failed to setup background SSE:', error);
    }
  }

  private static async sendBackgroundNotification(productCode: string, count: number) {
    try {
      const productNames: Record<string, string> = {
        'coffee': 'Coffee',
        'coffee-latte': 'Coffee Latte', 
        'tea': 'Tea',
        'orange-juice': 'Orange Juice',
        'salad': 'Salad',
        'pizza': 'Pizza',
        'pasta': 'Pasta'
      };

      const productName = productNames[productCode] || productCode;
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🍽️ StoreEyes Alert',
          body: `${productName} detected in background (Total: ${count})`,
          sound: 'default',
          data: { 
            productCode, 
            count,
            timestamp: new Date().toISOString(),
            source: 'background'
          },
          badge: this.totalCount,
        },
        trigger: null,
      });
      
      console.log(`Background notification sent for ${productName}`);
    } catch (error) {
      console.error('Error sending background notification:', error);
    }
  }

  static getBackgroundData(): BackgroundSSEData {
    return {
      products: { ...this.products },
      totalCount: this.totalCount
    };
  }

  static clearBackgroundData() {
    this.products = {};
    this.totalCount = 0;
  }

  static closeBackgroundSSE() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
} 