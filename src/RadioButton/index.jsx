import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import {Button} from 'antd';
import './index.css';

export default class RadioButton extends React.Component {
  static defaultProps = {
    canCancel: false,
    defaultType: 'default',
    clickType: 'primary',
    arrangement: 'horizontal',
    size: 'large',
    options: [],
    onChange: function () {

    }
  };

  static propTypes = {
    canCancel: PropTypes.bool,
    defaultType: PropTypes.string,
    clickType: PropTypes.string,
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    arrangement: PropTypes.string,
    size: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    let activeKey;
    if ('activeKey' in props) {
      activeKey = props.activeKey;
    }
    this.state = {
      activeKey,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
  }

  onClickChange = (ev) => {
    const lastActiveKey = this.state.activeKey;
    const target = ev.target;
    const key = target.value;
    this.setState({
      activeKey: key
    }, () => {
      const onChange = this.props.onChange;
      if (onChange && key !== lastActiveKey) {
        onChange(key, target);
      } else {
        if (onChange && key === lastActiveKey && this.props.canCancel) {
          this.setState({
              activeKey: ''
            });
          onChange(key, target);
        }
      }
    });
  }
  render() {
    const props = this.props;
    const { prefixCls = 'ant-radio-button', className = '' } = props;
    const classString = classNames(prefixCls, {
      [`${prefixCls}-${props.arrangement}`]: props.arrangement
    }, className);
    let children;
    // 如果存在 options, 优先使用
    if (props.options && props.options.length > 0) {
      children = props.options.map((option, index) => {
        return (
          <Button
            key={index}
            value={option.key}
            disabled={option.disabled || false}
            name={option.text}
            onClick={this.onClickChange}
            size={this.props.size}
            type={this.state.activeKey === option.key ? this.props.clickType : this.props.defaultType}
          >
            {option.text}
          </Button>
        );
      });
    }

    return (
      <div
        className={classString}
        style={props.style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {children}
      </div>
    );
  }
}
