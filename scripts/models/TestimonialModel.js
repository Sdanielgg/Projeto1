// TestimonialModel.js
export class Testimonial {
  constructor(name, title, date, messageBody, image) {
      this.image = image || 'https://via.placeholder.com/150'; // Default image placeholder if none provided
      this.name = name;
      this.date = date;
      this.title = title;
      this.messageBody = messageBody;
  }

  getFormattedTestimonial() {
      return `
          Image URL: ${this.image}
          Name: ${this.name}
          Date: ${this.date}
          Title: ${this.title}
          Message: ${this.messageBody}
      `;
  }

  updateMessageBody(newMessageBody) {
      this.messageBody = newMessageBody;
  }
}
