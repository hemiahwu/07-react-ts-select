// import "./select.module.css";
import { useState } from "react";
import styles from "./select.module.css";
import { SelectOption } from "./types";

type SelectProps = {
  options: SelectOption[];
  value: SelectOption;
  onChange: (value: SelectOption) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectOption = (option: SelectOption) => {
    onChange(option);
  };
  return (
    <>
      <div
        className={styles.container}
        onClick={() => setIsOpen((prev) => !prev)}
        onBlur={() => setIsOpen(false)}
        tabIndex={0}
      >
        <span className={styles.value}>{value.label}</span>
        <button className={styles["clear-btn"]}>&times;</button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>

        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option: SelectOption, i: number) => (
            <li
              onClick={(e) => {
                selectOption(option);
              }}
              key={i}
              className={styles.option}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
