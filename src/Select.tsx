// import "./select.module.css";
import styles from "./select.module.css";
import { SelectOption } from "./types";

type SelectProps = { options: SelectOption[] };

export function Select({ options }: SelectProps) {
  console.log(options);
  return (
    <>
      <div className={styles.container}>
        <span className={styles.value}>🍌(默认值)</span>
        <button className={styles["clear-btn"]}>&times;</button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${styles.show}`}>
          {options.map((option: SelectOption, i: number) => (
            <li key={i} className={styles.option}>
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
