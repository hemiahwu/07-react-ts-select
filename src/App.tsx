import { useState } from "react";
import { Select } from "./Select";
import { SelectOption } from "./types";

// 数据模拟
const options: SelectOption[] = [
  { label: "🍔", value: 10 },
  { label: "🐂", value: 20 },
  { label: "🍞", value: 10 },
  { label: "☕️", value: 30 },
];

function App() {
  // 单个选项
  const [value, setValue] = useState<SelectOption | undefined>(options[0]);
  // 多个选项
  const [values, setValues] = useState<SelectOption[]>([options[0]]);

  return (
    <>
      {/* 单个选项 */}
      <Select
        value={value}
        options={options}
        onChange={(o: SelectOption | undefined) => setValue(o)}
      />
      <br />
      {/* 多个选项 */}
      <Select
        multiple
        value={values}
        options={options}
        onChange={(o: SelectOption[]) => setValues(o)}
      />
    </>
  );
}

export default App;
