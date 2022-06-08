import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tips: {}
    };
  }

  componentDidMount() {
    const {authUrl} = this.props;
    this.getData(authUrl);
  }

  getData = (authUrl) => {
    axios.get(`${authUrl}?auth=true`).then((r) => {
      this.setState({tips: r || {}});
    });
  };

  getTips = (tips) => {
    if (!tips.code) {
      return false;
    }
    if (tips.code === 403) {
      return <div className="authTips">{this.props.authTips}</div>;
    }
    if (tips.code === 509) {
      return <div className="authTips">{tips.msg}</div>;
    }
  };

  render() {
    const {tips} = this.state;
    return (
      <span>
        {this.getTips(tips) || this.props.children}
      </span>
    );
  }
}

Auth.propTypes = {
  authUrl: PropTypes.string,
  authTips: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

Auth.defaultProps = {
  authUrl: '',
  authTips: '对不起，您没有该项权限'
};
