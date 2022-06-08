---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic
---


````jsx
import {Button} from 'antd';
import {Panel} from 'component';

class App extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     visible: false
   };
  }

  showPanel = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showPanel}>
          Open Modal
        </Button>
        <Panel
          title="Basic Modal"
          position={{x: 450, y: 250}}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <span style={{color: '#fff', fontSize: '18px'}}>basic panel</span>
        </Panel>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
