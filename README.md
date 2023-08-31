# 07-React-ts 单个选项

## 第一章 课程代码

Git仓库地址: https://github.com/hemiahwu/07-react-ts-select

百度网盘链接: https://pan.baidu.com/s/1mrQYCkoeCDva7UvLAiu-sA?pwd=h59n 提取码: h59n



课程答疑微信: 

web1024b

### 1. 创建项目

```bash
npm create vite
react-ts-resume
react
react-ts
npm i
code .
npm run dev
```

### 2. App.tsx

```tsx
function App() {
  return <h1>Hello React ts</h1>;
}

export default App;
```

### 3. main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

### 4. 创建选项组件 src/Select.tsx 引入和使用 css

```tsx
// chat查询
import styles from "./select.module.css";

export function Select() {
  return (
    <>
      <div className="container">❌的用法</div>
      <div className={styles.container}>✅的用法</div>
    </>
  );
}
```

### 5. src/select.module.css 局部样式

```css
.container {
  background: red;
  width: 100px;
  height: 100px;
}
```

### 6. App.tsx

```tsx
import { Select } from "./Select";

function App() {
  return <Select />;
}

export default App;
```

- 查看浏览器的效果, 会看到更改的 class 名称

### 7. 准备样式(后面用)

- select.module.css

```css
.container {
  position: relative;
  width: 20em;
  min-height: 1.5em;
  border: 0.05em solid #777;
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  border-radius: 0.25em;
  outline: none;
}

.container:focus {
  border-color: hsl(200, 100%, 50%);
}

.value {
  flex-grow: 1;
}

.close-btn {
  background: none;
  color: #777;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 1.25em;
}

.close-btn:focus,
.close-btn:hover {
  color: #333;
}

.divider {
  background-color: #777;
  align-self: stretch;
  width: 0.05em;
}

.caret {
  translate: 2 25%;
  border: 0.25em solid transparent;
  border-top-color: #777;
}

.options {
  margin: 0;
  padding: 0;
  list-style: none;
  display: none;
  max-height: 15em;
  overflow-y: auto;
  border: 0.05em solid #777;
  border-radius: 0.25em;
  width: 100%;
  position: absolute;
  left: 0;
  top: calc(100% + 0.25em);
  background-color: #fff;
  z-index: 100;
}

.options.show {
  display: block;
}

.option {
  padding: 0.25em 0.5em;
  cursor: pointer;
}

.option.highlighted {
  background-color: hsl(200, 100%, 50%);
  color: white;
}

.option.selected {
  background-color: hsl(200, 100%, 70%);
}
```

## 2. 模拟数据展示

### 1. types/index.ts

```ts
export type SelectOption = {
  label: string;
  value: number;
};
```

### 2. App.tsx

```tsx
// 定义数据
const options: SelectOption[] = [
  { label: "🍔", value: 10 },
  { label: "🐂", value: 15 },
  { label: "🥪", value: 13 },
  { label: "☕️", value: 8 },
];

function App() {
  // 2. 传递
  return <Select options={options} />;
}

export default App;
```

### 3. Select.tsx 接收数据

```tsx
type SelectProps = {
  options: SelectOption[];
};

export function Select({ options }: SelectProps) {
  console.log(options);
}
```

## 3. 渲染列表

### 1. Select.tsx

```tsx
...
export function Select({ options }: SelectProps) {
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.options}>
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
```

- 显示列表样式

```tsx
<ul className={`${styles.options} ${styles.show}`}>
```

- 布局整体结构 Select.tsx

```tsx
export function Select() {
  return (
    <>
      <div className={styles.container}>
        {/* 布局结构 */}
        <span className={styles.value}>🍌(默认值)</span>
        <button className={styles["clear-btn"]}>&times;</button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>

        {/* 渲染列表 */}
        <ul className={styles.options}>...</ul>
      </div>
    </>
  );
}
```

## 4. 设置默认值和更新值

### 1. App.tsx

```tsx
function App() {
  // 1.定义value                      定义类型
	const [value, setValue] = useState<SelectOption>(options[0]);

  return (
    <!--2. 传递数据 -->
    <Select
      options={options}
      value={value}
      onChange={(o: SelectOption) => setValue(o)}
    />
  );
}

export default App;
```

### 2. Select.tsx

```tsx
type SelectProps = {
  options: SelectOption[];
  value: SelectOption;
  onChange: (value: SelectOption) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
	....
  <span className={styles.value}>{value.label}</span>
  ...
}
```

### 3. Select.tsx 触发事件 选中内容

```tsx
function selectOption(option: SelectOption) {
	onChange(option);
}

<li
    onClick={(e) => {
      selectOption(option);
    }}
   ...
  >
```

##

## 5. 动态处理条件显示和隐藏

### 1. Select.tsx 条件渲染 show or not

```tsx
// 1. 定义状态
const [isOpen, setIsOpen] = useState<boolean>(false);
return (
  <>
    <div className={styles.container}>
      ....                               <!--2. 条件渲染-->
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        ...
      </ul>
    </div>
  </>
);
```

- Select.tsx 触发事件 更新状态

```tsx
const [isOpen, setIsOpen] = useState<boolean>(false);

return (
  <div
    onClick={() => setIsOpen((prev) => !prev)}
    onBlur={() => setIsOpen(false)}  // 点击空白隐藏
    tabIndex={0}  // 解决blur失效问题
    className={styles.container}
  >
```

## 6. Select.tsx 触发事件 删除内容

```tsx
function clearOptions() {
  onChange(undefined);
}

<button
  onClick={(e) => {
    clearOptions();
  }}
  className={styles["clear-btn"]}
>
```

- Select.tsx 点击清除之后, 会出现冒泡, 显示列表

```tsx
function clearOptions() {
  onChange(undefined);
}

<button
  onClick={(e) => {
    e.stopPropagation(); // 解决冒泡问题
    clearOptions();
  }}
  className={styles["clear-btn"]}
>
```

- 因为值涉及到 undefined 所以需要对原本的 SelectOption 修改值的类型

```tsx
// Select.tsx 添加undefined
type SelectProps = {
  options: SelectOption[];
  value: SelectOption | undefined; // u
  onChange: (value: SelectOption | undefined) => void; // u
};

{
  /* 添加可选 ? */
}
<span className={styles.value}>{value?.label}</span>;

// App.tsx 添加undefined
function App() {
  // 添加undefined
  const [value, setValue] = useState<SelectOption | undefined>(options[0]);

  // 2. 传递
  return (
    <Select
      options={options}
      value={value}
      onChange={(o: SelectOption | undefined) => setValue(o)} // u
    />
  );
}
```

### 3. Select.tsx 触发事件 选中内容

```tsx
function selectOption(option: SelectOption) {
	onChange(option);
}

<li
    onClick={(e) => {
      e.stopPropagation();
      selectOption(option);
      setIsOpen(false);
    }}
   ...
  >
```

## 7. 实现选中和高亮效果

### 1. Select.tsx

- 为 li 添加动态样式

```tsx
// 2. 实现选中方法
const isOptionSelected = (option: SelectOption) => {
  return option === value;
};

// 1.
return ...
<li
  ...
  className={`${styles.option} ${
    isOptionSelected(option) && styles.selected // 加入动态样式
  }`}
  onMouseEnter={() => setHighlightedIndex(i)}
>
  {option.label}
</li>
```

### 2. Select.tsx

- 实现高亮效果

```tsx
const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

return ...
<li
  ....
  className={`${styles.option} ${isOptionSelected(option) && styles.selected}
  ${i === highlightedIndex && styles.highlighted}`} // 高亮效果
  onMouseEnter={() => setHighlightedIndex(i)} // 鼠标事件更新高亮值
>
  ...
</li>
```

### 3. Select.tsx

- 解决高亮 hover 存留问题 鼠标 hover 到第三个 离开 在点击 hover 仍旧在第三个

```tsx
// 处理hover
useEffect(() => {
  isOpen && setHighlightedIndex(0);
}, [isOpen]);
```

### 4. Select.tsx 优化

- 如果选中的内容和上次一样, 就不要走 onChange

```tsx
const selectOption = (option: SelectOption) => {
  option !== value && onChange(option);
};
```

# 02. React-ts 多个选项

### 1. App.tsx 传递多个数据

```tsx
// 多选项
const [values, setValues] = useState<SelectOption[]>([options[0]]);

return ...
{/* 多选项 */}
<Select
  multiple
  options={options}
  value={values}
  onChange={(o: SelectOption[]) => setValues(o)}
/>
<br />
```

### 2. Select.tsx 接收多个数据

- 接收 multiple

```tsx
export function Select({ multiple, value, onChange, options }: SelectProps) {}
```

### 3. Select.tsx 调整类型匹配

```tsx
type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value: SelectOption | undefined;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {}
```

### 4. Select.tsx 调整逻辑

- 删除 | 清空

```tsx
const clearOptions = () => {
  multiple ? onChange([]) : onChange(undefined);
};
```

- 选中 单选 | 多选

```tsx
const selectOption = (option: SelectOption) => {
  if (multiple) {
    // 如果已经显示了,那就取消
    value.includes(option)
      ? onChange(value.filter((o) => o !== option))
      : onChange([...value, option]);
  } else {
    option !== value && onChange(option);
  }
};
```

- 判断是否选中 单选 | 多选

```tsx
const isOptionSelected = (option: SelectOption) => {
  return multiple ? value.includes(option) : option === value;
};
```

### 5. Select.tsx 显示区域

- 单选 | 多选 显示内容

```tsx
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
```
