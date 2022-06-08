import React from 'react';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

import './index.css';

class SwitchTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexTable: props.indexTable
    }
  };

  componentWillReceiveProps(nextProps) {
    if ('indexTable' in nextProps) {
      const indexTable = nextProps.indexTable;
      this.setState({'indexTable': indexTable});
    }
  };

  tabClick = (index) => {
    this.setState({'indexTable': index});

    this.props.onTabClick && this.props.onTabClick(index);
  };


  render() {
    const {children, tabBarExtraContent} = this.props;
    return (
      <div className="switch-tabs">
        <Tabs activeKey={this.state.indexTable || '0'} onTabClick={this.tabClick} tabBarExtraContent={tabBarExtraContent}>
          {
            children.map((item, index) => {
              return (
                <TabPane tab={item.props.label} key={index} disabled={item.props.disabled}>{item}</TabPane>
              )
            })
          }
        </Tabs>
      </div>
    )
  }
}

export default SwitchTabs;
