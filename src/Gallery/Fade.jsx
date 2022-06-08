import React from 'react';
import createReactClass from 'create-react-class';
import objectAssign from 'object-assign';

const Fade = createReactClass({
  getDefaultProps() {
    return {
      duration: 200
    };
  },
  componentWillAppear: function (callback) {
    setTimeout(callback, 1); // need at least one tick to fire transition
  },
  componentDidAppear: function () {
    this._showElement();
  },
  componentWillEnter: function (callback) {
    setTimeout(callback, 1);
  },
  componentDidEnter: function () {
    this._showElement();
  },
  componentWillLeave: function (callback) {
    this._hideElement();
    setTimeout(callback, this.props.duration);
  },
  componentDidLeave: function () {
  },
  _showElement: function () {
    let el = this.element;
    el.style.opacity = 1;
  },
  _hideElement: function () {
    let el = this.element;
    el.style.opacity = 0;
  },
  render: function () {
    const defaultStyle = {
      opacity: 0,
      WebkitTransition: `opacity ${this.props.duration}ms ease-out`,
      msTransition: `opacity ${this.props.duration}ms ease-out`,
      transition: `opacity ${this.props.duration}ms ease-out`,
    };

    const {duration, style, ...others} = this.props;

    return (
      <div ref={element => this.element = element} {...others} style={objectAssign({}, defaultStyle, style)}/>
    );
  }
});

module.exports = Fade;
