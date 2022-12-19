export class Content {
    private readonly content: string;

    get value(): string {
        return this.content;
    }

    private validadeContentLength(content: string) {
        return content.length >= 5 && content.length <= 240;
    }

    constructor(content: string) {
        const isContentLenghtValid = this.validadeContentLength(content);
        if (!isContentLenghtValid) throw new Error("Content length error.")
        this.content = content;
    }
}