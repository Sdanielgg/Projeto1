export class Event {
    constructor(name, messageBody, image) {
        this.image = image 
        this.name = name;
        this.messageBody = messageBody;
    }
  
    getFormattedEvent() {
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
  