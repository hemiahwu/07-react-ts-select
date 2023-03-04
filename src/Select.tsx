// import "./select.module.css";
import { FormEvent, useEffect, useState } from "react";
import styles from "./select.module.css";
import { SelectOption } from "./types";
// 多选
type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

// 单选
type SingleSelectProps = {
  multiple?: false;
  value: SelectOption | undefined;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 高亮效果
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  // 控制选中效果的方法
  const isOptionSelected = (option: SelectOption) => option === value;
  // 选中选项
  const selectOption = (option: SelectOption) => {
    if (multiple) {
      value.includes(option)
        ? onChange(value.filter((o) => o !== option))
        : onChange([...value, option]);
    } else {
      option !== value && onChange(option);
    }
  };

  // 删除选项
  const clearOptions = (e: FormEvent) => {
    e.stopPropagation();
    multiple ? onChange([]) : onChange(undefined);
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
        <span className={styles.value}>
          {multiple
            ? value.map((v, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(v);
                  }}
                >
                  {v.label}
                </button>
              ))
            : value?.label}
        </span>
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
