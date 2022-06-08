import React from 'react';
import {Button} from 'antd';
import PowerButton from './button';
import classNames from 'classnames';
import './submit-group-large.css';

const prefix = 'submit-group-space';

class SubmitGroupLarge extends React.Component {
  static defaultProps = {
    cancelClick: () => {
    },
    confirmClick: () => {
    },
    cancelTxt: '返回',
    confirmTxt: '确定',
    size: 'large',
    loading: false,
    promise: true
  }

  render() {
    const {cancelTxt, confirmTxt, className, cancelClick, confirmClick, loading, promise, ...others} = this.props;
    const classes = classNames({
      [prefix]: true,
      [className]: className
    });

    return <div className={classes}>
      <Button {...others} onClick={cancelClick}>{cancelTxt}</Button>
      <PowerButton {...others} loading={loading} onClick={confirmClick} promise={promise}
                   type="primary">{confirmTxt}</PowerButton>
    </div>;
  }
}

export default SubmitGroupLarge;
