export class Highway {
  constructor(data) {
    this.id = data.id;
    this.comment = data.comment || '';
    this.color = data.color || '';
    this.isFavorite = !!data.comment;
  }

  addInfo = (comment, color) => {
    this.comment = comment;
    this.color = color;
    this.isFavorite = !!comment;
  }
}