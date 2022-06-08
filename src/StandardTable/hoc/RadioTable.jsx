/**
 * 基本Table
 * 单选功能
 */

import React from 'react';
import CommonTable from '../StandardTable';

function HOCFactory(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    static displayName = "RadioTable";

    // 重写，单选功能
    getSelectRow() {
      return {
        mode: "radio",
        clickToSelect: true,
        onSelect: this.onSelect,
        selected: this.state.selectedRowKeys,
        unselectable: this.props.unselectable
      };
    }

    // 单选
    onSelect = (row, isSelected) => {
      let {selectedRowKeys} = this.state;

      let rows = [...this.props.selectedRows];

      if (isSelected == true) {
        selectedRowKeys = [row.id];
        rows = [row];
      } else if (isSelected == false) {
        selectedRowKeys = [];
        rows = [];
      }

      if (this.props.onSelectRow) {
        this.props.onSelectRow(rows);
      }

      this.setState({selectedRowKeys});
    }

    render() {
      return super.render();
    }
  };
}

export default HOCFactory(CommonTable);
