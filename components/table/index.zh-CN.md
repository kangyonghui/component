---
category: 组件
title: 表格
subtitle: Table
cols: 1
---

## 何时使用

基于Ant Design Table封装，实现自定义表格查询渲染。

## API

按钮的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
...others | 继承自AntD Table的API，详见#https://ant.design/components/table-cn/ | - | -
requestParams | 查询参数 | object | {}
dataRequest | 请求方法 | func | -
basicCondition | 查询模块传入 | ReactNode | -
filterGroup | 查询模块按钮组, 格式：\[{align: 'left/right', action: (ReactNode)}\] | array | []
