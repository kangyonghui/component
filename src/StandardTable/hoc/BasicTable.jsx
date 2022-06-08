/**
 * 基本Table
 * 无选择功能
 */

import React from 'react';
import CommonTable from '../StandardTable';

function HOCFactory(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    static displayName = "BasicTable";

    // 重写，禁用了勾选功能
    getSelectRow() {
      return {};
    }

    render() {
      return super.render();
    }
  };
}

export default HOCFactory(CommonTable);
