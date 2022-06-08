import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { addLocaleData, IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Header from './Header';
import Footer from './Footer';
import cnLocale from '../../zh-CN';
import 'antd/dist/antd.css';

if (typeof window !== 'undefined') {
  require('../../static/style');

  window.react = React;
  window['react-dom'] = ReactDOM;
  window.antd = require('antd');
}

export default class Layout extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const pathname = props.location.pathname;
    const appLocale = cnLocale;
      //utils.isZhCN(pathname) ? cnLocale : enLocale;
    addLocaleData(appLocale.data);
    this.state = {
      isFirstScreen: true,
      appLocale,
    };
  }

  componentDidMount() {
    if (typeof window.ga !== 'undefined') {
      this.context.router.listen((loc) => {
        window.ga('send', 'pageview', loc.pathname + loc.search);
      });
    }

    const nprogressHiddenStyle = document.getElementById('nprogress-style');
    if (nprogressHiddenStyle) {
      this.timer = setTimeout(() => {
        nprogressHiddenStyle.parentNode.removeChild(nprogressHiddenStyle);
      }, 0);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onEnterChange = (mode) => {
    this.setState({
      isFirstScreen: mode === 'enter',
    });
  }

  render() {
    const { children, ...restProps } = this.props;
    const { appLocale, isFirstScreen } = this.state;
    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <ConfigProvider locale={enUS}>
          <div className="page-wrapper">
            <Header {...restProps} isFirstScreen={isFirstScreen} />
            {cloneElement(children, { onEnterChange: this.onEnterChange })}
            <Footer {...restProps} />
          </div>
        </ConfigProvider>
      </IntlProvider>
    );
  }
}
