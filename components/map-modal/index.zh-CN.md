---
category: 组件
title: 地图选取窗
subtitle: MapModal
---

## 何时使用

封装基于高德地图的位置和区域选取。

## API

按钮的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
initValue | 初始化坐标值 | string | -
getValue | 确定选取回调函数 | function | -
id | 容器id | string | -
type | 点定位（point）或者绘制编辑多边形（polygon） | string | ‘point’
hideModal | 取消选择回调函数 | function | -
centerPoint | 地图中心点位置 | string | -



