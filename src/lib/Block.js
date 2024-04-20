import hash from "object-hash";

class Block {
  constructor(index, timestamp, transactions, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = null;
  }

  calculateHash() {
    this.hash = hash.MD5(
      this.index +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.previousHash
    );
  }
}

export default Block;
