import React, {Component} from 'react';
import classNames from 'classnames';
import {Button} from 'antd';

class PowerButton extends Component {
  render() {
    const props = this.props;
    const {promise, children, ...others} = props;

    const classes = classNames({
      'promise-button': promise !== false
    });

    return (
      <Button
        {...others}
        className={classes}
      >
        {children}
      </Button>
    );
  }
}

export default PowerButton;
