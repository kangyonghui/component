---
category: 组件
title: 可拖动对话框
subtitle: Panel
---

## 何时使用

顶层突出显示对话框。

## API

弹窗的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
title | 设置对话框标题 | 	string \| ReactNode | -
logo | 设置对话框标题logo | ReactNode | -
visible | 设置对话框是否显示，可选值为 `true` `false`  | boolean | false
mask | 设置对话框是否有遮罩，可选值为 `true` `false`  | boolean | false
disabled | 设置对话框是否有可拖拽，可选值为 `true` `false`  | boolean | false
zIndex | 设置对话框层级  | number | 1000
width | 设置对话框宽度，单位px  | number | 440
className | 指定对话框class名 | string | -
position | 指定对话框位置，例如{x: 100, y: 100} | object | -
style | 设置对话框样式，例如backgroundColor | CSSProperties | -
onCancel | 关闭对话框回调 | function | -
onDragStop | 拖动对话框结束回调 | function | -
