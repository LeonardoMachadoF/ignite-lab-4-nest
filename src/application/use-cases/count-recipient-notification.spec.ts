import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe("count recipient notifications", () => {
    it("should not be able to count recipient notifications", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);

        await notificationsRepository.create(makeNotification({ recipientId: "example-only" }));
        await notificationsRepository.create(makeNotification({ recipientId: "example-only" }));
        await notificationsRepository.create(makeNotification({ recipientId: "example-2" }));


        const count = await countRecipientNotifications.execute({ recipientId: 'example-only' });

        expect(count).toEqual({ count: 2 });
    })
})

