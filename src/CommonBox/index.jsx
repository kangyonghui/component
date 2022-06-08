import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.less';

export default class CommonBox extends Component {
  renderTitle = title => (<div className="titleWrap">
    <div className="titleDom">
      <div className="titleIcon"/>
      <div className="titleContent">{title}</div>
    </div>
  </div>);
  render() {
    const {isDiv, className, style, title, ...others} = this.props;
    return (
      <div className={`${isDiv ? '' : 'commonBox'} ${className}`} {...others} style={{...style}}>
        {typeof (title) === 'string' && title ? this.renderTitle(title) : <div>{title}</div>}
        {this.props.children}
        {isDiv ? null : (<div><div className="angle1"/>
          <div className="angle2"/>
          <div className="angle3"/>
          <div className="angle4"/></div>)}
      </div>
    );
  }
}

CommonBox.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  isDiv: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

CommonBox.defaultProps = {
  className: '',
  style: {},
  isDiv: false,
  title: ''
};
