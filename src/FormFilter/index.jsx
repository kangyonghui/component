import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Form, Row, Col, Button, Icon} from 'antd';
const createForm = Form.create;

import './style.css';

const defaultPrefixCls = "form-filter";
const globalMarginBottom = "12px";

function generator(props) {
  return (Basic) => {
    return class Adapter extends React.Component {
      static propTypes = {
        name: PropTypes.string.isRequired,
      };

      static defaultProps = {
        name: props.name,
      };

      render() {
        const {prefixCls} = props;
        return <Basic prefixCls={prefixCls} name={props.name} {...this.props}/>;
      }
    };
  };
}

const Basic = React.createClass({
  render() {
    const {prefixCls, className, children, name, ...others} = this.props;

    const divCls = classNames(className, prefixCls);

    return (
      <div className={divCls} {...others}>{children}</div>
    );
  }
});

const FormFilter = createForm()(React.createClass({
    propTypes: {
      style: PropTypes.object,
      prefixCls: PropTypes.string,
      className: PropTypes.string,
      name: PropTypes.string,
      onSubmit: PropTypes.func.isRequired,
      onToggleChange: PropTypes.func,
      expand: PropTypes.bool,
      loading: PropTypes.bool
    },
    getDefaultProps() {
      return {
        name: "FormFilter",
        prefixCls: defaultPrefixCls,
        loading: false
      };
    },
    getInitialState(){
      const props = this.props;

      let expand;
      if ('expand' in props) {
        expand = props.expand;
      }

      return {
        expand: expand,
        submitting: false
      }
    },
    componentWillReceiveProps(nextProps) {
      if ('expand' in nextProps) {
        this.setState({
          expand: nextProps.expand || false,
        });
      }
    },
    toggle(){
      if (!('expand' in this.props)) {
        this.setState({expand: !this.state.expand});
      }

      this.props.onToggleChange && this.props.onToggleChange(!this.state.expand);
    },
    handleSubmit(e){
      e.preventDefault();
      this.props.onSubmit(e);
    },
    handleReset(e){
      this.props.onReset(e);
    },
    render() {
      const {prefixCls, className, children, name, loading, wrappedComponentRef, ...others} = this.props;

      let Condition, AdvancedCondition, SearchBox;

      React.Children.forEach(children, ele => {
        if (ele && ele.props && ele.props.name) {
          switch (ele.props.name) {
            case "Condition":
              Condition = ele;
              break;
            case "AdvancedCondition":
              AdvancedCondition = ele;
              break;
            case "SearchBox":
              SearchBox = ele;
              break;
          }
        }
      });

      const divCls = classNames(className, prefixCls);
      return (
        <div className={divCls} {...others}>
          <Form>
            <Row>
              <Col span={21}>
                {Condition}
              </Col>
              <Col span={3} style={{textAlign: 'right', marginBottom: globalMarginBottom}}>
                <Button size="large" type="primary"
                        style={{width: "65px"}}
                        loading={loading}
                        onClick={this.handleSubmit}
                >查询</Button>
                {AdvancedCondition ? (<a style={{marginLeft: 12, marginRight: -12, fontSize: 12}} onClick={this.toggle}>
                    <Icon type={this.state.expand ? 'up' : 'down'}/>
                  </a>) : null}
              </Col>
            </Row>
            <Row>
              <Col span={21}>
                {this.state.expand ? AdvancedCondition : null}
              </Col>
              <Col span={3}></Col>
            </Row>
          </Form>
        </div>
      );
    }
  })
);

const AdvancedCondition = generator({
  prefixCls: `${defaultPrefixCls}-advanced-condition`,
  name: 'AdvancedCondition',
})(Basic);

const Condition = generator({
  prefixCls: `${defaultPrefixCls}-condition`,
  name: 'Condition',
})(Basic);

const SearchBox = generator({
  prefixCls: `${defaultPrefixCls}-search-box`,
  name: 'SearchBox',
})(Basic);

FormFilter.Condition = Condition;
FormFilter.AdvancedCondition = AdvancedCondition;
FormFilter.SearchBox = SearchBox;

export default FormFilter;
