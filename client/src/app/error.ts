export class ErrorMessage {
    title = "";
    shortmessage = "";
    longmessage = "";

    constructor(title: string, shortmessage: string, longmessage: string) {
        this.title = title;
        this.shortmessage = shortmessage;
        this.longmessage = longmessage;
    }
}