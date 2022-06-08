# 基础Table

内部实现采用`react-bootstrap-table`。

基本覆盖了:

- 勾选
- 分页
- 排序

## 提供列表

在`hoc`目录中添加两个文件，在项目中不满足使用时，可以upms,uportal的模块中添加文件扩展。

- BasicTable : 无勾选功能Table
- RadioTable : 单选Table


## 增强

采用HOC(高阶组件)方式

参见
```jsx harmony
import React from 'react';
import CommonTable from './CommonTable';  //基本功能的Table

function HOCFactory(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    static displayName = "Table2";

    // 重写
    getSelectRow() {
      // 可以方便地得到state，做一些更深入的修改。
      return {
        mode: "checkbox",
        clickToSelect: false,
        onSelect: this.onSelect,
        onSelectAll: this.onSelectAll,
        selected: this.state.selectedRowKeys,
        unselectable: this.props.unselectable
      };
    }

    render() {
      return super.render();
    }
  };
}

export default HOCFactory(CommonTable);

```
