import styles from "./InputGroup.module.css";

const InputGroup = ({ label, children }) => {
  return (
    <div className={styles.group}>
      <label>{label}</label>
      {children}
    </div>
  );
};

export default InputGroup;
