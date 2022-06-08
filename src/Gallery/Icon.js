import React from 'react';
import createReactClass from 'create-react-class';
import icons from './icons';
import PropTypes from 'prop-types';

module.exports = createReactClass({
  displayName: 'Icon',
  propTypes: {
    type: PropTypes.oneOf(Object.keys(icons))
  },
  render () {
    return <span dangerouslySetInnerHTML={{__html: icons[this.props.type]}} {...this.props} />
  },
});
