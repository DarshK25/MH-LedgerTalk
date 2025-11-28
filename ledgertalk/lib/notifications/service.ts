// Notification service
export class NotificationService {
    async sendNotification(userId: string, message: string) {
        // TODO: Implement notification sending
        console.log(`Notification to ${userId}: ${message}`);
    }
}

export const notificationService = new NotificationService();
