import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications";
import { SendNotification } from "./send-notification";

describe("Send Notification", () => {
    it("should be able to send a notification", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const sendNotification = new SendNotification(notificationsRepository);

        const { notification } = await sendNotification.execute({
            category: "social",
            content: "novo conteudo",
            recipientId: "qualquer-user"
        })

        expect(notificationsRepository.notifications).toHaveLength(1);
        expect(notificationsRepository.notifications[0]).toEqual(notification);
    })
})

