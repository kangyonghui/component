import React from 'react';
import classNames from 'classnames';

import './submit-group.css';

const prefix = 'ux-btn-submit-group';

class SubmitGroup extends React.Component {

  render() {
    const {size, className, ...others} = this.props;

    // large => lg
    // small => sm
    const sizeCls = ({
        huge: 'hg',
        large: 'lg',
        small: 'sm',
      })[size] || '';

    const classes = classNames({
      [prefix]: true,
      [prefix + "-" + sizeCls]: sizeCls,
      [className]: className
    });

    return <div {...others} className={classes}/>;
  }
}

export default SubmitGroup;
