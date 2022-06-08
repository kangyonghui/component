---
category: 组件
title: 互斥按钮组
subtitle: RadioButton
---

## 何时使用

实现一组互斥按钮，用于分类切换按钮等场景。

## API

按钮的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
canCancel | 设置按钮是否可以取消选择，可选值为 `true` `false` 或者不设 | boolean | false
defaultType | 设置按钮默认类型，可选值为 `primary` `dashed` `danger` 或者不设 | string | default
clickType | 设置按钮点击后的类型，可选值为 `primary` `dashed` `danger` 或者不设 | string | primary
activeKey | 设置默认激活按钮的key | string | -
arrangement | 设置按钮的排列方式，可选值为 `horizontal` `vertical` | string | horizontal
size | 设置按钮大小，可选值为 `small` `large` 或者不设 | string | `large`
onChange | 按钮切换事件的 handler，返回切换后的key，切换后的按钮ele | function | -
options | 单个按钮的属性，只包括按钮唯一标志key（string），按钮文本text（string），是否禁用disabled（boolean） | array | -
