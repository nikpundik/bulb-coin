import Block from "./Block";
import { verify } from "./crypto";

class Blockchain {
  peers = {};

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.miningReward = 1;
    this.initialAccounts = {
      coinbase: 1_000_000_000,
      josh: 2_300,
      alice: 12_300,
    };
  }

  join(peer) {
    this.peers[peer.address] = peer;
  }

  leave(peer) {
    delete this.peers[peer.address];
  }

  createGenesisBlock() {
    const block = new Block(0, new Date().toString(), [], "0");
    block.calculateHash();
    return block;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  createTransaction(transaction) {
    if (transaction.from === transaction.to) {
      console.log("Error: Invalid destination.");
      return;
    }
    const { publicKey } = this.peers[transaction.from];
    const { hash, ...restTransaction } = transaction;
    if (!verify(restTransaction, hash, publicKey)) {
      console.log("Error: Invalid signature.");
      return;
    }
    const amount = this.pendingTransactions.reduce(
      (sum, t) => sum + (t.from === transaction.from ? t.amount : 0),
      transaction.amount
    );
    const senderBalance = this.getBalanceOfAddress(transaction.from);
    console.log(transaction.from, transaction.amount, amount, senderBalance);
    if (senderBalance < amount) {
      console.log("Error: Insufficient balance.");
      return;
    }
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(minerAddress) {
    if (this.pendingTransactions.length === 0) {
      console.log("Error: No pending transactions.");
      return;
    }
    const rewardTx = {
      from: "coinbase",
      to: minerAddress,
      amount: this.miningReward,
    };
    this.pendingTransactions.push(rewardTx);

    const block = new Block(
      this.chain.length,
      new Date().toString(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );
    block.calculateHash();

    this.chain.push(block);

    this.pendingTransactions = [];
  }

  getBalanceOfAddress(address) {
    let balance = this.initialAccounts[address] || 0;
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.from === address) {
          balance -= tx.amount;
        }
        if (tx.to === address) {
          balance += tx.amount;
        }
      }
    }
    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (
        currentBlock.hash !== currentBlock.calculateHash() ||
        currentBlock.previousHash !== previousBlock.hash
      ) {
        return false;
      }
    }
    return true;
  }
}

export default Blockchain;
