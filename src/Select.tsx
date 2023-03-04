// import "./select.module.css";
import styles from "./select.module.css";
import { SelectOption } from "./types";

type SelectProps = { options: SelectOption[] };

export function Select({ options }: SelectProps) {
  console.log(options);
  return (
    <>
      <div className="container">局部样式的 错误用法 ❎</div>
      <div className={styles.container}>局部样式的 正确用法 ✅</div>
    </>
  );
}
