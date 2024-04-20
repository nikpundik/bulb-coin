import { useState } from "react";
import Blockchain from "./lib/Blockchain";
import Peer from "./lib/Peer";
import Section from "./ui/Section";
import CreateTransaction from "./CreateTransaction";
import PendingTransactions from "./PendingTransactions";
import styles from "./App.module.css";

const blockchain = new Blockchain();

const peers = [
  new Peer("coinbase"),
  new Peer("josh"),
  new Peer("alice"),
  new Peer("luke"),
  new Peer("amanda"),
  new Peer("bob"),
];

peers.forEach((peer) => {
  peer.join(blockchain);
});

const getState = (blockchain, queries) => {
  return {
    pendingTransactions: [...blockchain.pendingTransactions],
    chain: [...blockchain.chain],
    balances: queries.map((peer) => ({
      peer,
      balance: blockchain.getBalanceOfAddress(peer.address),
    })),
  };
};

function App() {
  const [{ pendingTransactions, balances }, setState] = useState(
    getState(blockchain, peers)
  );

  return (
    <main>
      <h1 className={styles.title}>
        <small>💡</small>💡 Bulb Coin 💡<small>💡</small>
      </h1>
      <div className={styles.sections}>
        <Section title="Balances" subtitle="View the balances of peers.">
          <table border="0" cellspacing="0" cellpadding="0">
            <tbody>
              {balances.map(({ peer, balance }) => (
                <tr key={peer.address}>
                  <td>{peer.address}</td>
                  <td className={styles.cellRight}>
                    <b>{balance}</b> 💡<small>BC</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
        <Section
          title="Create Transaction"
          subtitle="Enter the amount and addresses to send the coins. "
        >
          <CreateTransaction
            peers={peers}
            blockchain={blockchain}
            onComplete={() => setState(getState(blockchain, peers))}
          />
        </Section>
        <Section
          title="Pending Transactions"
          subtitle="Enter the miner's address to mine."
        >
          <PendingTransactions
            pendingTransactions={pendingTransactions}
            peers={peers}
            blockchain={blockchain}
            onComplete={() => setState(getState(blockchain, peers))}
          />
        </Section>
      </div>
    </main>
  );
}

export default App;
