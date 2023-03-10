import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";

describe("Cancel Notification", () => {
    it("should be able to cancel a notification", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = new Notification({
            category: 'social',
            content: new Content("notavadsa"),
            recipientId: "example-only"
        });

        await notificationsRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    })

    it("should not be able to cancel a nonexistent notification", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);



        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-id'
            })
        }).rejects.toThrow(NotificationNotFound);
    })
})

