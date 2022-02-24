export class Highway {
  constructor(data) {
    this.id = data.id;
    this.comment = data.comment || '';
    this.color = data.color || '';
    this.isFavorite = data.isFavorite;
  }

  addInfo = (comment, color) => {
    this.comment = comment;
    this.color = color;
  }
}