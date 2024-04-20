import styles from "./Section.module.css";

const Section = ({ children, title, subtitle }) => {
  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {children}
    </div>
  );
};

export default Section;
