import { Content } from "./content";
import { Notification } from "./notification";

describe("Notification", () => {
    it("should be able to create a notification", () => {
        const content = new Content("Você recebeu uma solicitação de amizade!");
        const notification = new Notification({
            content,
            category: "social",
            recipientId: "example-recipient"
        });

        expect(notification).toBeTruthy();
    })
    it("should not be able to create a notification content with less than 5 characters", () => {
        expect(() => new Content("Você")).toThrow();
    })
    it("should not be able to create a notification content with more than 240 characters", () => {
        expect(() => new Content("a".repeat(241))).toThrow();
    })
})

