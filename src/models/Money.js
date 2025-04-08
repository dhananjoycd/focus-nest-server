class Money {
  constructor(source, category, amount, date, transactionType) {
    this.source = source;
    this.category = category;
    this.amount = amount;
    this.date = date;
    this.transactionType = transactionType;
  }
}

module.exports = Money;
