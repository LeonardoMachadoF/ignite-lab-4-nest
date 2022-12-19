import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications";
import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notification";

describe("Read Notification", () => {
    it("should be able to read a notification", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new ReadNotification(notificationsRepository);

        const notification = makeNotification();

        await notificationsRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
    })

    it("should not be able to read a nonexistent notification", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new ReadNotification(notificationsRepository);



        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-id'
            })
        }).rejects.toThrow(NotificationNotFound);
    })
})

