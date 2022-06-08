import React from 'react';
import {Button, Popconfirm} from 'antd';

/**
 * @description 本组件与 WrapTable 的 getOperate 方法深度依赖无需手动调用
 */
class DeleteButton extends React.Component {
  constructor() {
    super();
    this.state = {
      onDelete: false,
    };
    this.overDelete = this.overDelete.bind(this);
    this.outDelete = this.outDelete.bind(this);
  }

  overDelete() {
    this.setState({
      onDelete: true
    });
  }

  outDelete() {
    this.setState({
      onDelete: false
    });
  }

  render() {
    const {onClick} = this.props;
    const {onDelete} = this.state;
    return (
      <span
        onMouseOver={this.overDelete}
        onMouseOut={this.outDelete}>
        <Popconfirm title="确定删除？" okText="是" onConfirm={onClick} cancelText="否">
          <Button icon="delete" type={onDelete ? 'danger' : 'dashed'} href="#">删除</Button>
        </Popconfirm>
      </span>
    );
  }
}

export default DeleteButton;
