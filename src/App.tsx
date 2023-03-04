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
  return <Select options={options} />;
}

export default App;
