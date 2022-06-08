/**
 * Created by neo on 16/4/22.
 */
import React from 'react';
import createReactClass from 'create-react-class';
import classNames from 'classnames';

const prefix = 'table-filter-';

const FilterItem = createReactClass({
  render(){
    const props = this.props;
    const {label, style, className, float, children, ...others} = props;

    const classes = classNames({
      [`${prefix}item`]: true,
      [`${prefix}${float}-item`]: float,
      [className]: className,
    });

    if (!label) {

      return (
        <div {...others}
             style={ style }
             className={classes}>
          {children}
        </div>
      )

    } else {
      style.display = 'flex';
      return (
        <div {...others}
             style={ style }
             className={classes}>
          <div style={{lineHeight: 2}}>{ label }</div>
          {children}
        </div>
      )
    }

  }
});

export default FilterItem;
