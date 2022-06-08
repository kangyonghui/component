import React from 'react';
import createReactClass from 'create-react-class';
import {render} from 'react-dom';

module.exports = createReactClass({
  displayName: 'Portal',
  portalElement: null,
  render: () => null,
  componentDidMount() {
    const p = document.createElement('div');
    document.body.appendChild(p);
    this.portalElement = p;
    this.componentDidUpdate();
  },
  componentWillUnmount() {
    document.body.removeChild(this.portalElement);
  },
  componentDidUpdate() {
    render(<div {...this.props}>{this.props.children}</div>, this.portalElement);
  }
});
