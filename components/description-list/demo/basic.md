---
order: 0
title:
  zh-CN: 基本用法
  en-US: description list
---


```jsx
import {DescriptionList} from 'component';
const {Description} = DescriptionList;

ReactDOM.render(
  <div>
    <DescriptionList gutter={32} col={3} layout="horizontal" size="">
      <Description term="姓名">张三</Description>
      <Description term="学历">大学本科</Description>
      <Description term="大学">上海复旦大学</Description>
    </DescriptionList>
  </div>,
  mountNode
);
```
