export class Post{
    type=""
    constructor(name, title, messageBody, image,type) {
        this.image = image;
        this.name = name;
        this.title = title;
        this.messageBody = messageBody;
        this.type=type;
    }
}