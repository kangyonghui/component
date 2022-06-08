---
category: 组件
title: 提交按钮组
subtitle: SubmitGroupLarge
---

## 何时使用

封装一组按钮组，响应用户点击行为，触发相应的业务逻辑。

## API

按钮的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
type | 设置按钮类型，可选值为 `primary` `ghost` 或者不设 | string | -
size | 设置按钮大小，可选值为 `small` `large` 或者不设 | string | `large`
cancelClick | `click` 第一个按钮的click事件的 handler | function | -
confirmClick | `click` 第二个按钮的click事件的handler | function | -
cancelTxt | 第一个按钮的文本 | string | `返回`
confirmTxt | 第二个按钮的文本 | string | 	`确定`
- `其他`：其他属性参照antd中的Button属性配置

