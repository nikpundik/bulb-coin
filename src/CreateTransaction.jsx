import { useState } from "react";
import InputGroup from "./ui/InputGroup";

function CreateTransaction({ onComplete, peers }) {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [amount, setAmount] = useState(0);

  const createTransaction = (amount, from, to) => {
    const peer = peers.find((p) => p.address === from);
    peer.createTransaction(to, amount);
    onComplete();
  };

  return (
    <>
      <InputGroup label="Amount">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </InputGroup>
      <InputGroup label="From">
        <select
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
        >
          <option value=""></option>
          {peers.map((peer) => (
            <option key={peer.address} value={peer.address}>
              {peer.address}
            </option>
          ))}
        </select>
      </InputGroup>
      <InputGroup label="To">
        <select value={toValue} onChange={(e) => setToValue(e.target.value)}>
          <option value=""></option>
          {peers.map((peer) => (
            <option key={peer.address} value={peer.address}>
              {peer.address}
            </option>
          ))}
        </select>
      </InputGroup>
      <button
        disabled={!fromValue || !toValue}
        onClick={() => createTransaction(amount, fromValue, toValue)}
      >
        Add transaction
      </button>
    </>
  );
}

export default CreateTransaction;
