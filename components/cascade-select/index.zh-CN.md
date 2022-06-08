---
category: 组件
title: 级联选择
subtitle: CascadeSelect
---

## 何时使用

用于select级联选择。

## API

CascadeSelect的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
onChange | select选择回调 | function | -

CascadeSelect.Item的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
key | 当前select主键 | string | -
placeholder | 表单提示 | string | -
param | 级联筛选参数名 | string | -
url | 异步查询接口| string | -
noParam | 标记当前是一级选择框 | noParam | -
format | 下拉排序方式 | function | -
