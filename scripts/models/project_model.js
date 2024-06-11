export class Project {
    constructor(name, messageBody, image) {
        this.image = image;
        this.name = name;
        this.messageBody = messageBody;
    }

    getFormattedProject() {
        return `
            Image URL: ${this.image}
            Name: ${this.name}
            Message: ${this.messageBody}
        `;
    }

    updateMessageBody(newMessageBody) {
        this.messageBody = newMessageBody;
    }
}
