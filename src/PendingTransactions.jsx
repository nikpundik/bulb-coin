import { useState } from "react";
import InputGroup from "./ui/InputGroup";

function PendingTransactions({
  pendingTransactions,
  blockchain,
  onComplete,
  peers,
}) {
  const [minerValue, setMinerValue] = useState("");

  const mine = (miner) => {
    blockchain.minePendingTransactions(miner);
    onComplete();
  };

  return (
    <>
      {pendingTransactions.length > 0 ? (
        <table style={{ marginBottom: "36px" }}>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {pendingTransactions.map((transaction) => (
              <tr key={transaction.hash}>
                <td>{transaction.from}</td>
                <td>{transaction.to}</td>
                <td>{transaction.amount}</td>
                <td style={{ maxWidth: "160px" }}>{transaction.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>
          No pending transations to mine. Please add new transactions on the
          network.
        </p>
      )}
      <InputGroup label="Miner">
        <select
          value={minerValue}
          onChange={(e) => setMinerValue(e.target.value)}
        >
          <option value=""></option>
          {peers.map((peer) => (
            <option key={peer.address} value={peer.address}>
              {peer.address}
            </option>
          ))}
        </select>
      </InputGroup>
      <button disabled={!minerValue} onClick={() => mine(minerValue)}>
        Mine
      </button>
    </>
  );
}

export default PendingTransactions;
