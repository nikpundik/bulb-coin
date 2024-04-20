import { generateKeyPair, sign } from "./crypto";

class Peer {
  constructor(address) {
    this.address = address;
    const { publicKey, privateKey } = generateKeyPair();
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  join(blockchain) {
    this.blockchain = blockchain;
    blockchain.join({ address: this.address, publicKey: this.publicKey });
  }

  createTransaction(to, amount) {
    const transaction = {
      from: this.address,
      to,
      amount: amount,
      t: Date.now(),
    };
    transaction.hash = sign(transaction, this.privateKey);
    this.blockchain.createTransaction(transaction);
  }
}

export default Peer;
