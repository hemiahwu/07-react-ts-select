// import "./select.module.css";
import { FormEvent, useEffect, useState } from "react";
import styles from "./select.module.css";
import { SelectOption } from "./types";

type SelectProps = {
  options: SelectOption[];
  value: SelectOption | undefined;
  onChange: (value: SelectOption | undefined) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 高亮效果
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  // 控制选中效果的方法
  const isOptionSelected = (option: SelectOption) => option === value;
  // 选中选项
  const selectOption = (option: SelectOption) => {
    option !== value && onChange(option);
  };

  // 删除选项
  const clearOptions = (e: FormEvent) => {
    e.stopPropagation();
    onChange(undefined);
  };

  // 解决bug
  useEffect(() => {
    isOpen && setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <>
      <div
        className={styles.container}
        onClick={() => setIsOpen((prev) => !prev)}
        onBlur={() => setIsOpen(false)}
        tabIndex={0}
      >
        <span className={styles.value}>{value?.label}</span>
        <button
          className={styles["clear-btn"]}
          onClick={(e) => {
            clearOptions(e);
          }}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>

        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option: SelectOption, i: number) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              key={i}
              className={`${styles.option} ${
                isOptionSelected(option) && styles.selected
              } ${i === highlightedIndex && styles.highlighted}`}
              onMouseEnter={() => setHighlightedIndex(i)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
