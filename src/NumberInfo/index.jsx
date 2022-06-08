import React from 'react';
import classNames from 'classnames';
import accounting from '../Util/accounting';

const prefix = 'number-info';

class NumberInfo extends React.Component {
  static defaultProps = {
    color: false,
    symbol: "",
    precision: 2
  }

  textColor() {
    if (this.props.color) {
      if (this.props.number > 0) {
        return ({color: 'green'})
      } else {
        return ({color: 'red'})
      }
    }
  }

  titleInfo() {
    const {number, symbol, precision} = this.props;
    return accounting.formatMoney(number, symbol, precision)
  }

  render() {
    const {number, className, symbol, precision, ...others} = this.props;
    const textColor = this.textColor();
    const classes = classNames({
      [prefix]: true,
      [className]: className
    });

    return <div className={classes} style={textColor}>
      <span>{this.titleInfo()}</span>
    </div>;
  }
}

export default NumberInfo;
