import hash from "object-hash";

export const generateKeyPair = () => {
  const privateKey = Math.random().toString(36).substring(2);
  const publicKey = privateKey.split("").reverse().join("");
  return { privateKey, publicKey };
};

export const sign = (transaction, privateKey) => {
  return hash.MD5(JSON.stringify(transaction) + privateKey);
};

export const verify = (transaction, signature, publicKey) => {
  const expectedSignature = hash.MD5(
    JSON.stringify(transaction) + publicKey.split("").reverse().join("")
  );
  return expectedSignature === signature;
};
