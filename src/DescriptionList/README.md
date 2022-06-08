---
  category: 组件
  title: 详情页组件
  subtitle: DescriptionList
  ---

  ## 何时使用

  详情页文本展示label：detail，支持图片的展示

  ## API

  DescriptionList的属性说明如下：

  属性 | 说明 | 类型 | 默认值
  -----|-----|-----|------
  layout | 布局方式，可选值为 `horizontal` `vertical`| string | 'horizontal'
  size | 列表型号，可选值为 `small` `large` | string | -
  col | 指定信息最多分几列展示，最终一行几列由 col 配置结合响应式规则决定 | number(0 < col <= 4) | 3
  gutter | 列表项间距，单位为px | number | 32

  DescriptionList.Description的属性说明如下：

  属性 | 说明 | 类型 | 默认值
  -----|-----|-----|------
  term | 列表项标题 | ReactNode | -
  labelWidth | 列表项标题宽度px | number | 80
  type | 标记是否是展示图片，`image`表示图片 | string | -
